import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Preloader from '../Common/Preloader/Preloader';
import Notifications from './Notifications';
import { getNotifications } from '../../Store/Reducers/notifications';

const NotificationsContainer = props => {
  useEffect(() => {
    props.getNotifications(props.currentPage, props.pageSize);
  }, [props.pageSize, props.currentPage]);

  return <>{props.isFetching ? <Preloader /> : <Notifications notifications={props.notifications} />}</>;
};

let mapStateToProps = state => ({
  isFetching: state.common.isFetching,
  notifications: state.notifications.notifications,
  currentPage: state.notifications.currentPage,
  pageSize: state.notifications.pageSize,
});

export default connect(mapStateToProps, {
  getNotifications,
})(NotificationsContainer);
