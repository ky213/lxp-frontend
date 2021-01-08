import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import classes from './NotificationsModal.module.css';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import NotificationModalItem from './NotificationModalItem/NotificationModalItem';


const StyledModal = styled.div`
    transform: ${({ direction }) => direction === "ltr" ? 'translateY(200px) translateX(232px)' : 'translateY(200px) translateX(-232px);' }; 
    @media screen and (max-width: 1000px){
        width: 620px;
        
    }
    @media screen and (max-width: 822px){
        width: 520px;
        
    }
    @media screen and (max-width: 693px){
        width: 420px;
        
    }
`;

const StyledArrow = styled.div`
    left: ${({ direction }) => direction === "ltr" ? "42px" : "-42px"};
    
    & div{
        left: ${({ direction }) => direction === "ltr" ? "3.5px" : "-4.2px"};
    }
`;


const NotificationsModal = (props) => {
    const {t, i18n} = useTranslation();

    let notifications = [];

    if(props.notifications){
        notifications = props.notifications.map(notification => {
            return <NotificationModalItem item={notification}/>
        });
    }
    

    return(
        <StyledModal className={classes.main} direction={props.direction}>
            <StyledArrow className={classes.arrow} direction={props.direction}>
                <div className={classes.innerArrow}></div>
            </StyledArrow>
            <div className={classes.body}>
                <div className={classes.header}>
                    <h3>{t("notificationsModal.title")}</h3>
                    <NavLink to="/home/notifications">{t("notificationsModal.viewAll")}</NavLink>
                </div>
                {(notifications.length > 0 && notifications) ? 
                    <div className={classes.notifications}>
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
    direction: state.common.directions,
    notifications: state.notifications.notifications
});

export default connect(mapStateToProps, {

})(NotificationsModal);