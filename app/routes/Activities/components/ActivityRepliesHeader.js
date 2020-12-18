import React, { useState } from 'react'
import { hot } from 'react-hot-loader'

import { activityService } from '@/services'
import { Row, Col, Button, Loading } from '@/components'
import { Role } from '@/helpers'

const ActivityRepliesHeader = ({
  currentUser,
  selectedActivity,
  handleEvalute,
  loading,
}) => {
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
            title={
              selectedActivity.status === 'Closed'
                ? 'Activity closed'
                : 'Evaluate activity'
            }
          >
            {loading ? <Loading small /> : 'Evaluate'}
          </Button>
        )}
      </Col>
    </Row>
  )
}

export default hot(module)(ActivityRepliesHeader)
