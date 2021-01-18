import React, { useLayoutEffect, useRef, useState } from 'react';
import { connect, Field } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { reduxForm } from 'redux-form';
import { ROLE_MANAGER } from '../../../Utils/constants';
import Preloader from '../../Common/Preloader/Preloader';
import classes from '../AddProgram/AddProgram.module.css';
import { useTranslation } from 'react-i18next';
import { required } from '../../../Utils/validators';
import { AuthInput, TextAreaCustom } from '../../Common/FormControlls/FormControlls';
import CustomSelect from '../../Common/Cutsom/Select/CustomSelect';
import { FileDrop } from 'react-file-drop';
import ImageFileProgram from '../ImageFileProgram/ImageFileProgram';

const EditProgramForm = (props) => {
    const {t, i18n} = useTranslation();
    let departamentOptions = ['dep1', 'dep2', 'dep3'];

    let maxLength = 300;
    const [charactersLeft, setCharactersLeft] = useState(maxLength);

    let handleTextArea = (e) => {
        setCharactersLeft(maxLength - e.target.value.length);
    }

    let disableDefSupervisorOption = true;
    let disableDefSupervisorOptionText = t("addProgram.defSelectDepartament");

    const [size, setSize] = useState([window.outerWidth, window.innerHeight]);
    const [selectWidth, setSelectWidth] = useState(66);

    const fileInputRef = useRef(null);

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

    const onFileInputChange = (event) => {
        const newFiles = []
        const newFilesToPush = [...event.target.files];
        newFilesToPush.forEach(item => {
            newFiles.push(item);
        })
        props.setFiles(newFiles);
    }

    const onTargetClick = () => {
        fileInputRef.current.click();
    }

    const onDropHandler = (files, event) => {
        const newFilesToPush = [...files];
        const newFiles = [];
        newFilesToPush.forEach(item => {
            newFiles.push(item);
        })
        props.setFiles(newFiles);
    }

    const handleRemoveFile = (index) => {
        props.setFiles([]);
    }

    let viewFiles = [];

    viewFiles = props.files.map((f, index) => {
        return <ImageFileProgram image={f} index={index} handleRemoveFile={handleRemoveFile}/>
    });

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
        <div className={classes.field + " " + classes.inputField}>
            <label className={classes.fieldLabel}>{t("addActivity.description")}</label>
            <Field component={TextAreaCustom} name="description"
                rows={2} onChange={handleTextArea} isBig={true}/>
        </div>
        <div className={classes.field + " " + classes.inputField}>
            <label className={classes.fieldLabel}>{t("addActivity.description")}</label>
            <Field component={TextAreaCustom} name="description"
                    maxLength={maxLength} left={charactersLeft} rows={5} onChange={handleTextArea} isBig={true}/>
        </div>
        <div className={classes.field}>
            <label className={classes.fieldLabel}>{t("addProgram.uploadTitle")}</label>
            {props.files.length > 0 ?
                <div className={classes.files}>
                    {viewFiles}
                </div> : 
                <div className={classes.dragNdrop}>
                    <input onChange={onFileInputChange}
                    ref={fileInputRef}
                    type="file"
                    className={classes.hidden}/>
                    <FileDrop onDrop={(files, event) => onDropHandler(files, event)} onTargetClick={onTargetClick} className={classes.drop} draggingOverFrameClassName={classes.onDrag} targetClassName={classes.dropInner}>
                        <div className={classes.uploadBut}>
                            <img src={uploadicon}/>
                            <p>{t("addProgram.upload")}</p>
                        </div>
                        <p className={classes.dragText}>{t("addProgram.drag")}</p>
                    </FileDrop>
                </div>
            }
        </div>
        <div className={classes.fieldBut}>
            <button>{t("addProgram.addBut")}</button>
            <NavLink to="/activities">{t("addProgram.cancel")}</NavLink>
        </div>
    </form>
}

const EditProgramReduxForm = reduxForm({form: 'editProgram'})(EditProgramForm);

const EditProgram = (props) => {
    const {t, i18n} = useTranslation();
    const [departament, setDepartament] = useState("");
    const [files, setFiles] = useState([]);

    const onSubmit = (formData) => {
        console.log(formData);
    }
    return(
        <div className={classes.main}>
            {props.user.roleId != ROLE_MANAGER && <Redirect to="/"/>}
            {props.isFetching && <Preloader/>}
            <div className={classes.header}>
                <div className={classes.headerContainer}>
                    <h1>{t("editProgram.title")}</h1>
                </div>
            </div>
            <div className={classes.formContainer}>
                <EditProgramReduxForm onSubmit={onSubmit} 
                                    direction={props.direction}
                                    setFiles={setFiles} files={files}
                                    setDepartament={setDepartament}/>
            </div>
        </div>
    );
}

let mapStateToProps = (state) => ({
    isFetching: state.common.isFetching,
    direction: state.common.direction,
    user: state.user.user
});

export default connect(mapStateToProps, {

})(EditProgram);