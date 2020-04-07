import React from 'react';

import { 
    Container,
    Row,
    CardBody,
    Col,
    CardHeader,
    Card,
    CardFooter
} from '@/components';
import {ActivityReplyLeft}  from "./ActivityReplyLeft";
import { ActivityReplyRight } from "./ActivityReplyRight";
import { ActivityRepliesFooter } from "./ActivityRepliesFooter";
import { ActivityRepliesHeader } from "./ActivityRepliesHeader";
import {activityService} from '@/services';
import { useAppState } from '@/components/AppState';
import { Role} from '@/helpers';

const ActivityReplies = (props) => {
    const [{currentUser, selectedInstitute}, dispatch] = useAppState();
    const [replies, setReplies] = React.useState(props.selectedActivity && props.selectedActivity.replies || []);
    
    const getReplies = async () => {
        const replies = await activityService.getReplies(props.selectedActivity && props.selectedActivity.activityId);
        setReplies(replies);
    }

    const handleSendReply = async (reply) => {
        //console.log("Triggered send reply:", {text:reply, activityId: props.selectedActivity && props.selectedActivity.activityId || null})
        await activityService.addReply({text:reply, activityId: props.selectedActivity && props.selectedActivity.activityId || null});
        await getReplies();
    }

    const handleDeleteReply = async (replyId) => {
        //console.log("Delete reply:", replyId)
        try {
            await activityService.deleteReply(replyId);
            await getReplies();
        }
        catch(error) {
            alert(error)
        }
    }

    let currentReplyEmployeeId = null;
    let altDirection = false;
    return (
    <React.Fragment>
        <Container>
           
            { /* START Content */}
            <Row>
                <Col lg={12}>
                <Card className="mb-3">
                    <CardHeader className="d-flex bb-0 bg-white">
                        <ActivityRepliesHeader currentUser={props.currentUser} />
                    </CardHeader>
                    <CardBody>
                        {replies.map((reply, ind) => {
                            console.log("Reply:", reply, currentReplyEmployeeId, currentReplyEmployeeId && currentReplyEmployeeId != reply.employeeId)
                            
                            if(currentReplyEmployeeId && currentReplyEmployeeId != reply.employeeId) {
                                
                                altDirection = !altDirection;
                            }
  
                            currentReplyEmployeeId = reply.employeeId;
                            return !altDirection ? 
                                <ActivityReplyLeft currentUser={currentUser && currentUser.user} key={ind} onDelete={handleDeleteReply} reply={reply} cardClassName={`${ind % 2 == 0 ? "bg-gray-300 b-0" : ""} text-dark`} /> :
                                <ActivityReplyRight currentUser={currentUser && currentUser.user} key={ind} onDelete={handleDeleteReply} reply={reply} cardClassName={`${ind % 2 == 0 ? "bg-gray-300 b-0" : ""} text-dark`} />
                        })}
                    </CardBody>
                        {currentUser && currentUser.user && currentUser.user.role != Role.SuperAdmin && (
                            <CardFooter>
                                <ActivityRepliesFooter onSendReply={handleSendReply} />
                            </CardFooter>
                        )}
                </Card>
                </Col>
            </Row>
            { /* END Content */}

        </Container>
    </React.Fragment>
)};

export default ActivityReplies;