import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

import { Card, Media, Avatar, Badge } from '@/components'
import { hot } from 'react-hot-loader'

const ActivityReplyLeft = props => {
  const handleDeleteReply = e => {
    e.preventDefault()
    if (confirm('Are you sure you want to delete this reply?')) {
      props.onDelete(props.reply.activityReplyId)
    }
  }

  const handleEditReply = e => {}

  return (
    <React.Fragment>
      <Media className="mb-2">
        <Media left className="mr-3">
          <Avatar.Image
            size="md"
            src={props.reply && props.reply.avatar}
            className="mr-2"
          />
        </Media>
        <Media body style={{ 'overflow-x': 'auto' }}>
          <Card
            body
            className={`mb-2 ${props.cardClassName}`}
            style={{ position: 'relative' }}
          >
            <h5
              className="position-absolute mb-4"
              style={{ top: 5, right: 10, cursor: 'pointer' }}
            >
              <Badge color="primary">
                {props.reply?.activityPoints || 0} points
              </Badge>
            </h5>
            <p className="mb-0 mt-2">
              {props.reply && props.reply.text}

              {props.currentUser &&
                props.reply &&
                props.reply.employeeId == props.currentUser.employeeId && (
                  <a
                    href="#"
                    onClick={handleDeleteReply}
                    style={{
                      position: 'absolute',
                      bottom: '3px',
                      right: '8px',
                    }}
                  >
                    <i className="fa fa-trash-o"></i>
                  </a>
                )}
            </p>
          </Card>
          <div className="mb-2">
            <span className="text-inverse mr-2">
              {props.reply && props.reply.learner}
            </span>
            <span className="small">
              {props.reply &&
                props.reply.modifiedAt &&
                moment(props.reply.modifiedAt).format('LLLL')}
            </span>
          </div>
        </Media>
      </Media>
    </React.Fragment>
  )
}

ActivityReplyLeft.propTypes = {
  cardClassName: PropTypes.node,
}
ActivityReplyLeft.defaultProps = {
  cardClassName: 'bg-white',
}

export default hot(module)(ActivityReplyLeft)
