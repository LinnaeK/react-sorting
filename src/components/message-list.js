import React from 'react'
import jss from 'jss'
import preset from 'jss-preset-default'
import Grid from './Grid'
import SnackbarContent from '@material-ui/core/SnackbarContent';
import Button from '@material-ui/core/Button'
import Api from '../api'

jss.setup(preset())

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

  componentDidMount() {
    this.api.start()
  }

  messageCallback(message) {
    const { messages } = this.state
    this.setState({
      messages: [
        ...messages.slice(),
        message,
      ],
    }, () => { 
      if(message.priority===1){
        let snackbarMsg = 
        this.setState({
          notification: <SnackbarContent style={{ backgroundColor:"#F56236"}} key={message.id} message={message.message} action={<Button onClick={()=>{this.handleClearOneClick(message.id)}}>X</Button>}/>
        })
        setTimeout(()=>{this.setState({notification: ''})}, 10000)
      }
    })
  }

  handleClick = () => {
    const isApiStarted = this.api.isStarted()
    console.log('inClick', isApiStarted)
    if (isApiStarted) {
      this.api.stop()
    } else {
      this.api.start()
    }
    this.forceUpdate()
  }

  handleClearOneClick=(msgId)=>{
    console.log(msgId)
    this.setState((state)=>({
      messages: state.messages.filter(msg => {if(msg.id!==msgId) return msg})
    }))
  }

  handleClearAllClick=()=>{
    console.log('clear All Clicked')
    this.setState({messages:[], notification: ''})
  }

  render() {
    const isApiStarted = this.api.isStarted()
    console.log('in render', isApiStarted)
    return (
      <div>
        <h4>Help.com Coding Challenge</h4>
        <div>{this.state.notification}</div>
        <hr/>
        <Button
          variant="contained"
          onClick={this.handleClick}
        >
          {isApiStarted ? 'Stop Messages' : 'Start Messages'}
        </Button>
        <Button onClick={this.handleClearAllClick}>Clear</Button>
        <Grid 
        messages={this.state.messages}
        handleClearOneClick={this.handleClearOneClick}
        />
      </div>
    )
  }
}

export default MessageList
