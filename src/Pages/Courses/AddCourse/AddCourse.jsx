import React, { useRef, useState } from 'react';
import classes from './AddCourse.module.css';
import { useTranslation } from 'react-i18next';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import Preloader from '../../Common/Preloader/Preloader';
import { required } from '../../../Utils/validators';
import { ROLE_MANAGER } from '../../../Utils/constants';
import { NavLink, Redirect } from 'react-router-dom';
import { AuthInput, TextAreaCustom } from '../../Common/FormControlls/FormControlls';
import { FileDrop } from 'react-file-drop';
import uploadicon from '../../../Assets/Images/upload.svg';
import ImageFileCourse from './ImageFileCourse/ImageFileCourse';
import LessonFileCourse from './LessonFileCourse/LessonFileCourse';

const AddCourseForm = (props) => {
    const {t, i18n} = useTranslation();

    let maxLength = 300;
    const [charactersLeft, setCharactersLeft] = useState(maxLength);

    let handleTextArea = (e) => {
        setCharactersLeft(maxLength - e.target.value.length);
    }

    const imageInputRef = useRef(null);
    const fileInputRef = useRef(null);



    const onImageInputChange = (event) => {
        const newFiles = []
        const newFilesToPush = [...event.target.files];
        newFilesToPush.forEach(item => {
            newFiles.push(item);
        })
        props.setImages(newFiles);
    }

    const onTargetImageClick = () => {
        imageInputRef.current.click();
    }
    const onDropImageHandler = (files, event) => {
        const newFilesToPush = [...files];
        const newFiles = [];
        newFilesToPush.forEach(item => {
            newFiles.push(item);
        })
        props.setImages(newFiles);
    }

    const handleRemoveImage = (index) => {
        props.setImages([]);
    }
    let viewImages = []

    viewImages = props.images.map((f, index) => {
        return <ImageFileCourse image={f} index={index} handleRemoveFile={handleRemoveImage}/>
    })




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
        return <LessonFileCourse file={f} index={index} handleRemoveFile={handleRemoveFile}/>
    })

    return(
        <form onSubmit={props.handleSubmit} className={classes.form}>
            <div className={classes.field + " " + classes.inputField}>
                <label className={classes.fieldLabel}>{t("addCourse.name")}</label>
                <Field component={AuthInput} placeholder={t("addCourse.namePlaceholder")} name="name"
                    validate={[required]}/>
            </div>
            <div className={classes.field + " " + classes.inputField}>
                <label className={classes.fieldLabel}>{t("addActivity.description")}</label>
                <Field component={TextAreaCustom} name="description"
                   maxLength={maxLength} left={charactersLeft} rows={4} onChange={handleTextArea} isBig={true}/>
            </div>
            <div className={classes.field}>
                <label className={classes.fieldLabel}>{t("addCourse.courseThumbnail")}</label>
                {props.images.length > 0 ?
                    <div className={classes.files}>
                        {viewImages}
                    </div> : 
                    <div className={classes.dragNdrop}>
                        <input onChange={onImageInputChange}
                        ref={imageInputRef}
                        type="file"
                        className={classes.hidden}/>
                        <FileDrop onDrop={(files, event) => onDropImageHandler(files, event)} onTargetClick={onTargetImageClick} className={classes.drop} draggingOverFrameClassName={classes.onDrag} targetClassName={classes.dropInner}>
                            <div className={classes.uploadBut}>
                                <img src={uploadicon}/>
                                <p>{t("addCourse.uploadImage")}</p>
                            </div>
                            <p className={classes.dragText}>{t("addCourse.dragImage")}</p>
                        </FileDrop>
                    </div>
                }
            </div>
            <div className={classes.field}>
                <label className={classes.fieldLabel}>{t("addCourse.courseLessons")}</label>
                <div className={classes.dragNdrop}>
                    <input onChange={onFileInputChange} multiple
                    ref={fileInputRef}
                    type="file"
                    className={classes.hidden}/>
                    <FileDrop onDrop={(files, event) => onDropHandler(files, event)} onTargetClick={onTargetClick} className={classes.drop} draggingOverFrameClassName={classes.onDrag} targetClassName={classes.dropInner}>
                        <div className={classes.uploadBut}>
                            <img src={uploadicon}/>
                            <p>{t("addCourse.uploadLesson")}</p>
                        </div>
                        <p className={classes.dragText}>{t("addCourse.dragFile")}</p>
                    </FileDrop>
                </div>
                <span className={classes.ability}>{t("addCourse.ability")}</span>
                <div className={classes.filesList}>
                    {viewFiles}
                </div>
            </div>
            <div className={classes.fieldBut}>
                <button>{t("addCourse.addCourse")}</button>
                <NavLink to="/programs">{t("addCourse.cancel")}</NavLink>
            </div>
        </form>
    );
}

const AddCourseReduxForm = reduxForm({form: 'addCourse'})(AddCourseForm);

const AddCourse = (props) => {
    const {t, i18n} = useTranslation();

    const [images, setImages] = useState([]);
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
                    <h1>{t("addCourse.title")}</h1>
                </div>
            </div>
            <div className={classes.formContainer}>
                <AddCourseReduxForm images={images} setImages={setImages}
                            files={files} setFiles={setFiles}
                            onSubmit={onSubmit} direction={props.direction}/>
            </div>
        </div>
    )
}

let mapStateToProps = (state) => ({
    isFetching: state.common.isFetching,
    direction: state.common.direction,
    user: state.user.user
});

export default connect(mapStateToProps, {

})(AddCourse);