import React from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import classes from './AddActivity.module.css';
import { useTranslation } from 'react-i18next';

const AddActivityForm = (props) => {
    const {t, i18n} = useTranslation();
    return(
        <form onSubmit={props.handleSubmit} className={classes.form}>

        </form>
    );
}

const AddActivityReduxForm = reduxForm({form: 'addActivity'})(AddActivityForm);


const AddActivity = (props) => {
    const {t, i18n} = useTranslation();
    let onSubmit = (formData) => {
        console.log(formData);
    }
    return(
        <div className={classes.main}>
            <div className={classes.header}>
                <div className={classes.headerContainer}>
                    <h1>{t("addActivity.title")}</h1>
                </div>
            </div>
            <div className={classes.formContainer}>
                <AddActivityReduxForm onSubmit={onSubmit}/>
            </div>
        </div>
    );
}

let mapStateToProps = (state) => ({
    isFetching: state.common.isFetching,
})

export default connect(mapStateToProps, {

})(AddActivity);

