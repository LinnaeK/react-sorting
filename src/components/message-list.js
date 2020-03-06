import React from 'react'
import jss from 'jss'
import preset from 'jss-preset-default'
import Grid from './Grid'

import Button from '@material-ui/core/Button'
import Api from '../api'

jss.setup(preset())

class MessageList extends React.PureComponent {
  constructor(...args) {
    super(...args)
    this.state = {
      messages: [],
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
      console.log(messages)
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

  render() {
    const isApiStarted = this.api.isStarted()
    return (
      <div>
        <h4>Help.com Coding Challenge</h4>
        <div id="snackbar"></div>
        <hr/>
        <Button
          variant="contained"
          onClick={this.handleClick}
        >
          {isApiStarted ? 'Stop Messages' : 'Start Messages'}
        </Button>
        <Button >Clear</Button>
        <Grid messages={this.state.messages}/>
      </div>
    )
  }
}

export default MessageList
