import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Navbar from './Navbar';
import { getNotifications } from '../../Redux/notificationsReducer';

const NavbarContainer = (props) => {
    const [isOpenSearchModal, setIsOpenSearchModal] = useState(false);
    const [isOpenNotificationsModal, setIsOpenNotificationsModal] = useState(false);
    
    useEffect(()=>{
        props.getNotifications(props.currentPage, props.pageSize)
    },[props.currentPage, props.pageSize]);

    return(
        <>
        {(props.currentRoute != "/login" && props.currentRoute != "/forgot_password") &&
        <Navbar user={props.user} 
                changeLanguage={props.changeLanguage}
                direction={props.direction}
                setIsOpenSearchModal={setIsOpenSearchModal}
                isOpenSearchModal={isOpenSearchModal}
                totalUnreadNotificationsCount={props.totalUnreadNotificationsCount}
                unreadNotifications={props.unreadNotifications}
                setIsOpenNotificationsModal={setIsOpenNotificationsModal}
                isOpenNotificationsModal={isOpenNotificationsModal}
                />}
        </>
    );
}

let mapStateToProps = (state) => ({
    user: state.user.user,
    direction: state.common.direction,
    currentRoute: state.common.currentRoute,
    unreadNotifications: state.notifications.unreadNotifications,
    totalUnreadNotificationsCount: state.notifications.totalUnreadNotificationsCount,
    currentPage: state.notifications.currentPage,
    pageSize: state.notifications.pageSize,
    notifications: state.notifications.notifications
});

export default connect(mapStateToProps, {
    getNotifications
})(NavbarContainer);