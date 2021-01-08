import React from 'react';
import classes from './NotificationModalItem.module.css';
import { notificationicon } from '../../../../Assets/Images/notification.js';


const NotificationModalItem = (props) => {
    return(
        <div className={classes.main}>
            <div className={classes.image}>
                {notificationicon}
            </div>
            <div className={classes.info}>
                <p>{props.item.text}</p>
                <span>time</span>
            </div>
            <div className={classes.menu}>
                <span>menu</span>
            </div>
        </div>    
    );
}

export default NotificationModalItem;