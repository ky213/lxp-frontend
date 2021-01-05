import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import classes from './ProfileInfo.module.css';
import { useTranslation } from 'react-i18next';
import { AuthInput } from '../../Common/FormControlls/FormControlls';
import { required } from '../../../Utils/validators';
import default_user from '../../../Assets/Images/default_user.png';
import { NavLink } from 'react-router-dom';

const ProfileInfoForm = (props) => {
    const {t, i18n} = useTranslation();

    const [previewImage, setPreviewImage] = useState(null);

    let handleImage = (e) => {
        console.log(e.target.files);
    }

    useEffect(()=>{
        props.initialize({
            name: props.user.name,
            profilePhoto: props.user.profilePhoto
        });
    },[]);

    return(
        <form className={classes.form} onSubmit={props.handleSubmit}>
            <div className={classes.field}>
                <label>{t("profile.profileInfo.fullname")}</label>
                <Field component={AuthInput} name="name" validate={[required]}/>
            </div>
            <div className={classes.fieldImage}>
                <label>{t("profile.profileInfo.photo")}</label>
                <label htmlFor="image" className={classes.image}>
                    <img src={props.user.profilePhoto ? props.user.profilePhoto : default_user}/>
                </label>
                <Field component={"input"} type="file" name="profilePhoto" id="image" hidden onChange={handleImage}/>
                <button>{t("profile.profileInfo.remove")}</button>
            </div>
            <div className={classes.fieldBut}>
                <button>{t("profile.saveChanges")}</button>
                <NavLink to="/profile/info">{t("profile.cancel")}</NavLink>
            </div>
        </form>
    );
}

let ProfileInfoReduxForm = reduxForm({form: "profileInfo"})(ProfileInfoForm);


const ProfileInfo = (props) => {
    const onSubmit = (formData) => {
        console.log(formData);
    }

    return(
        <ProfileInfoReduxForm onSubmit={onSubmit} user={props.user}/>
    );
}

let mapStateToProps = (state) => ({
    user: state.user.user
});

export default connect(mapStateToProps, {
    
})(ProfileInfo);