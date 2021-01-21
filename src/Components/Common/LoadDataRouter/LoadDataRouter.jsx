import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { setCurrentRoute } from 'Store/Reducers/common';
import { getUserProfile, getProfile } from 'Store/Reducers/users';
import { Login } from 'Pages/Auth/Login/Login';
import { getUnreadNotifications } from 'Store/Reducers/notifications';

const LoadDataRouter = ({
  Component,
  isAuthenticated,
  setCurrentRoute,
  currentRoute,
  getUserProfile,
  getProfile,
  isStartData,
  getUnreadNotifications,
  profile,
  limit,
  employeeId,
  ...rest
}) => {
  useEffect(() => {
    if ((localStorage.usertoken || sessionStorage.usertoken) && !isStartData) {
      if (employeeId) {
        getUserProfile(employeeId);
      } else {
        getProfile(localStorage.usertoken || sessionStorage.usertoken);
      }
      getUnreadNotifications(limit, profile.organizationId);
    }
  }, [employeeId]);

  useEffect(() => {
    setCurrentRoute(window.location.pathname);
  }, [window.location.pathname]);

  return <>{localStorage.usertoken || sessionStorage.usertoken ? <Component {...rest} /> : <Redirect to="/login" />}</>;
};

let mapStateToProps = state => ({
  isAuthenticated: state.authentication.isAuthenticated,
  currentRoute: state.common.currentRoute,
  isStartData: state.authentication.profile.isStartData,
  profile: state.authentication.profile,
  limit: state.notifications.limit,
  employeeId: state.authentication.profile.employeeId,
});

export default connect(mapStateToProps, {
  setCurrentRoute,
  getUserProfile,
  getProfile,
  getUnreadNotifications,
})(LoadDataRouter);
