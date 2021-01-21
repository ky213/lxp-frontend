import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import classes from './ProfileInfo.module.css';
import { useTranslation } from 'react-i18next';
import { AuthInput } from '../../../Components';
import { required } from '../../../Utils/validators';
import default_user from '../../../Assets/Images/default_user.png';
import { NavLink } from 'react-router-dom';
import upload_icon from '../../../Assets/Images/upload-icon.svg';

const ProfileInfoForm = props => {
  const { t, i18n } = useTranslation();

  const [previewImage, setPreviewImage] = useState(null);

  const handleImage = e => {
    e.preventDefault();
    setPreviewImage(window.URL.createObjectURL(e.target.files[0]));
  };

  const removeImage = e => {
    e.preventDefault();
    setPreviewImage(null);
  };

  useEffect(() => {
    props.initialize({
      name: props.user.name,
      profilePhoto: props.user.profilePhoto,
    });
  }, [props.user]);

  return (
    <form className={classes.form} onSubmit={props.handleSubmit}>
      <div className={classes.field}>
        <label>{t('profile.profileInfo.fullname')}</label>
        <Field component={AuthInput} name="name" validate={[required]} />
      </div>
      <div className={classes.fieldImage}>
        <label>{t('profile.profileInfo.photo')}</label>
        <label htmlFor="image" className={classes.image}>
          <img
            src={previewImage ? previewImage : props.user.profilePhoto ? props.user.profilePhoto : default_user}
            className={classes.photo}
          />
          <img src={upload_icon} className={classes.upload} />
        </label>
        <Field component={'input'} type="file" name="profilePhoto" id="image" hidden onChange={handleImage} />
        <button
          onClick={e => {
            removeImage(e);
          }}
        >
          {t('profile.profileInfo.remove')}
        </button>
      </div>
      <div className={classes.fieldBut}>
        <button>{t('profile.saveChanges')}</button>
        <NavLink to="/profile/info">{t('profile.cancel')}</NavLink>
      </div>
    </form>
  );
};

let ProfileInfoReduxForm = reduxForm({ form: 'profileInfo' })(ProfileInfoForm);

const ProfileInfo = props => {
  const onSubmit = formData => {
    console.log(formData);
  };

  return <ProfileInfoReduxForm onSubmit={onSubmit} user={props.user} />;
};

let mapStateToProps = state => ({
  profile: state.authentication.profile,
});

export default connect(mapStateToProps, {})(ProfileInfo);
