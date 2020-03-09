import React, {useState} from 'react';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import Button from '@material-ui/core/Button';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  headerSnackbar: {
    position: 'relative',
    'align-text': 'left',
    padding: '0 60px',
    color: '#000000'
  },
  headerSnackbarButton:{
    position: 'absolute',
    left: '0'
  },
  })
)

export default function HeaderSnackbar(props) {
  const classes = useStyles();
  const [message, setMessage] = useState(props.message)
  
return(
  <SnackbarContent 
    className={classes.headerSnackbar}
    style={{ backgroundColor:"#F56236"}} 
    key={message.id} 
    id={message.id}
    message={message.message} 
    action={
      <Button 
        className={classes.headerSnackbarButton}
        onClick={()=>{props.handleClearOneClick(message.id)}}
        >X
      </Button>
    }
  />
)

              }