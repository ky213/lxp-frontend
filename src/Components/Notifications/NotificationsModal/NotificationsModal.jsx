import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import classes from './NotificationsModal.module.css';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import NotificationModalItem from './NotificationModalItem/NotificationModalItem';


const StyledModal = styled.div`
    transform: ${({ direction, notifications }) => direction === "ltr" ? 'translateX(-138px)' : 'translateX(138px);' }; 
    @media screen and (max-width: 1020px){
        transform: ${({ direction, notifications }) => direction === "ltr" ? 'translateX(-232px)' : 'translateX(232px);' }; 
    }
    @media screen and (max-width: 507px){
        transform: ${({ direction, notifications }) => direction === "ltr" ? 'translateX(-155px)' : 'translateX(155px);' }; 
    }
    @media screen and (max-width: 375px){
        transform: ${({ direction, notifications }) => direction === "ltr" ? 'translateX(-139px)' : 'translateX(139px);' }; 
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

    const windowRef = useRef(null);

    

    function logit() {
        setIsScroll(!isScroll);
    }



    useEffect(() => {
        modalRef.current.addEventListener("scroll", logit);
        window.addEventListener("mousedown",(event) => {
            if(event.target.classList.value.includes("detectClick")){
                return
            }
            props.setIsOpenNotificationsModal(false)
        })
    }, [modalRef.current]);

    let notifications = [];

    if(props.notifications){
        notifications = props.notifications.map(notification => {
            
            return <NotificationModalItem item={notification} key={notification.notificationId} isScroll={isScroll}/>
        });
    }
    

    return(
        <StyledModal className={classes.main + " " + classes.detectClick} direction={props.direction} notifications={props.notifications} ref={windowRef}>
            <StyledArrow className={classes.arrow  + " " + classes.detectClick} direction={props.direction}>
                <div className={classes.innerArrow  + " " + classes.detectClick}></div>
            </StyledArrow>
            <div className={classes.body + " " + classes.detectClick}>
                <div className={classes.header + " " + classes.detectClick}>
                    <h3 className={classes.detectClick}>{t("notificationsModal.title")}</h3>
                    <NavLink to="/home/notifications" className={classes.detectClick} onClick={()=>{props.setIsOpenNotificationsModal(false)}}>{t("notificationsModal.viewAll")}</NavLink>
                </div>
                {(notifications.length > 0 && notifications) ? 
                    <div className={classes.notifications  + " " + classes.detectClick} ref={modalRef}>
                        {notifications}
                    </div> :
                    <div className={classes.empty  + " " + classes.detectClick}>
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