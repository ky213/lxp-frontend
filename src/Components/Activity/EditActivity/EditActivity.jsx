import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import classes from '../AddActivity/AddActivity.module.css';
import { useTranslation } from 'react-i18next';
import { AuthInput, TextAreaCustom } from '../../Common/FormControlls/FormControlls';
import { required } from '../../../Utils/validators';
import CustomSelect from '../../Common/Cutsom/Select/CustomSelect';
import { NavLink, withRouter } from 'react-router-dom';
import Preloader from '../../Common/Preloader/Preloader';
import { getActivity } from '../../../Redux/activitiesReducer';


const EditActivityForm = (props) => {
    const {t, i18n} = useTranslation();
    let maxLength = 300;

    const [charactersLeft, setCharactersLeft] = useState(maxLength);

    let handleTextArea = (e) => {
        setCharactersLeft(maxLength - e.target.value.length);
    }

    let types = [t("addActivity.typeDef"), "type1", "type2", "type3"];

    return(
        <form onSubmit={props.handleSubmit} className={classes.form}>
            <div className={classes.field}>
                <label className={classes.fieldLabel}>{t("addActivity.name")}</label>
                <Field component={AuthInput} placeholder={t("addActivity.namePlaceholder")} name="name"
                    validate={[required]}/>
            </div>
            <div className={classes.field}>
                <label className={classes.fieldLabel}>{t("addActivity.link")}</label>
                <Field component={AuthInput} name="link"
                    validate={[required]}/>
            </div>
            <div className={classes.field}>
                <label className={classes.fieldLabel}>{t("addActivity.type")}</label>
                <p></p>
                <CustomSelect options={types} setFunction={props.setType} width={66}/>
            </div>
            <div className={classes.field}>
                <label className={classes.fieldLabel}>{t("addActivity.description")}</label>
                <Field component={TextAreaCustom} name="description"
                    validate={[required]} maxLength={maxLength} left={charactersLeft} rows={5} onChange={handleTextArea}/>
            </div>
            <div className={classes.field}>
                <label className={classes.fieldLabel}>{t("addActivity.visibility")}</label>
                <div className={classes.radios}>
                    <div className={classes.visibilityBlock}>
                        <input type="radio" name="visibility" id="public" onChange={e=>{props.setVisibility(e.target.value)}} value="public"/>
                        <label htmlFor={"public"}>Public</label>
                        <div className={classes.check}></div>
                    </div>
                    <div className={classes.visibilityBlock}>
                        <input type="radio" name="visibility" id="private" checked onChange={e=>{props.setVisibility(e.target.value)}} value="private"/>
                        <label htmlFor={"private"}>Private</label>
                        <div className={classes.check}></div>
                    </div>
                </div>
            </div>
            <div className={classes.fieldBut}>
                <button>{t("editActivity.title")}</button>
                <NavLink to={`/activities/view/${props.activityId}`}>{t("addActivity.cancel")}</NavLink>
            </div>
        </form>
    );
}

let EditActivityReduxForm = reduxForm({form: 'editActivity'})(EditActivityForm);

EditActivityReduxForm = connect(
    state => ({
        initialValues: state.activities.currentActivity
    }),{}
)(EditActivityReduxForm);

const EditActivity = (props) => {
    const {t, i18n} = useTranslation();
    const [type, setType] = useState("");
    const [visibility, setVisibility] = useState("private");

    useEffect(()=>{
        let activityId = props.match.params.activityId;
        props.getActivity(activityId, props.user.selectedOrganizationId);
    },[]);

    let onSubmit = (formData) => {
        console.log(formData);

    }
    return(
        <div className={classes.main}>
            {props.isFetching && <Preloader/>}
            <div className={classes.header}>
                <div className={classes.headerContainer}>
                    <h1>{t("editActivity.title")}</h1>
                </div>
            </div>
            <div className={classes.formContainer}>
                <EditActivityReduxForm onSubmit={onSubmit} setType={setType} visibility={visibility} setVisibility={setVisibility} activityId={props.match.params.activityId}/>
            </div>
        </div>
    );
}

let WithUrlDataContainerComponent = withRouter(EditActivity);

let mapStateToProps = (state) => ({
    isFetching: state.common.isFetching,
    user: state.user.user,
})

export default connect(mapStateToProps, {
    getActivity
})(WithUrlDataContainerComponent);

