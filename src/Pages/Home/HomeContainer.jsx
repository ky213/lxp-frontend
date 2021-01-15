import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Preloader } from '../../Components';
import Home from './Home';
import { getCourses, setJoinedCourses } from '../../Store/Reducers/courses';
import { getActivities } from '../../Store/Reducers/activities';

const HomeContainer = props => {
  useEffect(() => {
    if (props.user.employeeId) {
      props.getActivities(props.user.employeeId, props.user.userId, props.user.organizationId);
    }
  }, [props.user.employeeId]);

  useEffect(() => {
    props.setJoinedCourses(props.user.joinedCourses);
  }, [props.user.joinedCourses]);

  return (
    <>
      {props.isFetching && <Preloader />}
      {props.isAuth && (
        <Home
          user={props.user}
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
  user: state.user.user,
  isAuth: state.user.isAuth,
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
