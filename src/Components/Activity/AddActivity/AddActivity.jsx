import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import classes from './AddActivity.module.css';
import { useTranslation } from 'react-i18next';
import { AuthInput, TextAreaCustom } from '../../Common/FormControlls/FormControlls';
import { required, foo } from '../../../Utils/validators';
import CustomSelect from '../../Common/Cutsom/Select/CustomSelect';
import { NavLink } from 'react-router-dom';
import Preloader from '../../Common/Preloader/Preloader';

const AddActivityForm = (props) => {
    const {t, i18n} = useTranslation();
    let maxLength = 300;

    const [charactersLeft, setCharactersLeft] = useState(maxLength);

    let disableDefValueOption = true;
    let disableDefValueOptionText = t("addActivity.typeDef");

    let handleTextArea = (e) => {
        setCharactersLeft(maxLength - e.target.value.length);
    }

    let types = ["type1", "type2", "type3"];

    return(
        <form onSubmit={props.handleSubmit} className={classes.form}>
            <div className={classes.field}>
                <label className={classes.fieldLabel}>{t("addActivity.name")}</label>
                <Field component={AuthInput} placeholder={t("addActivity.namePlaceholder")} name="name"
                    validate={[required]}/>
            </div>
            <div className={classes.field}>
                <label className={classes.fieldLabel}>{t("addActivity.link")}</label>
                <Field component={AuthInput} name="link"/>
            </div>
            <div className={classes.field}>
                <label className={classes.fieldLabel}>{t("addActivity.type")}</label>
                <p></p>
                <Field component={CustomSelect} options={types} setFunction={props.setType} width={66} 
                        validate={[required]} name="type" disableDefValueOption={disableDefValueOption} disableDefValueOptionText={disableDefValueOptionText}/>
            </div>
            <div className={classes.field}>
                <label className={classes.fieldLabel}>{t("addActivity.description")}</label>
                <Field component={TextAreaCustom} name="description"
                       maxLength={maxLength} left={charactersLeft} rows={5} onChange={handleTextArea}/>
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
                <button>{t("addActivity.addActivity")}</button>
                <NavLink to="/activities">{t("addActivity.cancel")}</NavLink>
            </div>
        </form>
    );
}

const AddActivityReduxForm = reduxForm({form: 'addActivity'})(AddActivityForm);


const AddActivity = (props) => {
    const {t, i18n} = useTranslation();
    const [type, setType] = useState("");
    const [visibility, setVisibility] = useState("private");

    let onSubmit = (formData) => {
        console.log(formData);

    }
    return(
        <div className={classes.main}>
            {props.isFetching && <Preloader/>}
            <div className={classes.header}>
                <div className={classes.headerContainer}>
                    <h1>{t("addActivity.title")}</h1>
                </div>
            </div>
            <div className={classes.formContainer}>
                <AddActivityReduxForm onSubmit={onSubmit} setType={setType} visibility={visibility} setVisibility={setVisibility}/>
            </div>
        </div>
    );
}

let mapStateToProps = (state) => ({
    isFetching: state.common.isFetching,
})

export default connect(mapStateToProps, {

})(AddActivity);

