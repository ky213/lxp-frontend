import React from 'react';
import classes from './ProfilePassword.module.css';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { AuthInput } from '../../Common/FormControlls/FormControlls';
import { Field, reduxForm } from 'redux-form';
import { passValidationMatch, required } from '../../../Utils/validators';
import { NavLink } from 'react-router-dom';

const ProfilePasswordForm = (props) => {
    const {t, i18n} = useTranslation();

    return(
        <form className={classes.form} onSubmit={props.handleSubmit}>
            <div className={classes.field + " " + classes.fieldBorder}>
                <label>{t("profile.profilePass.current")}</label>
                <Field component={AuthInput} name="password" validate={[required]} disabled type={"password"}/>
            </div>
            <div className={classes.field}>
                <label>{t("profile.profilePass.new")}</label>
                <Field component={AuthInput} name="newPassword" validate={[required]} type={"password"}/>
            </div>
            <div className={classes.field}>
                <label>{t("profile.profilePass.reenter")}</label>
                <Field component={AuthInput} name="repeatPassword" validate={[required, passValidationMatch]} type={"password"}/>
            </div>
            <div className={classes.fieldBut}>
                <button>{t("profile.saveChanges")}</button>
                <NavLink to="/profile/info">{t("profile.cancel")}</NavLink>
            </div>
        </form>
    );
}

let ProfilePasswordReduxForm = reduxForm({form: 'profilePass'})(ProfilePasswordForm);

const ProfilePassword = (props) => {
    const onSubmit = (formData) => {
        console.log(formData);
    }

    return(
        <ProfilePasswordReduxForm onSubmit={onSubmit}/>    
    );
}

let mapStateToProps = (state) => ({
    
});

export default connect(mapStateToProps, {})(ProfilePasswordReduxForm);

