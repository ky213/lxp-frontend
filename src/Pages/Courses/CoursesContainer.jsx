import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Courses from './Courses';
import { getCourses } from '../../Store/Reducers/courses';
import { Preloader } from '../../Components';

const CoursesContainer = props => {
  useEffect(() => {
    if (props.page && props.take) {
      props.getCourses(props.profile.organizationId, props.page, props.take);
    }
  }, []);

  const [all, setAll] = useState(true);
  const [completed, setCompleted] = useState(true);
  const [inProgress, setInProgress] = useState(true);
  const [notStarted, setNotStarted] = useState(true);

  const handleAll = () => {
    let newAll = !all;
    setAll(!all);
    if (newAll) {
      setCompleted(true);
      setInProgress(true);
      setNotStarted(true);
      return;
    } else {
      setCompleted(false);
      setInProgress(false);
      setNotStarted(false);
    }
  };

  useEffect(() => {
    if (completed && inProgress && notStarted) {
      setAll(true);
    } else {
      setAll(false);
    }
  }, [completed, inProgress, notStarted]);

  return (
    <>
      {props.isFetching ? (
        <Preloader />
      ) : (
        <Courses
          courses={props.courses}
          direction={props.direction}
          all={all}
          setAll={handleAll}
          completed={completed}
          setCompleted={setCompleted}
          inProgress={inProgress}
          setInProgress={setInProgress}
          notStarted={notStarted}
          setNotStarted={setNotStarted}
        />
      )}
    </>
  );
};

let mapStateToProps = state => ({
  courses: state.courses.courses,
  profile: state.authentication.profile,
  isFetching: state.common.isFetching,
  page: state.courses.page,
  take: state.courses.take,
  direction: state.common.direction,
});

export default connect(mapStateToProps, {
  getCourses,
})(CoursesContainer);
