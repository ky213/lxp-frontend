import React, { useState } from 'react'
import { hot } from 'react-hot-loader'

import { activityService } from '@/services'
import { Row, Col, Button, Loading } from '@/components'
import { Role } from '@/helpers'

const ActivityRepliesHeader = ({ currentUser, selectedActivity }) => {
  const [loading, setLoading] = useState(false)

  const handleEvalute = async e => {
    const replies = selectedActivity.replies.filter(
      reply => reply.employeeId !== selectedActivity.assignedBy
    )
    try {
      setLoading(true)
      await activityService.evaluate(selectedActivity.activityId, replies)
      setLoading(false)

      alert('Activity evaluated successfuly')
    } catch (error) {
      setLoading(false)
      alert('Error evaluating activity')
    }
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
          <Button
            color="info"
            onClick={handleEvalute}
            disabled={selectedActivity.status === 'Closed'}
          >
            {loading ? <Loading small /> : 'Evaluate'}
          </Button>
        )}
      </Col>
    </Row>
  )
}

export default hot(module)(ActivityRepliesHeader)
