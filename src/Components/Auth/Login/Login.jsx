import React, { useEffect, useState } from 'react';
import classes from '../Auth.module.css';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { NavLink, Redirect } from 'react-router-dom';
import Preloader from '../../Common/Preloader/Preloader';
import { AuthInput } from '../../Common/FormControlls/FormControlls';
import { useTranslation } from 'react-i18next';
import { login } from '../../../Redux/userReducer';
import { setCurrentRoute } from '../../../Redux/commonReducer';
import { isEmail, required } from '../../../Utils/validators';

const LoginForm = (props) => {
    const {t, i18n} = useTranslation();
    return(
        <form className={classes.form} onSubmit={props.handleSubmit}>
            <h3>{t("login.title")}</h3>
            <div className={classes.field}>
                <label>{t("login.username")}</label>
                <Field component={AuthInput} placeholder={t("login.usernamePlaceholder")} name="email"
                        validate={[required, isEmail]}/>
            </div>
            <div className={classes.field}>
                <label>{t("login.password")}</label>
                <Field component={AuthInput} placeholder={t("login.passwordPlaceholder")} name="password" type="password"
                        validate={[required]}/>
            </div>
            <label className={classes.checkbox}>
                <span className={classes.checkText}>{t("login.rememberMe")}</span>
                <input type="checkbox"  onChange={()=>{props.setIsRememberMe(!props.isRememberMe)}} value={props.isRememberMe}/>
                <span className={classes.checkmark}></span>
            </label>
            <NavLink to="/forgot_password">{t("login.forgotPassword")}</NavLink>
            {props.error && <div className={classes.error}>{props.error}</div>}
            <button>{t("login.login")}</button>
        </form>
    );
}

const LoginReduxForm = reduxForm({form:'login'})(LoginForm);

const Login = (props) => {
    const [isRememberMe, setIsRememberMe] = useState(false);
    const {t, i18n} = useTranslation();

    useEffect(()=>{
        props.setCurrentRoute(window.location.pathname);
    },[]);

    const onSubmit = (formData) => {
        props.login(formData.email, formData.password, isRememberMe);
    }
    return(
        <div className={classes.main}>
            {(localStorage.usertoken || sessionStorage.usertoken) && <Redirect to="/"/>}
            <div className={classes.login}>
                <h1>{t("login.header")}</h1>
                {props.isFetching && <Preloader/>}
                <LoginReduxForm onSubmit={onSubmit} isRememberMe={isRememberMe} setIsRememberMe={setIsRememberMe}/>
            </div>
            <div className={classes.back}>
                <div></div>
                <div className={classes.green}></div>
            </div>
            
        </div>
    );
}

let mapStateToProps = (state) => ({
    isFetching: state.common.isFetching,
    isAuth: state.user.isAuth
});

export default connect(mapStateToProps, {
    login,
    setCurrentRoute
})(Login);



