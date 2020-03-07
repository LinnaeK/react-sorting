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
      // Included to support initial direction. Please remove upon completion
      // console.log(messages)
    })
    if(message.priority===1){
      this.setState({
        notification: <SnackbarContent style={{ backgroundColor:"#F56236"}} key={message.id} message={message.message}/>
      })
    }
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

  handleClearClick = (event) => {
    event.preventDefault()
    // console.log(event)
    this.setState({
      notification: <h1>I have been Clicked</h1>
    })
  }

  render() {
    const isApiStarted = this.api.isStarted()
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
        <Button onClick={this.handleClearClick}>Clear</Button>
        <Grid 
        messages={this.state.messages}
        handleClearClick={this.handleClearClick}
        />
      </div>
    )
  }
}

export default MessageList
