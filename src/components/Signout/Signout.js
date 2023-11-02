import './Signout.css'

import React from 'react'
// import {  GoogleLogout } from 'react-google-login';
import { googleLogout } from '@react-oauth/google';

import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
// import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

import { useSelector, useDispatch } from 'react-redux';
import { setShowSignOut } from 'store/modalReducer';
import { setUserDetails, setProfile, setAccessToken, setLoggedWith } from 'store/authReducer';

import { FormControl } from '@mui/material';
import { Button } from '@mui/material';

import Cookies from 'universal-cookie';

import { getAuth, signOut } from "firebase/auth";


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
  
export function Signout() {
    const dispatch = useDispatch();
    const {showSignOut} = useSelector(state=> state.modalReducer)
    // const {clientId} = useSelector(state=> state.authReducer)
    // const {userDetails} = useSelector(state=> state.authReducer)
    // const {profile} = useSelector(state=> state.authReducer)
    // const {clientId} = useSelector(state=> state.authReducer)

    const cookies = new Cookies();
    

    const handleClose = () => {
      dispatch(setShowSignOut(false));
    };

    const handleSubmit = (event) =>{
      event.preventDefault();
    }

    const auth = getAuth();
    signOut(auth).then(() => {
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
    });

    // const onSuccess = (res) =>{
    //     alert("Logut successfull")
    // }

    // log out function to log the user out of google and set the profile array to null
    const logOut = () => {
      cookies.set('authentication', '');
      cookies.set('accessToken', '');
      cookies.set('loggedWith', '');
      
      
      dispatch(setProfile(null))
      dispatch(setAccessToken(null))
      dispatch(setLoggedWith(''))
      dispatch(setUserDetails(null));
      googleLogout();
      
      signOut(auth).then(() => {
        console.log('signOut successfull')
      }).catch((error) => {
        console.log(error)
      });

      handleClose();
    };

    return (
      <div>
            <BootstrapDialog
            aria-labelledby="sign-out-dialog"
            open={showSignOut}
            onClose={handleClose}
            PaperProps={{ style: {
                  minHeight: '40%',
                  minWidth: '40%'
                }}}
            >
              <BootstrapDialogTitle id="sign-out-header" onClose={handleClose}>
                  Sign Out  
              </BootstrapDialogTitle>
              <DialogContent dividers id="sign-out-content">
                <p className='signout-confirm'> Are you sure you want to sign out?</p>
                <form onSubmit={handleSubmit}>
                  <FormControl className='form'>
                    <Button variant="contained" className='submit-button' onClick={handleClose}>Cancel</Button>
                    <Button variant="contained" className='submit-button' onClick={logOut}>Yes</Button>
                    {/* <GoogleLogout clientId={clientId} buttonText="Logout" onLogoutSuccess={onSuccess}/>  */}
                    {/* <InputLabel htmlFor="my-input">Email address</InputLabel>
                    <Input id="my-input" aria-describedby="my-helper-text" />
                    <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText> */}
                  </FormControl>
                </form>
              </DialogContent>
            </BootstrapDialog>
        
      </div>
    );
  }
