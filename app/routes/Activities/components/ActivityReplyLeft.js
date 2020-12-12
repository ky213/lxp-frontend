import React, { useState } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import classNames from 'classnames'
import { hot } from 'react-hot-loader'

import {
  Card,
  Media,
  Avatar,
  Badge,
  Form,
  FormGroup,
  Input,
  Button,
} from '@/components'
import { useAppState } from '@/components/AppState'
import { Role } from '@/helpers'

const PointsForm = ({ reply, setReplyPoints }) => {
  const [{ currentUser }] = useAppState()
  const [openPointsForm, setOpenPointsForm] = useState(true)
  const [points, setPoints] = useState(0)
  const [error, setError] = useState(false)

  const handleSetPointsClick = e => {
    setOpenPointsForm(false)
  }

  const handlePointsChange = e => {
    e.persist()

    const replyPoints = e.target.value

    if (isNaN(replyPoints) || replyPoints < 0) {
      setError(true)
      return
    }

    setPoints(+replyPoints)
    setError(false)
  }

  const handleSaveReplyPoints = e => {
    e.preventDefault()

    if (!error) setReplyPoints(reply.activityReplyId, points)

    setOpenPointsForm(true)
  }

  return (
    <div
      className="position-absolute mb-4"
      style={{ top: 5, right: 10, cursor: 'pointer' }}
    >
      <h5 onClick={handleSetPointsClick} className="position-relative">
        <Badge color="primary">{reply?.points || 0} points</Badge>
      </h5>
      {currentUser.user.role != Role.Learner && (
        <Form
          className={classNames([
            { 'd-none': openPointsForm },
            'position-absolute',
          ])}
          style={{ top: 2, right: 40 }}
          inline
        >
          <FormGroup>
            <Input
              id="points"
              name="points"
              type="number"
              defaultValue={reply?.points || 0}
              onChange={handlePointsChange}
            />
            <Button
              color="primary"
              type="button"
              onClick={handleSaveReplyPoints}
            >
              ok
            </Button>
          </FormGroup>
          <small className={classNames([{ 'd-none': !error }, 'text-danger'])}>
            should be a positif number
          </small>
        </Form>
      )}
    </div>
  )
}

const ActivityReplyLeft = props => {
  const handleDeleteReply = e => {
    e.preventDefault()
    if (confirm('Are you sure you want to delete this reply?')) {
      props.onDelete(props.reply.activityReplyId)
    }
  }

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
            <PointsForm
              reply={props.reply}
              setReplyPoints={props.setReplyPoints}
            />

            <p className="mb-0 mt-2">
              {props.reply?.text}

              {props.currentUser &&
                props.reply?.employeeId == props.currentUser.employeeId && (
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
            <span className="text-inverse mr-2">{props.reply?.learner}</span>
            <span className="small">
              {props.reply?.modifiedAt &&
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
