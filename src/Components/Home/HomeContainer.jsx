import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Preloader from '../Common/Preloader/Preloader';
import Home from './Home';

const HomeContainer = (props) => {
    //FOR TEST HARDCODE USER DATA

    return(
        <>
            {props.isFetching && <Preloader/>}
            {props.isAuth && <Home user={props.user}/>}
        </>
        
    );
}

let mapStateToProps = (state) => ({
    isFetching: state.common.isFetching,
    user: state.user.user,
    isAuth: state.user.isAuth
});

export default connect(mapStateToProps, {
    
})(HomeContainer);