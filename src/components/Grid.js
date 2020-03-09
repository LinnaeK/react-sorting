import React, { useState, useEffect }  from 'react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import Button from '@material-ui/core/Button';
import MuiAlert from '@material-ui/lab/Alert';

import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    padding: '0 10vw',
  },
  box: {
    width: '100%',
    padding: '0 2.5vw',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
  error: {
    color: '#000000',
    backgroundColor:"#F56236",
    width: '100%'
  },
  warning: {
    color: '#000000',
    backgroundColor:"#FCE788"
  },
  info: {
    color: '#000000',
    backgroundColor:"#88FCA3"
  },
  category: {
    margin: '15px 0 0 0'
  },
  count:{
    margin: '4px',
    'font-size': '12px'
  }
}));

export default function CustomizedSnackbars(props) {
  const classes = useStyles();
  const [errorMessages, setErrorMessages] = React.useState([])
  const [warningMessages, setWarningMessages] = React.useState([])
  const [infoMessages, setInfoMessages] = React.useState([])
  
    const action = (msgId) => (
      <Button size="small" onClick={() => props.handleClearOneClick(msgId)} name={msgId}>
        Clear
      </Button>
    )

    const filterMsgs = () => {
      let errorMsgs = props.messages.filter(msg => msg.priority === 1).reverse()
      let warningMsgs = props.messages.filter(msg => msg.priority === 2).reverse()
      let infoMsgs = props.messages.filter(msg => msg.priority === 3).reverse()
      errorMsgs = errorMsgs.map((msg)=>{
        return <SnackbarContent key={msg.id} className={classes.error} message={msg.message} action={action(msg.id)} />
    
      })
      warningMsgs = warningMsgs.map((msg)=>{
        return <SnackbarContent key={msg.id} className={classes.warning} message={msg.message} action={action(msg.id)} />
    
      })
      infoMsgs = infoMsgs.map((msg)=>{
        return <SnackbarContent action={action(msg.id)} key={msg.id} className={classes.info} message={msg.message} />
      })
      setErrorMessages(errorMsgs)
      setWarningMessages(warningMsgs)
      setInfoMessages(infoMsgs)
      }

      useEffect(()=>{
        filterMsgs()}, [props.messages])

  return (
    <div className={classes.root}>
      <Grid container>
      <Box
        className={classes.box}
        boxShadow={0}
        bgcolor="background.paper"
        m={1}
        p={1}
        style={{ width: '20vw', height: '3rem' }}
        data-testid={"Box"}
      >
        <h4 className={classes.category}>Error Type 1</h4>
        <p className={classes.count}>Count {errorMessages.length}</p>
      {errorMessages}
      </Box>
      <Box
        className={classes.box}
        boxShadow={0}
        bgcolor="background.paper"
        m={1}
        p={1}
        style={{ width: '20vw', height: '3rem' }}
      >
        <h4 className={classes.category}>Warning Type 2</h4>
        <p className={classes.count}>Count {warningMessages.length}</p>
      {warningMessages}
      </Box>
      <Box
        className={classes.box}
        boxShadow={0}
        bgcolor="background.paper"
        m={1}
        p={1}
        style={{ width: '20vw', height: '3rem' }}
      >
        <h4 className={classes.category}>Info Type 3</h4>
        <p className={classes.count}>Count {infoMessages.length}</p>
      {infoMessages}
      </Box>
      </Grid>
    </div>
  );
}

