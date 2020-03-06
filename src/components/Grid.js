import React, { useState, useEffect }  from 'react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import Button from '@material-ui/core/Button';
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

const action = (
  <Button color="black" size="small">
    Clear
  </Button>
)

export default function CustomizedSnackbars(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [errorMessages, setErrorMessages] = React.useState([])
  const [warningMessages, setWarningMessages] = React.useState([])
  const [infoMessages, setInfoMessages] = React.useState([])

  useEffect(()=>{
    filterMsgs()
  })

  function filterMsgs(){
    let errorMsgs = props.messages.filter(msg => msg.priority === 1)
    let warningMsgs = props.messages.filter(msg => msg.priority === 2)
    let infoMsgs = props.messages.filter(msg => msg.priority === 3)
    errorMsgs = errorMsgs.map((msg)=>{
      return <SnackbarContent key={msg.id} style={{ backgroundColor:"#F56236"}} message={msg.message} action={action} />
  
    })
    warningMsgs = warningMsgs.map((msg)=>{
      return <SnackbarContent key={msg.id} style={{ backgroundColor:"#FCE788"}} message={msg.message} action={action} />
  
    })
    infoMsgs = infoMsgs.map((msg)=>{
      return <SnackbarContent key={msg.id} style={{ backgroundColor:"#88FCA3"}} message={msg.message} action={action} />
    })
    setErrorMessages(errorMsgs)
    setWarningMessages(warningMsgs)
    setInfoMessages(infoMsgs)
    }

  return (
    <div className={classes.root}>
      <Grid container>
      <Box
        className={classes.root}
        boxShadow={0}
        bgcolor="background.paper"
        m={1}
        p={1}
        style={{ width: '30vw', height: '5rem' }}
      >
        <h4>Error Type 1</h4>
        <p>Count {errorMessages.length}</p>
      <Snackbar open={open} autoHideDuration={6000}>
        <Alert >
          This is a success message!
        </Alert>
      </Snackbar>
      {errorMessages}
      </Box>
      <Box
        className={classes.root}
        boxShadow={0}
        bgcolor="background.paper"
        m={1}
        p={1}
        style={{ width: '30vw', height: '5rem' }}
      >
        <h4>Warning Type 2</h4>
        <p>Count {warningMessages.length}</p>
      <Snackbar open={open} autoHideDuration={6000} >
        <Alert >
          This is a success message!
        </Alert>
      </Snackbar>
      {warningMessages}
      </Box>
      <Box
        className={classes.root}
        boxShadow={0}
        bgcolor="background.paper"
        m={1}
        p={1}
        style={{ width: '30vw', height: '5rem' }}
      >
        <h4>Info Type 3</h4>
        <p>Count {infoMessages.length}</p>
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
