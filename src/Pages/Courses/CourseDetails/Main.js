import React from 'react';
import { connect } from 'react-redux';

const Main = () => {
  return <h1>Course details</h1>;
};

const mapstateToProps = state => ({
  courses: state.courses,
});

export default connect(mapstateToProps)(Main);
