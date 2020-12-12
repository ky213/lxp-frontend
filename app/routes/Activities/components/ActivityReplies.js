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
    //console.log("Delete reply:", replyId)
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
    props.selectedActivity?.replies?.forEach(reply => {
      if (reply.activityReplyId === replyId) reply.points = points
    })

    setReplies(props.selectedActivity?.replies)
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
                />
              </CardHeader>
              <CardBody style={{ maxHeight: '50vh', 'overflow-y': 'scroll' }}>
                {replies.map((reply, ind) => {
                  return props.selectedActivity.assignedBy !==
                    reply.employeeId ? (
                    <ActivityReplyLeft
                      currentUser={currentUser && currentUser.user}
                      key={ind}
                      onDelete={handleDeleteReply}
                      reply={reply}
                      cardClassName={`text-dark`}
                      setReplyPoints={handleSetActivityReplyPoints}
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
