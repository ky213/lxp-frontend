import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Preloader } from '../../Components';
import Reports from './Reports';
import { getActivities } from '../../Store/Reducers/activities';
import { getJoinedCourses } from '../../Store/Reducers/courses';

const ReportsContainer = props => {
  useEffect(() => {
    if (props.profile.employeeId) {
      console.log('asd');
      props.getActivities(props.profile.employeeId, props.profile.userId, props.profile.organizationId);
    }
  }, [props.profile.employeeId]);

  useEffect(() => {
    props.getJoinedCourses(props.profile.joinedCourses);
  }, [props.profile.joinedCourses]);

  return (
    <>
      {props.isFetching ? (
        <Preloader />
      ) : (
        <>
          {
            <Reports
              user={props.profile}
              courses={props.courses}
              activities={props.activities}
              direction={props.direction}
              programs={props.programs}
            />
          }{' '}
        </>
      )}
    </>
  );
};

let mapStateToProps = state => ({
  isFetching: state.common.isFetching,
  profile: state.authentication.profile,
  isAuthenticated: state.authentication.isAuthenticated,
  courses: state.courses.joinedCourses,
  activities: state.activities.currentActivity,
  page: state.courses.page,
  take: state.courses.take,
  direction: state.common.direction,
  programs: state.programs.programs,
});

export default connect(mapStateToProps, {
  getActivities,
  getJoinedCourses,
})(ReportsContainer);
