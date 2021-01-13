import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import classes from './AddActivity.module.css';
import { useTranslation } from 'react-i18next';
import { AuthInput, Calendar, TextAreaCustom } from '../../Common/FormControlls/FormControlls';
import { required, foo } from '../../../Utils/validators';
import CustomSelect from '../../Common/Cutsom/Select/CustomSelect';
import { NavLink } from 'react-router-dom';
import Preloader from '../../Common/Preloader/Preloader';
import styled from 'styled-components';
import uploadicon from '../../../Assets/Images/upload.svg';
import { FileDrop } from 'react-file-drop';
import ActivityFile from '../ActivityFile/ActivityFile';

const StyledLabel = styled.label`
    margin-left: ${({ direction }) => direction === "ltr" && "30px"};
    margin-right: ${({ direction }) => direction === "rtl" && "30px"};
`;

const AddActivityForm = (props) => {
    const {t, i18n} = useTranslation();
    let maxLength = 300;

    const [charactersLeft, setCharactersLeft] = useState(maxLength);

    let disableDefValueOption = true;
    let disableDefValueOptionText = t("addActivity.typeDef");

    let disableDefSupervisorOption = true;
    let disableDefSupervisorOptionText = t("addActivity.supervisorDef");

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

    let handleTextArea = (e) => {
        setCharactersLeft(maxLength - e.target.value.length);
    }

    let types = ["type1", "type2", "type3"];

    let supervisorsOptions = ['sup1', 'sup2', 'sup3'];

    const fileInputRef = useRef(null);



    const onFileInputChange = (event) => {
        const newFiles = [...props.files];
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
        const newFiles = [...props.files];
        newFilesToPush.forEach(item => {
            newFiles.push(item);
        })
        props.setFiles(newFiles);
    }

    const handleRemoveFile = (index) => {
        const newFiles = [...props.files];
        newFiles.forEach((item, i) => {
            if(index === i){
                newFiles.splice(index, 1);
            }
        });
        props.setFiles(newFiles);
    }
    let viewFiles = []

    viewFiles = props.files.map((f, index) => {
        return <ActivityFile name={f.name} index={index} handleRemoveFile={handleRemoveFile}/>
    })

    return(
        <form onSubmit={props.handleSubmit} className={classes.form}>
            <div className={classes.field + " " + classes.inputField}>
                <label className={classes.fieldLabel}>{t("addActivity.name")}</label>
                <Field component={AuthInput} placeholder={t("addActivity.namePlaceholder")} name="name"
                    validate={[required]}/>
            </div>
            <div className={classes.field + " " + classes.inputField}>
                <label className={classes.fieldLabel}>{t("addActivity.link")}</label>
                <Field component={AuthInput} name="link"/>
            </div>
            {/* <div className={classes.field}>
                <label className={classes.fieldLabel}>{t("addActivity.supervisor")}</label>
                <p></p>
                <Field component={CustomSelect} options={supervisorsOptions} setFunction={props.setSupervisor} width={selectWidth} 
                        validate={[required]} name="supervisor" disableDefValueOption={disableDefSupervisorOption} disableDefValueOptionText={disableDefSupervisorOptionText}/>
            </div> */}
            <div className={classes.field + " " + classes.inputField}>
                <label className={classes.fieldLabel}>{t("addActivity.points")}</label>
                <Field component={AuthInput} name="points"
                    validate={[required]}/>
            </div>
            <div className={classes.field + " " + classes.inputField}>
                <label className={classes.fieldLabel}>{t("addActivity.description")}</label>
                <Field component={TextAreaCustom} name="description"
                       maxLength={maxLength} left={charactersLeft} rows={1} onChange={handleTextArea}/>
            </div>
            <div className={classes.field}>
                <label className={classes.fieldLabel}>{t("addActivity.date")}</label>
                <div className={classes.dates}>
                    <Field component={Calendar} name="start"/>
                    <StyledLabel direction={props.direction}>{t("addActivity.to")}</StyledLabel>
                    <Field component={Calendar} name="end"/>
                </div>
            </div>
            <div className={classes.field}>
                <label className={classes.fieldLabel + " " + classes.select}>{t("addActivity.type")}</label>
                <p></p>
                <Field component={CustomSelect} options={types} setFunction={props.setType} width={selectWidth} 
                        validate={[required]} name="type" disableDefValueOption={disableDefValueOption} disableDefValueOptionText={disableDefValueOptionText}/>
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
            <div className={classes.field}>
                <label className={classes.fieldLabel}>{t("addActivity.upload")}</label>
                <div className={classes.dragNdrop}>
                    <input onChange={onFileInputChange}
                    ref={fileInputRef}
                    type="file"
                    className={classes.hidden} multiple/>
                    <FileDrop onDrop={(files, event) => onDropHandler(files, event)} onTargetClick={onTargetClick} className={classes.drop} draggingOverFrameClassName={classes.onDrag} targetClassName={classes.dropInner}>
                        <div className={classes.uploadBut}>
                            <img src={uploadicon}/>
                            <p>{t("addActivity.upload")}</p>
                        </div>
                        <p className={classes.dragText}>{t("addActivity.drag")}</p>
                    </FileDrop>
                </div>
                {props.files.length > 0 && 
                    <div className={classes.files}>
                        {viewFiles}
                    </div>
                }
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
    const [supervisor, setSupervisor] = useState("");
    const [visibility, setVisibility] = useState("private");

    const [files, setFiles] = useState([]);

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
                <AddActivityReduxForm onSubmit={onSubmit} files={files} setFiles={setFiles} setType={setType} visibility={visibility} setVisibility={setVisibility} setSupervisor={setSupervisor} direction={props.direction}/>
            </div>
        </div>
    );
}

let mapStateToProps = (state) => ({
    isFetching: state.common.isFetching,
    direction: state.common.direction
})

export default connect(mapStateToProps, {

})(AddActivity);

