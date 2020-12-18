import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Preloader from '../Common/Preloader/Preloader';
import Home from './Home';

const HomeContainer = (props) => {
    return(
        <>
            {props.isFetching && <Preloader/>}
            {props.isAuth && <Home user={props.user}
                                    courses={props.courses}
                                    activities={props.activities}/>}
        </>
        
    );
}

let mapStateToProps = (state) => ({
    isFetching: state.common.isFetching,
    user: state.user.user,
    isAuth: state.user.isAuth,
    courses: state.courses.courses,
    activities: state.activities.activities
});

export default connect(mapStateToProps, {})(HomeContainer);