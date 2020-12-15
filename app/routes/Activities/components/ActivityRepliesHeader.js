import React, { useState } from 'react'
import { hot } from 'react-hot-loader'

import { activityService } from '@/services'
import { Row, Col, Button, Loading } from '@/components'
import { Role } from '@/helpers'

const ActivityRepliesHeader = ({ currentUser, selectedActivity }) => {
  const [loading, setLoading] = useState(false)

  const handleEvalute = async e => {
    const replies = selectedActivity.replies
      .map(reply => {
        if (!reply.points) reply.points = 0
        return reply
      })
      .filter(reply => reply.employeeId !== selectedActivity.assignedBy)

    const totalPoints = replies.reduce((total, reply) => {
      return total + reply.points
    }, 0)

    if (totalPoints > selectedActivity.totalPoints) {
      alert("Total points can't be greater than activity points")
      return
    }

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
        <h6 className="">
          Total points: {selectedActivity.totalPoints || 'N/A'}
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
