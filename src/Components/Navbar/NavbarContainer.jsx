import React, { useState } from 'react';
import { connect } from 'react-redux';
import Navbar from './Navbar';

const NavbarContainer = (props) => {
    const [isOpenSearchModal, setIsOpenSearchModal] = useState(false);
    const [isOpenNotificationsModal, setIsOpenNotificationsModal] = useState(false);
    return(
        <>
        {props.currentRoute != "/login" &&
        <Navbar user={props.user} 
                changeLanguage={props.changeLanguage}
                direction={props.direction}
                setIsOpenSearchModal={setIsOpenSearchModal}
                isOpenSearchModal={isOpenSearchModal}
                totalUnreadNotificationsCount={props.totalUnreadNotificationsCount}
                unreadNotifications={props.unreadNotifications}
                setIsOpenNotificationsModal={setIsOpenNotificationsModal}
                isOpenNotificationsModal={isOpenNotificationsModal}/>}
        </>
    );
}

let mapStateToProps = (state) => ({
    user: state.user.user,
    direction: state.common.direction,
    currentRoute: state.common.currentRoute,
    unreadNotifications: state.notifications.unreadNotifications,
    totalUnreadNotificationsCount: state.notifications.totalUnreadNotificationsCount
});

export default connect(mapStateToProps, {})(NavbarContainer);