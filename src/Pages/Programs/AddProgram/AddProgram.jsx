import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Field, reduxForm } from 'redux-form';
import classes from './AddProgram.module.css';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import Preloader from '../../Common/Preloader/Preloader';
import { AuthInput } from '../../Common/FormControlls/FormControlls';
import { required } from '../../../Utils/validators';
import CustomSelect from '../../Common/Cutsom/Select/CustomSelect';

const AddProgramForm = (props) => {
    const {t, i18n} = useTranslation();
    let departamentOptions = ['dep1', 'dep2', 'dep3'];

    let disableDefSupervisorOption = true;
    let disableDefSupervisorOptionText = t("addProgram.defSelectDepartament");

    const [size, setSize] = useState([window.outerWidth, window.innerHeight]);
    const [selectWidth, setSelectWidth] = useState(66);

    useLayoutEffect(()=>{
        function updateSize(){
            setSize([window.outerWidth, window.innerHeight]);
        }
        window.addEventListener('resize', updateSize);
        updateSize();
        return () => window.removeEventListener('resize', updateSize);
    },[]);

    useEffect(()=>{
        if(size[0] > 568){
            setSelectWidth(66);
        }else{
            setSelectWidth(100);
        }
    },[size]);


    return(
        <form onSubmit={props.handleSubmit} className={classes.form}>
            <div className={classes.field + " " + classes.inputField}>
                <label className={classes.fieldLabel}>{t("addProgram.name")}</label>
                <Field component={AuthInput} placeholder={t("addProgram.namePlaceholder")} name="name"
                    validate={[required]}/>
            </div>
            <div className={classes.field}>
                <label className={classes.fieldLabel}>{t("addActivity.supervisor")}</label>
                <p></p>
                <Field component={CustomSelect} options={departamentOptions} setFunction={props.setDepartament} width={selectWidth} 
                        validate={[required]} name="departament" disableDefValueOption={disableDefSupervisorOption} disableDefValueOptionText={disableDefSupervisorOptionText}/>
            </div>
        </form>
    )
}

const AddProgramReduxForm = reduxForm({form: 'addProgram'})(AddProgramForm);

const AddProgram = (props) => {
    const {t, i18n} = useTranslation();
    const [departament, setDepartament] = useState("");

    const onSubmit = (formData) => {
        console.log(formData);
    }

    return(
        <div className={classes.main}>
            {props.isFetching && <Preloader/>}
            <div className={classes.header}>
                <div className={classes.headerContainer}>
                    <h1>{t("addProgram.title")}</h1>
                </div>
            </div>
            <div className={classes.formContainer}>
                <AddProgramReduxForm onSubmit={onSubmit} setDepartament={setDepartament} direction={props.direction}/>
            </div>
        </div>
    )
}

let mapStateToProps = (state) => ({
    isFetching: state.common.isFetching,
    direction: state.common.direction
});

export default connect(mapStateToProps, {

})(AddProgram);