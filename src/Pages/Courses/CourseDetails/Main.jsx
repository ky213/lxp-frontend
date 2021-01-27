import React from 'react';
import { connect } from 'react-redux';

import { Header, Body } from './Components';

const Main = props => {
  const { courses } = props;
  return (
    <div>
      <Header course={courses.currentCourse} />
      <Body course={courses.currentCourse} />
    </div>
  );
};

const mapstateToProps = state => ({
  courses: state.courses,
});

export default connect(mapstateToProps)(Main);
