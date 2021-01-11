import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import classes from './NotificationsModal.module.css';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import NotificationModalItem from './NotificationModalItem/NotificationModalItem';


const StyledModal = styled.div`
    transform: ${({ direction, notifications }) => direction === "ltr" ? 'translateY('+ (notifications.length > 0 ? 205 : 65) + 'px) translateX(-138px)' : 'translateY(' + (notifications.length > 0 ? 205 : 65) + 'px) translateX(138px);' }; 
    @media screen and (max-width: 1020px){
        transform: ${({ direction, notifications }) => direction === "ltr" ? 'translateY('+ (notifications.length > 0 ? 205 : 65) + 'px) translateX(-232px)' : 'translateY(' + (notifications.length > 0 ? 205 : 65) + 'px) translateX(232px);' }; 
    }
    @media screen and (max-width: 507px){
        transform: ${({ direction, notifications }) => direction === "ltr" ? 'translateY('+ (notifications.length > 0 ? 205 : 65) + 'px) translateX(-155px)' : 'translateY(' + (notifications.length > 0 ? 205 : 65) + 'px) translateX(155px);' }; 
    }
    @media screen and (max-width: 375px){
        transform: ${({ direction, notifications }) => direction === "ltr" ? 'translateY('+ (notifications.length > 0 ? 205 : 65) + 'px) translateX(-139px)' : 'translateY(' + (notifications.length > 0 ? 205 : 65) + 'px) translateX(139px);' }; 
    }
`;

const StyledArrow = styled.div`
    left: ${({ direction }) => direction === "ltr" ? "-42px" : "42px"};
    
    & div{
        left: ${({ direction }) => direction === "ltr" ? "-4.2px" : "3.5px"};
    }

    @media screen and (max-width: 507px){
        left: ${({ direction }) => direction === "ltr" ? "-118px" : "118px"};
    }
    @media screen and (max-width: 428px){
        left: ${({ direction }) => direction === "ltr" ? "-53px" : "53px"};
    }
    @media screen and (max-width: 375px){
        left: ${({ direction }) => direction === "ltr" ? "-70px" : "70px"};
    }
`;


const NotificationsModal = (props) => {
    const {t, i18n} = useTranslation();

    const [isScroll, setIsScroll] = useState(false);
    const modalRef = useRef(null)

    function logit() {
        setIsScroll(!isScroll);
    }

    useEffect(() => {
        modalRef.current.addEventListener("scroll", logit);
    }, [modalRef.current]);

    let notifications = [];

    if(props.notifications){
        notifications = props.notifications.map(notification => {
            
            return <NotificationModalItem item={notification} key={notification.notificationId} isScroll={isScroll}/>
        });
    }
    

    return(
        <StyledModal className={classes.main} direction={props.direction} notifications={props.notifications} >
            <StyledArrow className={classes.arrow} direction={props.direction}>
                <div className={classes.innerArrow}></div>
            </StyledArrow>
            <div className={classes.body}>
                <div className={classes.header}>
                    <h3>{t("notificationsModal.title")}</h3>
                    <NavLink to="/home/notifications" onClick={()=>{props.setIsOpenNotificationsModal(false)}}>{t("notificationsModal.viewAll")}</NavLink>
                </div>
                {(notifications.length > 0 && notifications) ? 
                    <div className={classes.notifications} ref={modalRef}>
                        {notifications}
                    </div> :
                    <div className={classes.empty}>
                        <span>{t("notificationsModal.empty")}</span>
                    </div>
                }
            </div>
        </StyledModal>
    );
}

let mapStateToProps = (state) => ({
    direction: state.common.direction,
    notifications: state.notifications.unreadNotifications
});

export default connect(mapStateToProps, {

})(NotificationsModal);