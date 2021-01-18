import React, { useRef, useState } from 'react';
import classes from '../AddCourse/AddCourse.module.css';
import { useTranslation } from 'react-i18next';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { ROLE_MANAGER } from '../../../Utils/constants';
import { Redirect } from 'react-router-dom';
import Preloader from '../../Common/Preloader/Preloader';
import DeleteModal from '../../Common/DeleteModal/DeleteModal';
import { AuthInput, TextAreaCustom } from '../../Common/FormControlls/FormControlls';
import { required } from '../../../Utils/validators';
import FieldImageInput from '../../Common/FormControlls/FileControlls/FieldImageInput';
import LessonFileCourse from '../AddCourse/LessonFileCourse/LessonFileCourse';

const EditCourseForm = (props) => {
    const { t, i18n } = useTranslation();

    const fileInputRef = useRef(null);


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

    return (
        <form onSubmit={props.handleSubmit} className={classes.form}>
            <div className={classes.field + " " + classes.inputField}>
                <label className={classes.fieldLabel}>{t("addCourse.name")}</label>
                <Field component={AuthInput} placeholder={t("addCourse.namePlaceholder")} name="name"
                    validate={[required]} />
            </div>
            <div className={classes.field + " " + classes.inputField}>
                <label className={classes.fieldLabel}>{t("addActivity.description")}</label>
                <Field component={TextAreaCustom} name="description"
                    maxLength={maxLength} left={charactersLeft} rows={4} onChange={handleTextArea} isBig={true} />
            </div>
            <div className={classes.field}>
                <label className={classes.fieldLabel}>{t("addCourse.courseThumbnail")}</label>
                <Field component={FieldImageInput} downloadText={t("addCourse.uploadImage")} dragText={t("addCourse.dragImage")}
                    name="image" validate={[required]} />
            </div>
            <div className={classes.field}>
                <label className={classes.fieldLabel}>{t("addCourse.courseLessons")}</label>
                <div className={classes.dragNdrop}>
                    <input onChange={onFileInputChange} multiple
                        ref={fileInputRef}
                        type="file"
                        className={classes.hidden} />
                    <FileDrop onDrop={(files, event) => onDropHandler(files, event)} onTargetClick={onTargetClick} className={classes.drop} draggingOverFrameClassName={classes.onDrag} targetClassName={classes.dropInner}>
                        <div className={classes.uploadBut}>
                            <img src={uploadicon} />
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

const EditCourseReduxForm = reduxForm({ form: 'editCourse' })(EditCourseForm);

EditCourseReduxForm = connect(
    state => ({
        initialValues: state.courses.currentCourse
    }), {}
)(EditCourseReduxForm);

const EditCourse = (props) => {
    const { t, i18n } = useTranslation();

    const [isShowDeleteModal, setIsShowDeleteModal] = useState(false);

    const [files, setFiles] = useState([]);

    const onSubmit = (formData) => {
        console.log(formData);
    }
    return (
        <div className={classes.main}>
            {props.user.roleId != ROLE_MANAGER && <Redirect to="/" />}
            {props.isFetching && <Preloader />}
            {isShowDeleteModal && <DeleteModal setIsShowDeleteModal={setIsShowDeleteModal}
                title={t("deleteCourse.title")} sub={t("deleteCourse.sub")}
                deleteText={t("deleteCourse.delete")} cancelText={t("deleteCourse.cancel")} />}
            <div className={classes.header}>
                <div className={classes.headerContainer}>
                    <h1>{t("editCourse.title")}</h1>
                    <button className={classes.removeBut} onClick={() => setIsShowDeleteModal(true)}>
                        <i className="far fa-trash-alt"></i>
                        {t("activityDetails.delete")}
                    </button>
                </div>
            </div>
            <div className={classes.formContainer}>
                <EditCourseReduxForm onSubmit={onSubmit}
                    direction={props.direction}
                    files={files} setFiles={setFiles} 
                    currentCourse={props.currentCourse}/>
            </div>
        </div>
    );
}

let mapStateToProps = (state) => ({
    isFetching: state.common.isFetching,
    direction: state.common.direction,
    user: state.user.user,
    currentCourse: state.programs.currentCourse
});

export default connect(mapStateToProps, {

})(EditCourse);
