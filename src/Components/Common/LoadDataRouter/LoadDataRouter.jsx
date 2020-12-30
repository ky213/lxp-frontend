import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { setCurrentRoute } from '../../../Redux/commonReducer';
import { getProfile } from '../../../Redux/userReducer';
import Login from '../../Auth/Login/Login';

const LoadDataRouter = ({Component, isAuth, setCurrentRoute, currentRoute, getProfile}) => {
    const [email, setEmail] = useState('mais.o@awarnessorg.com');
    const [password, setPassword] = useState('admin');

    useEffect(()=>{
        setCurrentRoute(window.location.pathname);
        if(localStorage.usertoken){
            getProfile(localStorage.usertoken);
        }
        
    },[]);
    return(
       <Component/> 
    )
}

let mapStateToProps = (state) => ({
    isAuth: state.user.isAuth,
    currentRoute: state.common.currentRoute
});

export default connect(mapStateToProps, {
    setCurrentRoute,
    getProfile
})(LoadDataRouter);