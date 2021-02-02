import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';

import { Preloader } from 'Components';
import { Header, Body } from './Components';
import { getOneCourse, resetCoursesState } from 'Store/Reducers/courses';

const Main = props => {
  const params = useParams();

  const { courses, profile } = props;

  useEffect(() => {
    props.getOneCourse(profile.organizationId, params.courseId);
    return props.resetCoursesState();
  }, []);

  useEffect(() => {
    if (!courses.loading && courses.success) props.getOneCourse(profile.organizationId, params.courseId);
  }, [courses.loading, courses.success]);

  if (courses.loading) return <Preloader />;

  return (
    <div>
      <Header course={courses.currentCourse} />
      <Body course={courses.currentCourse} />
    </div>
  );
};

const mapstateToProps = state => ({
  profile: state.authentication.profile,
  courses: state.courses,
});

const mapDispatchToProps = {
  getOneCourse,
  resetCoursesState,
};

export default connect(mapstateToProps, mapDispatchToProps)(Main);
