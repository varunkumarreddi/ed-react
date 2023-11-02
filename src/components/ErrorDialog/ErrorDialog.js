import './ErrorDialog.css';

import React from 'react'
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Typography from '@mui/material/Typography';
// import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    
    '& .MuiBackdrop-root': {
      backgroundColor: "grey",
    },
    '& .MuiDialogContent-root': {
      padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
      padding: theme.spacing(1),
    }
  }));

function BootstrapDialogTitle(props) {
    const { children, ...other } = props;
  
    return (
      <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
        {children}
      </DialogTitle>
    );
  }
  
  BootstrapDialogTitle.propTypes = {
    children: PropTypes.node
  };
  
export function ErrorDialog(props) {
    return (
      <div>
        <BootstrapDialog
          aria-labelledby="customized-dialog-title"
          open={true}
        >
          <BootstrapDialogTitle id="customized-dialog-title">
            Server Error   
          </BootstrapDialogTitle>
          <DialogContent dividers>
            <Typography gutterBottom component={'h4'} className='error'>
                Could not connect to the server
            </Typography>
            <Typography gutterBottom>
                - {props.errorMessage}
            </Typography>
          </DialogContent>
        </BootstrapDialog>
      </div>
    );
  }
