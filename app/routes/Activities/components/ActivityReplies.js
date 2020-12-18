import React, { useEffect } from 'react'

import {
  Container,
  Row,
  CardBody,
  Col,
  CardHeader,
  Card,
  CardFooter,
} from '@/components'
import ActivityReplyLeft from './ActivityReplyLeft'
import ActivityReplyRight from './ActivityReplyRight'
import { ActivityRepliesFooter } from './ActivityRepliesFooter'
import ActivityRepliesHeader from './ActivityRepliesHeader'
import { activityService } from '@/services'
import { useAppState } from '@/components/AppState'
import { Role } from '@/helpers'
import { hot } from 'react-hot-loader'

const ActivityReplies = props => {
  const [{ currentUser, selectedOrganization }, dispatch] = useAppState()
  const [replies, setReplies] = React.useState(
    props.selectedActivity?.replies || []
  )
  const [loading, setLoading] = React.useState(false)
  const { destination } = props

  useEffect(() => {
    getReplies()
  }, [])

  const getReplies = async () => {
    const replies =
      (destination &&
        destination == 'log-activity' &&
        (await activityService.getLogActivityReplies(
          props.selectedActivity && props.selectedActivity.activityId
        ))) ||
      (await activityService.getReplies(
        props.selectedActivity && props.selectedActivity.activityId
      ))

    setReplies(replies)
  }

  const handleSendReply = async reply => {
    ;(destination &&
      destination == 'log-activity' &&
      (await activityService.addLogActivityReply({
        text: reply,
        activityId:
          (props.selectedActivity && props.selectedActivity.activityId) || null,
      }))) ||
      (await activityService.addReply({
        text: reply,
        activityId:
          (props.selectedActivity && props.selectedActivity.activityId) || null,
      }))
    await getReplies()
  }

  const handleDeleteReply = async replyId => {
    try {
      ;(destination &&
        destination == 'log-activity' &&
        (await activityService.deleteLogActivityReply(replyId))) ||
        (await activityService.deleteReply(replyId))

      await getReplies()
    } catch (error) {
      alert(error)
    }
  }

  const handleSetActivityReplyPoints = (replyId, points) => {
    replies?.forEach(reply => {
      if (reply.activityReplyId === replyId) reply.points = points
    })

    setReplies(replies)
    if (props.selectedActivity) props.selectedActivity.replies = replies
  }

  const handleEvalute = async () => {
    const { selectedActivity } = props
    const finalReplies = selectedActivity.replies
      .map(reply => {
        if (!reply.points) reply.points = 0
        return reply
      })
      .filter(reply => reply.employeeId !== selectedActivity.assignedBy)

    const totalPoints = finalReplies.reduce((total, reply) => {
      return total + reply.points
    }, 0)

    if (totalPoints > selectedActivity.totalPoints) {
      alert("Total points can't be greater than activity points")
      return
    }

    try {
      setLoading(true)
      await activityService.evaluate(selectedActivity.activityId, finalReplies)

      selectedActivity.status = 'Closed'
      setLoading(false)
      alert('Activity evaluated successfuly')
    } catch (error) {
      setLoading(false)
      alert('Error evaluating activity')
    }
  }

  return (
    <React.Fragment>
      <Container>
        {/* START Content */}
        <Row>
          <Col lg={12}>
            <Card className="mb-3">
              <CardHeader
                className="d-flex bg-white bb-0"
                style={{ 'box-shadow': '0px 1px 12px -6px grey' }}
              >
                <ActivityRepliesHeader
                  selectedActivity={props.selectedActivity}
                  currentUser={props.currentUser}
                  handleEvalute={handleEvalute}
                  loading={loading}
                />
              </CardHeader>
              <CardBody style={{ maxHeight: '50vh', 'overflow-y': 'scroll' }}>
                {replies.map((reply, ind) => {
                  const isLearner = currentUser.user.role === Role.Learner
                  let isAdminReply

                  // Assigned activity
                  if (props.selectedActivity.assignedBy)
                    isAdminReply =
                      reply.employeeId === props.selectedActivity.assignedBy

                  // Logged Activity
                  if (props.selectedActivity.loggedBy)
                    isAdminReply =
                      reply.employeeId !== props.selectedActivity.loggedBy

                  return !isAdminReply ? (
                    <ActivityReplyLeft
                      currentUser={currentUser && currentUser.user}
                      key={ind}
                      onDelete={handleDeleteReply}
                      reply={reply}
                      cardClassName={`text-dark`}
                      setReplyPoints={handleSetActivityReplyPoints}
                      selectedActivity={props.selectedActivity}
                      canEvaluate={!isLearner}
                      loading={loading}
                    />
                  ) : (
                    <ActivityReplyRight
                      currentUser={currentUser && currentUser.user}
                      key={ind}
                      onDelete={handleDeleteReply}
                      reply={reply}
                      cardClassName={`bg-gray-300 b-0 text-dark`}
                    />
                  )
                })}
              </CardBody>
              {currentUser &&
                currentUser.user &&
                currentUser.user.role != Role.SuperAdmin && (
                  <CardFooter>
                    <ActivityRepliesFooter onSendReply={handleSendReply} />
                  </CardFooter>
                )}
            </Card>
          </Col>
        </Row>
        {/* END Content */}
      </Container>
    </React.Fragment>
  )
}

export default hot(module)(ActivityReplies)
