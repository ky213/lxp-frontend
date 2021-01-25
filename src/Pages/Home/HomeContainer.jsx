import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Preloader } from 'Components';
import Home from './Home';
import courses, { getCourses, getJoinedCourses, resetCoursesState } from 'Store/Reducers/courses';
import { getActivities } from 'Store/Reducers/activities';

const HomeContainer = props => {
  useEffect(() => {
    if (props.profile.employeeId) {
      props.getJoinedCourses(props.profile.organizationId);
      props.getActivities(props.profile.employeeId, props.profile.userId, props.profile.organizationId);
    }
    return props.resetCoursesState;
  }, []);

  if (props.courses.loading) return <Preloader />;

  return (
    <Home
      user={props.profile}
      courses={props.courses.getJoinedCourses}
      activities={props.activities.activities}
      direction={props.direction}
      programs={props.programs}
    />
  );
};

let mapStateToProps = state => ({
  isFetching: state.common.isFetching,
  profile: state.authentication.profile,
  isAuthenticated: state.authentication.isAuthenticated,
  courses: state.courses,
  activities: state.activities,
  page: state.courses.page,
  take: state.courses.take,
  direction: state.common.direction,
  programs: state.programs.programs,
});

export default connect(mapStateToProps, {
  getCourses,
  getActivities,
  getJoinedCourses,
  resetCoursesState,
})(HomeContainer);
