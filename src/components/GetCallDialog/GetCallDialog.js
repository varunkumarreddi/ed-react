import React, { useState} from 'react'

import './GetCallDialog.css'

import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Typography from '@mui/material/Typography';
import { FormControl } from '@mui/material';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import handShakeImage from 'assets/handshake.png';


// import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

import { useSelector, useDispatch } from 'react-redux';
import { setShowGetCallDialog } from 'store/modalReducer';
import { useEffect } from 'react';

import { sendSMSService } from 'services/sendSMSService';

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
  
export function GetCallDialog(props) {
    const {showGetCallDialog} = useSelector(state=> state.modalReducer)
    const {profile} = useSelector(state=> state.authReducer);
    const [invalidNumber, setInvalidNumber] = useState(false)
    const [validForm, setValidForm] = useState(false)
    const [phoneNumber, setPhoneNumber] = useState("")
    const [showConfirmMessage, setShowConfirmMessage] = useState(false)
    const {loggedWith} = useSelector(state=> state.authReducer);


    const dispatch = useDispatch();

    const handleClose = () => {
        dispatch(setShowGetCallDialog(false));
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
        if(validForm){
            setShowConfirmMessage(true);
            let username=''
            if(profile){
                username = profile.name;
            }
            else{
                username = 'User'
            }
            let smsData = {
                to_name: '',
                message: `${username} - ${phoneNumber} needs a call from you. (Ethereal Design)`
            }
            sendSMSService(smsData)
        }
    }

    useEffect(()=>{
        if(loggedWith && loggedWith === "phoneNumber"){
            setShowConfirmMessage(true);
            let username=''
            if(profile){
                username = profile.name;
                setPhoneNumber(profile.phoneNumber)
            }
            else{
                username = 'User'
            }
            let smsData = {
                to_name: '',
                message: `${username} - ${phoneNumber} needs a call from you. (Ethereal Design)`
            }
            sendSMSService(smsData)
        }
    },[loggedWith])

    return (
      <div>
        {!showConfirmMessage ? 
            <BootstrapDialog
            aria-labelledby="get-call-dialog"
            open={showGetCallDialog}
            onClose={handleClose}
            PaperProps={{ style: {
                    minHeight: '33%',
                    minWidth: '35%'
                    }}}
            >   
                <BootstrapDialogTitle id="get-call-dialog-title" onClose={handleClose}>
                    Get a Call from us   
                </BootstrapDialogTitle>
                <DialogContent dividers id="get-call-dialog-content">
                    {/* <Typography gutterBottom component={'h4'} className='content-title'>
                        Please enter your mobile number 
                    </Typography> */}
                    <form>
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
                            <Button variant="contained" onClick={handleSubmit} className='submit-button' type='button'> Submit </Button>
                        </FormControl>
                    </form>
                </DialogContent>
            </BootstrapDialog> 
        :
            <BootstrapDialog
                aria-labelledby="get-call-dialog"
                open={showGetCallDialog}
                onClose={handleClose}
                PaperProps={{ style: {
                        minHeight: '33%',
                        minWidth: '35%'
                        }}}
            > 
                <BootstrapDialogTitle id="get-call-dialog-title" onClose={handleClose}>
                    Thank You!
                </BootstrapDialogTitle>
                <DialogContent dividers id="success-message-content">
                    <Typography gutterBottom component={'h2'} className='success-message'>
                        We will get back to you shortly 
                    </Typography>
                    <img src={handShakeImage} className="hand-shake-image" alt='handshake'></img>
                </DialogContent>
            </BootstrapDialog>
        }
    </div>
    );
  }
