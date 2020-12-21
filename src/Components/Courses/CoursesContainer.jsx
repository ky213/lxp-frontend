import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Courses from './Courses';
import { getCourses } from '../../Redux/coursesReducer';
import Preloader from '../Common/Preloader/Preloader';

const CoursesContainer = (props) => {
    useEffect(()=>{
        if(props.page && props.take){
            props.getCourses(props.user.organizationId, props.page, props.take);
        }
    },[]);
    return(
        <>
            {props.isFetching ? <Preloader/> :
            <Courses courses={props.courses}/>}
        </>
        
    );
}

let mapStateToProps = (state) => ({
    courses: state.courses.courses,
    user: state.user.user,
    isFetching: state.common.isFetching,
    page: state.courses.page,
    take: state.courses.take
});

export default connect(mapStateToProps, {
    getCourses
})(CoursesContainer);