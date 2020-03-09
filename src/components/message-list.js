import React, {setState} from 'react'
import { withStyles } from "@material-ui/core/styles";
import Grid from './Grid'
import HeaderSnackbar from './HeaderSnackbar'
import Button from '@material-ui/core/Button'
import Api from '../api'

const styles = theme => ({
  root: {
    'font-family': "'Montserrat', sans-serif",
    'color': '#000000', 
  },
  title: {
    'font-weight': 'bold'
  },
  button: {
    width: '30vw',
    position: 'absolute',
    left: '0',
    right: '0',
    margin: 'auto',
    'margin-top': '-50px'
    
  },
  heading: {
    position: 'relative',
    padding: '0 3vw'
  },
  controlButtons: {
    display: 'flex',
    'justify-content': 'center'
  },
  controlButton: {
    backgroundColor:'#03E0B7',
    margin: '5px'
  }
})

class MessageList extends React.PureComponent {
  constructor(...args) {
    super(...args)
    this.state = {
      messages: [],
      notification: ''
    }
  }
    
  api = new Api({
    messageCallback: (message) => {
      this.messageCallback(message)
    },
  })

  componentDidMount(){
    this.api.start()
  }

  messageCallback(message){
    const { messages } = this.state
    this.setState({
      messages: [
        ...messages.slice(),
        message,
      ],
    }, () => { 
      if(message.priority===1){
        this.setState({notification:
          <HeaderSnackbar 
          message={message} 
          handleClearOneClick={this.handleClearOneClick}
          />
        })
        
        setTimeout(()=> {
        {this.setState({notification:''})}
      }, 2000)
      }
    })
  }

  handleClick = () => {
    const isApiStarted = this.api.isStarted() 
    if (isApiStarted) {
      this.api.stop()
    } else {
      this.api.start()
    }
    this.forceUpdate()
  }

  handleClearOneClick=(msgId)=>{  
      this.setState({
        messages: this.state.messages.filter(msg => {if(msg.id!==msgId) return msg}),
        notification: this.state.notification.key ? this.state.notification.key === msgId ? '' : this.notification : ''
      })
  }

  handleClearAllClick=()=>{
    this.setState({
      messages: [],
      notification: ''
    })
  }

  render() {
    const isApiStarted = this.api.isStarted()
    let {classes} = this.props
    return (
      <div className={classes.root}>
        <div className={classes.heading}>
        <h3 className={classes.title}>Help.com Coding Challenge</h3>
        <div className={classes.button}>{this.state.notification}</div>
        </div>
        <hr/>
        <div className={classes.controlButtons}>
        <Button
          variant="contained"
          onClick={this.handleClick}
          size={'small'}
          className={classes.controlButton}
          >
          {isApiStarted ? 'Stop' : 'Start'}
        </Button>
        <Button 
          variant="contained"
          onClick={this.handleClearAllClick}
          size={'small'}
          className={classes.controlButton}
          >Clear
        </Button>
        </div>
        <Grid 
        messages={this.state.messages}
        handleClearOneClick={this.handleClearOneClick}
        />
      </div>
    )
  }
}

export default withStyles(styles, {withTheme: true})(MessageList)