import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import { 
    Card,
    Media,
    Avatar,
    AvatarAddOn
} from '@/components';


const ActivityReplyRight = (props) => {

    const handleDeleteReply = (e) => {
        e.preventDefault(); 
        if(confirm("Are you sure you want to delete this reply?"))
        {
            props.onDelete(props.reply.activityReplyId);
        } 
    }

    const handleEditReply = (e) => {

    }
    
    return (
    <React.Fragment>
        <Media className="mb-2">
            <Media body>
                <Card body className={ `mb-2 ${ props.cardClassName }` } style={{position: 'relative'}}>
                    <p className="mb-0">
                        { props.reply && props.reply.text }
                        {/*
                        <a href="#" className="mr-1" style={{position: 'absolute', bottom: '3px', right: '22px'}}>
                            <i className="fa fa-pencil"></i>
                        </a>
                        */}
                       {props.currentUser && props.reply && props.reply.employeeId == props.currentUser.employeeId && (
                        <a href="#" onClick={handleDeleteReply} style={{position: 'absolute', bottom: '3px', right: '8px'}}>
                            <i className="fa fa-trash-o"></i>
                        </a>
                       )}
                    </p>                                                   
                </Card>
                <div className="mb-2 text-right">
                    <span className="text-inverse mr-2">
                        { props.reply && props.reply.learner } 
                    </span>
                    <span className="small">
                        {props.reply && props.reply.modifiedAt && moment(props.reply.modifiedAt).format('LLLL')}
                    </span>
                </div>
            </Media>
            <Media right className="ml-3">
                <Avatar.Image
                    size="md"
                    src={ props.reply && props.reply.avatar }
                    className="mr-2"
                />
            </Media>
        </Media>
    </React.Fragment>
)}

ActivityReplyRight.propTypes = {
    cardClassName: PropTypes.node
};
ActivityReplyRight.defaultProps = {
    cardClassName: "bg-white"
};

export { ActivityReplyRight };
