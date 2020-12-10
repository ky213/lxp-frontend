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
import { ActivityRepliesHeader } from './ActivityRepliesHeader'
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
    //console.log("Triggered send reply:", {text:reply, activityId: props.selectedActivity && props.selectedActivity.activityId || null})
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

  return (
    <React.Fragment>
      <Container>
        {/* START Content */}
        <Row>
          <Col lg={12}>
            <Card className="mb-3">
              <CardHeader className="d-flex bb-0 bg-white">
                <ActivityRepliesHeader currentUser={props.currentUser} />
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
