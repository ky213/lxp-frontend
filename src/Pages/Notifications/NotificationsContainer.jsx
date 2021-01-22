import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Preloader } from 'Components';
import Notifications from './Notifications';
import { getNotifications } from 'Store/Reducers/notifications';

const NotificationsContainer = props => {
  useEffect(() => {
    // props.getNotifications(props.currentPage, props.pageSize);
  }, []);

  return (
    <>
      {props.notifications.loading ? (
        <Preloader />
      ) : (
        <Notifications notifications={props.notifications.notifications} />
      )}
    </>
  );
};

let mapStateToProps = state => ({
  notifications: state.notifications,
  currentPage: state.notifications.currentPage,
  pageSize: state.notifications.pageSize,
});

export default connect(mapStateToProps, {
  getNotifications,
})(NotificationsContainer);
