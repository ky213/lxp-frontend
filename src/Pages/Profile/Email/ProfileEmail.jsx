import React, { useEffect } from 'react';
import classes from './ProfileEmail.module.css';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { AuthInput } from '../../../Components';
import { emailValidationMatch, isEmail, required } from '../../../Utils/validators';
import { NavLink } from 'react-router-dom';

const ProfileEmailForm = props => {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    props.initialize({
      email: props.user.email,
    });
  }, []);

  return (
    <form className={classes.form} onSubmit={props.handleSubmit}>
      <div className={classes.field + ' ' + classes.fieldBorder}>
        <label>{t('profile.profileEmail.current')}</label>
        <Field component={AuthInput} name="email" validate={[required, isEmail]} disabled />
      </div>
      <div className={classes.field}>
        <label>{t('profile.profileEmail.new')}</label>
        <Field
          component={AuthInput}
          placeholder="mail../..example.com"
          name="newEmail"
          validate={[required, isEmail]}
        />
      </div>
      <div className={classes.field}>
        <label>{t('profile.profileEmail.reenter')}</label>
        <Field
          component={AuthInput}
          placeholder="mail../..example.com"
          name="repeatEmail"
          validate={[required, isEmail, emailValidationMatch]}
        />
      </div>
      <div className={classes.fieldBut}>
        <button>{t('profile.saveChanges')}</button>
        <NavLink to="/profile/info">{t('profile.cancel')}</NavLink>
      </div>
    </form>
  );
};

let ProfileEmailReduxForm = reduxForm({ form: 'profileEmail' })(ProfileEmailForm);

const ProfileEmail = props => {
  const onSubmit = formData => {
    console.log(formData);
  };

  return <ProfileEmailReduxForm onSubmit={onSubmit} user={props.user} />;
};

let mapStateToProps = state => ({
  profile: state.authentication.profile,
});

export default connect(mapStateToProps, {})(ProfileEmail);
