import React from 'react';
import { connect } from 'react-redux';
import Courses from './Courses';

const CoursesContainer = (props) => {
    return(
        <Courses courses={props.courses}/>
    );
}

let mapStateToProps = (state) => ({
    courses: state.courses.courses
});

export default connect(mapStateToProps, {})(CoursesContainer);