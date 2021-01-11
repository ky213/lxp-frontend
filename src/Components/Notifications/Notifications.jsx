import React from 'react';
import classes from './Notifications.module.css';
import { notificationicon } from '../../Assets/Images/notification';
import { useTranslation } from 'react-i18next';
import markasreadicon from '../../Assets/Images/asreadicon.svg';
import NotificationItem from './NotificationItem/NotificationItem';

const Notifications = (props) => {
    const {t, i18n} = useTranslation();
    
    let newNotifications = [];
    let notifications = [];

    newNotifications = props.notifications.map(notify => {
        if(!notify.isRead){
            return <NotificationItem isRead={false} item={notify}/>
        }
    });

    notifications = props.notifications.map(notify => {
        if(notify.isRead){
            return <NotificationItem isRead={true} item={notify}/>
        }
    })

    return(
        <div className={classes.main}>
            <div className={classes.container}>
                <div className={classes.header}>
                    <div className={classes.headerSide}>
                        {notificationicon}
                        <h3>{t("notifications.title")}</h3>
                    </div>
                    <div className={classes.headerSide}>
                        <button>
                            <img src={markasreadicon}/>
                            <span>{t("notifications.markAllRead")}</span>
                        </button>
                    </div>
                </div>
                <div className={classes.contentContainer}>
                    <div className={classes.new}>
                        {newNotifications}
                    </div>
                    <h3>{t("notifications.earlier")}</h3>
                    <div className={classes.itemsList}>
                        {notifications}
                    </div>
                </div>
                
            </div>
        </div>
    );
}

export default Notifications;

