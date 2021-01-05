import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Preloader from '../Common/Preloader/Preloader';
import Reports from './Reports';
import { getCourses } from '../../Redux/coursesReducer';
import { getActivities } from '../../Redux/activitiesReducer';
import { getPrograms } from '../../Redux/programsReducer';

const ReportsContainer = (props) => {
    useEffect(()=>{
        if(props.isAuth){
            props.getActivities(props.user.employeeId, props.user.userId, props.user.organizationId);
            props.getPrograms(props.user.organizationId);
        }
    },[props.isAuth]);

    return(
        <>
            {props.isFetching && <Preloader/>}
            {props.isAuth && <Reports user={props.user}
                                    courses={props.courses}
                                    activities={props.activities}
                                    direction={props.direction}
                                    programs={props.programs}/>}
        </>
        
    );
}

let mapStateToProps = (state) => ({
    isFetching: state.common.isFetching,
    user: state.user.user,
    isAuth: state.user.isAuth,
    courses: state.courses.joinedCourses,
    activities: state.activities.currentActivity,
    page: state.courses.page,
    take: state.courses.take,
    direction: state.common.direction,
    programs: state.programs.programs
});

export default connect(mapStateToProps, {
    getCourses,
    getActivities,
    getPrograms
})(ReportsContainer);