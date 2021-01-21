import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Preloader } from '../../Components';
import Home from './Home';
import { getCourses, setJoinedCourses } from '../../Store/Reducers/courses';
import { getActivities } from '../../Store/Reducers/activities';

const HomeContainer = props => {
  useEffect(() => {
    if (props.profile.employeeId) {
      props.getActivities(props.profile.employeeId, props.profile.userId, props.profile.organizationId);
    }
  }, [props.profile.employeeId]);

  useEffect(() => {
    props.setJoinedCourses(props.profile.joinedCourses);
  }, [props.profile.joinedCourses]);

  return (
    <>
      {props.isFetching && <Preloader />}
      {props.isAuthenticated && (
        <Home
          user={props.profile}
          courses={props.courses}
          activities={props.activities}
          direction={props.direction}
          programs={props.programs}
        />
      )}
    </>
  );
};

let mapStateToProps = state => ({
  isFetching: state.common.isFetching,
  profile: state.authentication.profile,
  isAuthenticated: state.authentication.isAuthenticated,
  courses: state.courses.joinedCourses,
  activities: state.activities.activities,
  page: state.courses.page,
  take: state.courses.take,
  direction: state.common.direction,
  programs: state.programs.programs,
});

export default connect(mapStateToProps, {
  getCourses,
  getActivities,
  setJoinedCourses,
})(HomeContainer);
