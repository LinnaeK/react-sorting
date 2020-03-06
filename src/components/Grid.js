import React, { useState, useEffect }  from 'react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import { makeStyles } from '@material-ui/core/styles';



function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(3),
    },
  },
}));

export default function CustomizedSnackbars(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [errorMessages, setErrorMessages] = React.useState()
  const [warningMessages, setWarningMessages] = React.useState()
  const [infoMessages, setInfoMessages] = React.useState()

  useEffect(()=>{
    filterMsgs()
  })

  let buttons = []

  function filterMsgs(){
    let errorMsgs = props.messages.filter(msg => msg.priority === 1)
    let warningMsgs = props.messages.filter(msg => msg.priority === 2)
    let infoMsgs = props.messages.filter(msg => msg.priority === 3)
    errorMsgs = errorMsgs.map((msg)=>{
      return <Alert key={msg.id}>{msg.message}</Alert>
    })
    warningMsgs = warningMsgs.map((msg)=>{
      return <Alert key={msg.id}>{msg.message}</Alert>
    })
    infoMsgs = infoMsgs.map((msg)=>{
      return <Alert key={msg.id}>{msg.message}</Alert>
    })
    setErrorMessages(errorMsgs)
    setWarningMessages(warningMsgs)
    setInfoMessages(infoMsgs)
    }
  

  function displayMsgs(){
    let display = errorMessages.map((msg)=>{
      return <Alert key={msg.id}>{msg.message}</Alert>
    })
    return display
  }
    

  return (
    <div className={classes.root}>
      <Grid container>
      <Box
        boxShadow={0}
        bgcolor="background.paper"
        m={1}
        p={1}
        style={{ width: '30vw', height: '5rem' }}
      >
      <Snackbar open={open} autoHideDuration={6000}>
        <Alert severity="success">
          This is a success message!
        </Alert>
      </Snackbar>
      {errorMessages}
      </Box>
      <Box
        boxShadow={0}
        bgcolor="background.paper"
        m={1}
        p={1}
        style={{ width: '30vw', height: '5rem' }}
      >
      <Snackbar open={open} autoHideDuration={6000} >
        <Alert severity="success">
          This is a success message!
        </Alert>
      </Snackbar>
      {warningMessages}
      </Box>
      <Box
        boxShadow={0}
        bgcolor="background.paper"
        m={1}
        p={1}
        style={{ width: '30vw', height: '5rem' }}
      >
      <Snackbar open={open} autoHideDuration={6000} >
        <Alert severity="success">
          This is a success message!
        </Alert>
      </Snackbar>
      {infoMessages}
      </Box>
      </Grid>
    </div>
  );
}

