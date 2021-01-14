import React, { useEffect } from 'react';
import classes from '../Auth.module.css';
import { useTranslation } from 'react-i18next';
import { Field, reduxForm } from 'redux-form';
import { AuthInput } from '../../Common/FormControlls/FormControlls';
import { required, passValidationMatch } from '../../../Utils/validators';
import Preloader from '../../Common/Preloader/Preloader';
import { connect } from 'react-redux';
import { setCurrentRoute } from '../../../Store/Reducers/common';
import { Redirect } from 'react-router-dom';

const ForgotPasswordForm = props => {
  const { t, i18n } = useTranslation();
  return (
    <form className={classes.form} onSubmit={props.handleSubmit}>
      <h3>{t('forgotPassword.title')}</h3>
      <div className={classes.field}>
        <label>{t('forgotPassword.oldPassword')}</label>
        <Field
          component={AuthInput}
          placeholder={t('forgotPassword.oldPassword')}
          name="oldPassword"
          type="password"
          validate={[required]}
        />
      </div>
      <div className={classes.field}>
        <label>{t('forgotPassword.newPassword')}</label>
        <Field
          component={AuthInput}
          placeholder={t('forgotPassword.newPassword')}
          name="newPassword"
          type="password"
          validate={[required]}
        />
      </div>
      <div className={classes.field}>
        <label>{t('forgotPassword.repeatPassword')}</label>
        <Field
          component={AuthInput}
          placeholder={t('forgotPassword.repeatPassword')}
          name="repeatPassword"
          type="password"
          validate={[required, passValidationMatch]}
        />
      </div>
      {props.error && <div className={classes.error}>{props.error}</div>}
      <button>{t('forgotPassword.submit')}</button>
    </form>
  );
};

const ForgotPasswordReduxForm = reduxForm({ form: 'forgotPass' })(ForgotPasswordForm);

const ForgotPassword = props => {
  const { t, i18n } = useTranslation();

  const onSubmit = formData => {
    console.log(formData);
  };

  useEffect(() => {
    props.setCurrentRoute(window.location.pathname);
  }, []);

  return (
    <div className={classes.main}>
      {(localStorage.usertoken || sessionStorage.usertoken) && <Redirect to="/" />}
      <div className={classes.login}>
        <h1>{t('forgotPassword.header')}</h1>
        {props.isFetching && <Preloader />}
        <ForgotPasswordReduxForm onSubmit={onSubmit} />
      </div>
      <div className={classes.back}>
        <div></div>
        <div className={classes.green}></div>
      </div>
    </div>
  );
};

let mapStateToProps = state => ({
  isFetching: state.common.isFetching,
  isAuth: state.user.isAuth,
});

export default connect(mapStateToProps, {
  setCurrentRoute,
})(ForgotPassword);
