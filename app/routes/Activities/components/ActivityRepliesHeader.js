import React from 'react';
import { Role } from '@/helpers';


const ActivityRepliesHeader = (props) => (
    <React.Fragment>
    <h6 className="align-self-center mb-0">
        {props.currentUser && props.currentUser.role == Role.Resident && "My feedback/comments" || "Replies to this activity"}
    </h6>
    </React.Fragment>
)

export { ActivityRepliesHeader };
