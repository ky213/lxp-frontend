import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { setCurrentRoute } from '../../../Redux/commonReducer';
import { getUserProfile, getProfile } from '../../../Redux/userReducer';
import Login from '../../Auth/Login/Login';
import { getUnreadNotifications } from '../../../Redux/notificationsReducer';

const LoadDataRouter = ({Component, isAuth, setCurrentRoute,
                        currentRoute, getUserProfile, getProfile, isStartData,
                        getUnreadNotifications, user, limit, employeeId}) => {
    useEffect(()=>{
        setCurrentRoute(window.location.pathname);
        if((localStorage.usertoken || sessionStorage.usertoken) && !isStartData){
            if(employeeId){
                getUserProfile(employeeId);
            }else{
                getProfile(localStorage.usertoken || sessionStorage.usertoken);
            }
            getUnreadNotifications(limit, user.organizationId);
        }   
    },[employeeId]);
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
    limit: state.notifications.limit,
    employeeId: state.user.employeeId
});

export default connect(mapStateToProps, {
    setCurrentRoute,
    getUserProfile,
    getProfile,
    getUnreadNotifications
})(LoadDataRouter);