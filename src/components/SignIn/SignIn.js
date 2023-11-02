import './SignIn.css'

import React, {useEffect, useState} from 'react'

import { useGoogleLogin } from '@react-oauth/google';

import OtpInput from 'otp-input-react';

import {fetchUserInfoGmail, saveUserInfo} from 'services';

// import { refreshTokenSetup } from 'utils/refreshToken';

import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { ErrorDialog } from 'components/ErrorDialog';
// import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

import { useSelector, useDispatch } from 'react-redux';
import { setShowSignIn } from 'store/modalReducer';
import { setUserDetails, setProfile, setAccessToken, setLoggedWith } from 'store/authReducer';

import { FormControl } from '@mui/material';
import { Button } from '@mui/material';


import { FcGoogle } from 'react-icons/fc';
import { auth } from '../../firebase';
import { RecaptchaVerifier, signInWithPhoneNumber} from 'firebase/auth'

import toast, { Toaster } from 'react-hot-toast';
import {CgSpinner} from 'react-icons/cg';

import Cookies from 'universal-cookie';


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
      padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
      padding: theme.spacing(1),
    },
  }));

function BootstrapDialogTitle(props) {
    const { children,onClose, ...other } = props;
  
    return (
      <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
        {children}
        {onClose ? (
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
      ) : null}
      </DialogTitle>
    );
}
  
BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired
  };
  
