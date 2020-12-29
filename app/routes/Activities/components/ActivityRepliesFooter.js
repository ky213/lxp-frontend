import React from 'react'
import { Link } from 'react-router-dom'

import {
  InputGroup,
  InputGroupAddon,
  Button,
  Input,
  ThemedButton,
} from '@/components'

const ActivityRepliesFooter = props => {
  const [message, setMessage] = React.useState('')

  const sendReply = message => {
    props.onSendReply(message)
    setMessage('')
  }
  const handleReply = message => {
    sendReply(message)
  }

  const handleKeyDown = ev => {
    if (ev.key === 'Enter') {
      ev.preventDefault()
      ev.stopPropagation()

      sendReply(message)
    }
  }

  return (
    <React.Fragment>
      <InputGroup>
        {/*
                <InputGroupAddon addonType="prepend">
                    <Button color="secondary" outline>
                        <i className="fa fa fa-paperclip"></i>
                    </Button>
                </InputGroupAddon>
            */}

        <Input
          type="textarea"
          placeholder="Add your feedback/comment..."
          onKeyDown={handleKeyDown}
          onChange={e => setMessage(e.target.value)}
          value={message}
          disabled={props.selectedActivity?.status === 'Closed'}
        />
        <InputGroupAddon addonType="append">
          <ThemedButton
            color="primary"
            title="Add your feedback/comment"
            onClick={() => handleReply(message)}
          >
            <i className="fa fa fa-send"></i>
          </ThemedButton>
        </InputGroupAddon>
      </InputGroup>
    </React.Fragment>
  )
}

export { ActivityRepliesFooter }
