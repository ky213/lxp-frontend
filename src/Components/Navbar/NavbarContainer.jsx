import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Navbar from './Navbar';
import { getNotifications } from 'Store/Reducers/notifications';
import { setCurrentLanguage } from 'Store/Reducers/common';

const NavbarContainer = props => {
  const [isOpenSearchModal, setIsOpenSearchModal] = useState(false);
  const [isOpenNotificationsModal, setIsOpenNotificationsModal] = useState(false);

  useEffect(() => {
    props.getNotifications(props.currentPage, props.pageSize);
  }, [props.currentPage, props.pageSize]);

  useEffect(() => {}, [props.currentRoute]);

  return (
    <Navbar
      profile={props.profile}
      changeLanguage={props.changeLanguage}
      direction={props.direction}
      setIsOpenSearchModal={setIsOpenSearchModal}
      isOpenSearchModal={isOpenSearchModal}
      totalUnreadNotificationsCount={props.totalUnreadNotificationsCount}
      unreadNotifications={props.unreadNotifications}
      setIsOpenNotificationsModal={setIsOpenNotificationsModal}
      isOpenNotificationsModal={isOpenNotificationsModal}
      setCurrentLanguage={props.setCurrentLanguage}
      currentRoute={props.currentRoute}
    />
  );
};

let mapStateToProps = state => ({
  profile: state.authentication.profile,
  direction: state.common.direction,
  currentRoute: state.common.currentRoute,
  unreadNotifications: state.notifications.unreadNotifications,
  totalUnreadNotificationsCount: state.notifications.totalUnreadNotificationsCount,
  currentPage: state.notifications.currentPage,
  pageSize: state.notifications.pageSize,
  notifications: state.notifications.notifications,
});

export default connect(mapStateToProps, {
  getNotifications,
  setCurrentLanguage,
})(NavbarContainer);