export function SignIn(props) {
    const [phoneNumber, setPhoneNumber] = useState("")
    const [invalidNumber, setInvalidNumber] = useState(false)
    const [user, setUser] = useState(null);
    const [validForm, setValidForm] = useState(false)
    const [showOtpInput, setShowOtpInput] = useState(false) 
    const [otpInput, setOtpInput] = useState("") 
    const [loading, setLoading] = useState(false) 
    const dispatch = useDispatch();
    const {showSignIn} = useSelector(state=> state.modalReducer)
    const [errorMessage, setErrorMessage] = useState("")
    // const {clientId} = useSelector(state=> state.authReducer)
    // const {userDetails} = useSelector(state=> state.authReducer)
    const {profile} = useSelector(state=> state.authReducer)

    const cookies =new Cookies();

    const handleClose = () => {
      dispatch(setShowSignIn(false));
    };

    const handleSubmit = (event) =>{
      event.preventDefault();
      
      if(phoneNumber.length !== 10){
        setInvalidNumber(true)
        setValidForm(false)
      }
      else{
        setInvalidNumber(false)
        setValidForm(true)
      }
    }

    const login = useGoogleLogin({
      onSuccess: (codeResponse) => {
        dispatch(setUserDetails(codeResponse));
        // refreshTokenSetup(codeResponse);
        setUser(codeResponse);
        getUserGmailInfo(codeResponse);
        handleClose();
      },
      onError: (error) => {
        console.log('Login Failed:', error)
        cookies.set('authentication', 'failed');
      }
    });

    function getUserGmailInfo(userResponse){
      if(userResponse ){
        const cookies =new Cookies();
        dispatch(setAccessToken(userResponse.access_token))
        dispatch(setLoggedWith('google'))
        cookies.set('authentication', 'success', { path: '/', expires: (new Date(Date.now() + userResponse.expires_in*1000)) });
        cookies.set('accessToken', userResponse.access_token, { path: '/', expires: (new Date(Date.now() + userResponse.expires_in*1000)) });
        cookies.set('loggedWith', 'google', { path: '/', expires: (new Date(Date.now() + userResponse.expires_in*1000)) });
        fetchUserInfoGmail(userResponse).then((data)=>{
          dispatch(setProfile(data))
          console.log('Welcome '+ data.name);
          let userDataReq = Object.assign({phoneNumber: 'NA',loggedWith: 'google'}, data);
          saveUserInfo(userDataReq);
        })
        .catch((e)=>{
          console.log(e);
          setErrorMessage('Fetch User details failed: '+e)
        });
      }
    }
              

    function onCaptchaVerify(){
      if(!window.recaptchaVerifier){
        window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
          'size': 'invisible',
          'callback': (response) => {
            onSignup();
          },
          'expired-callback': () => {
            // Response expired. Ask user to solve reCAPTCHA again.
            // ...
          }
        });
      }
    }

    function onSignup(){
      if(phoneNumber.length === 10 && validForm){
        setLoading(true)
        onCaptchaVerify()
        const appVerifier = window.recaptchaVerifier;
        const formatPh = '+91' + phoneNumber
        signInWithPhoneNumber(auth, formatPh, appVerifier)
          .then((confirmationResult) => {
            // SMS sent. Prompt user to type the code from the message, then sign the
            // user in with confirmationResult.confirm(code).
            window.confirmationResult = confirmationResult;
            setLoading(false);
            setShowOtpInput(true);
            toast.success('OTP sent successfully!')
          }).catch((error) => {
            // Error; SMS not sent
            // toast.error('Error occured while sending OTP')
            console.log(error)
            // setErrorMessage('OTP verification failed: '+error);
            setLoading(false);
            cookies.set('authentication', 'failed');
          });
      }
    }

    function onOTPVerify(){
      if(otpInput.length === 6){
        setLoading(true)
        window.confirmationResult.confirm(otpInput).then(async(res)=>{
          setLoading(false);
          let userDataReq = {
            'email': 'NA',
            'name': 'NA',
            'phoneNumber':res.user.phoneNumber,
            'picture': 'NA',
            'verified_email': 'NA',
            'loggedWith': 'phoneNumber'            
          }
          dispatch(setProfile(userDataReq))
          cookies.set('authentication', 'success', { path: '/', expires: (new Date(Date.now() + res._tokenResponse.expiresIn*1000)) });
          cookies.set('accessToken', res._tokenResponse.idToken, { path: '/', expires: (new Date(Date.now() + res._tokenResponse.expiresIn*1000)) });
          cookies.set('loggedWith', 'phoneNumber', { path: '/', expires: (new Date(Date.now() + res._tokenResponse.expiresIn*1000)) });
          dispatch(setAccessToken(res._tokenResponse.idToken))
          dispatch(setLoggedWith('phoneNumber'));
          // refreshTokenSetup(codeResponse);
          saveUserInfo(userDataReq);
          handleClose();
        }).catch(err=>{
          console.log(err)
          cookies.set('authentication', 'failed');
          // setErrorMessage('OTP verification failed: '+err)
          setLoading(false);  
          setShowOtpInput(false);
          setOtpInput('')
          toast.error('OTP verification failed!')
        })
      }
    }
    
    useEffect(
      () => {
        if(!profile){
          setPhoneNumber('')
          setOtpInput('')
          setShowOtpInput(false)
        }
      },[profile]
    );
    // const { signIn} = useGoogleLogin({
    //   onSuccess,
    //   onFailure,
    //   clientId,
    //   isSignedin: true,
    //   accessType: 'offline'
    // })

    return (
      <div>
            {errorMessage.length>0 && <ErrorDialog errorMessage={errorMessage}/>}
            <Toaster toastOptions={{ duration:4000 }}/>
            <div id="recaptcha-container"></div>
            <BootstrapDialog
            aria-labelledby="sign-in-dialog"
            open={showSignIn}
            onClose={handleClose}
            PaperProps={{ style: {
                  minHeight: '40%',
                  minWidth: '40%'
                }}}
            >
              <BootstrapDialogTitle id="sign-in-header" onClose={handleClose}>
                  Sign In  
              </BootstrapDialogTitle>
              <DialogContent dividers id="sign-in-content">
                <form onSubmit={handleSubmit}>
                  <FormControl className='form'>
                    <TextField
                      label='Enter Phone Number (+91)'
                      variant='outlined'
                      name='phoneNumber'
                      required
                      error={invalidNumber}  
                      className="phoneNumber"
                      value={phoneNumber}
                      onChange={e => setPhoneNumber(e.target.value)}
                      type="number"
                    />
                    {showOtpInput ? <OtpInput className="otp-input" value={otpInput} onChange={setOtpInput} OTPLength={6} otpType="number" disabled={false} autoFocus/> : <></>}
                    { otpInput.length === 6 ? 
                      <Button onClick={onOTPVerify} variant="contained" className='submit-button' type='button'> Verify OTP 
                        {loading? <CgSpinner size={20}  className="cg-spinner"/>: <></>} 
                      </Button> : 
                      <Button onClick={onSignup} variant="contained" className='submit-button' type='submit'> Submit 
                        {loading? <CgSpinner size={20}  className="cg-spinner"/>: <></>} 
                      </Button>
                    }
                    <Button className="google-login" onClick={()=>login()}><FcGoogle className='google-icon'/> Sign in with Google</Button>
                  </FormControl>
                </form>
              </DialogContent>
            </BootstrapDialog>
        
      </div>
    );
  }
