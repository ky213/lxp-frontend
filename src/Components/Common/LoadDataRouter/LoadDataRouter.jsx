import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { setCurrentRoute } from '../../../Redux/commonReducer';
import { getProfile } from '../../../Redux/userReducer';
import Login from '../../Auth/Login/Login';
import { getUnreadNotifications } from '../../../Redux/notificationsReducer';

const LoadDataRouter = ({Component, isAuth, setCurrentRoute,
                        currentRoute, getProfile, isStartData,
                        getUnreadNotifications, user, limit}) => {
    const [email, setEmail] = useState('mais.o@awarnessorg.com');
    const [password, setPassword] = useState('admin');

    useEffect(()=>{
        setCurrentRoute(window.location.pathname);
        if((localStorage.usertoken || sessionStorage.usertoken) && !isStartData){
            getProfile(localStorage.usertoken || sessionStorage.usertoken);
            getUnreadNotifications(limit, user.organizationId);
        }   
    },[]);
    return(
        <>
            {(localStorage.usertoken || sessionStorage.usertoken) ? <Component/> : <Redirect to="/login"/>}
        </>
        
    )
}

let mapStateToProps = (state) => ({
    isAuth: state.user.isAuth,
    currentRoute: state.common.currentRoute,
    isStartData: state.user.isStartData,
    user: state.user.user,
    limit: state.notifications.limit
});

export default connect(mapStateToProps, {
    setCurrentRoute,
    getProfile,
    getUnreadNotifications
})(LoadDataRouter);