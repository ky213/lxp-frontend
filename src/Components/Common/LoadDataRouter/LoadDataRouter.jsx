import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../../Redux/userReducer';

const LoadDataRouter = ({Component, isAuth, login}) => {
    const [email, setEmail] = useState('hello.learner@alwasaet.com');
    const [password, setPassword] = useState('admin');
    useEffect(()=>{
        if(!isAuth){
            login(email, password);
        }
    },[]);
    return(
        isAuth && <Component/>
    )
}

let mapStateToProps = (state) => ({
    isAuth: state.user.isAuth
});

export default connect(mapStateToProps, {
    login
})(LoadDataRouter);