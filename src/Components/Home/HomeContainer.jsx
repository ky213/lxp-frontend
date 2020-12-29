import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Preloader from '../Common/Preloader/Preloader';
import Home from './Home';
import { getCourses } from '../../Redux/coursesReducer';
import { getActivities } from '../../Redux/activitiesReducer';

const HomeContainer = (props) => {
    useEffect(()=>{
        props.getCourses(props.user.organizationId, props.page, props.take);
        props.getActivities(props.user.employeeId, props.user.userId, props.user.organizationId);
    },[]);
    return(
        <>
            {props.isFetching && <Preloader/>}
            {props.isAuth && <Home user={props.user}
                                    courses={props.courses}
                                    activities={props.activities}
                                    direction={props.direction}/>}
        </>
        
    );
}

let mapStateToProps = (state) => ({
    isFetching: state.common.isFetching,
    user: state.user.user,
    isAuth: state.user.isAuth,
    courses: state.courses.courses,
    activities: state.activities.activities,
    page: state.courses.page,
    take: state.courses.take,
    direction: state.common.direction
});

export default connect(mapStateToProps, {
    getCourses,
    getActivities
})(HomeContainer);