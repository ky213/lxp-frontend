import React from 'react'
import { hot } from 'react-hot-loader'

import { activityService } from '@/services'
import { Row, Col, Button } from '@/components'
import { Role } from '@/helpers'

const ActivityRepliesHeader = ({ currentUser, selectedActivity }) => {
  const handleEvalute = async e => {
    const replies = selectedActivity.replies.filter(
      reply => reply.employeeId !== selectedActivity.assignedBy
    )
    try {
      await activityService.evaluate(selectedActivity.activityId, replies)
    } catch (error) {}
  }

  return (
    <Row className="w-100">
      <Col>
        <h6 className="">
          {(currentUser?.role == Role.Learner && 'My feedback/comments') ||
            'Replies to this activity'}
        </h6>
      </Col>
      <Col className="text-right">
        {currentUser?.role != Role.Learner && (
          <Button color="info" onClick={handleEvalute}>
            Evaluate
          </Button>
        )}
      </Col>
    </Row>
  )
}

export default hot(module)(ActivityRepliesHeader)
