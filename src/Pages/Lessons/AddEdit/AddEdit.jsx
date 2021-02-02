import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-material-ui';
import * as Yup from 'yup';

import { Button, Preloader, Dialog, DialogTitle, DialogContent, DialogActions, Label, FileDrop } from 'Components';
import { createLesson, updateLesson, getOneLesson, resetLessonsState } from 'Store/Reducers/lessons';
import { getOneCourse } from 'Store/Reducers/courses';

const AddEdit = props => {
  const urlParams = useParams();
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState(null);

  const { lessons, courses, profile } = props;

  useEffect(() => {
    return () => {
      props.resetLessonsState();
    };
  }, []);

  useEffect(() => {
    if (props.open && !lessons.loading) props.handleClose();
  }, [lessons.loading]);

  const handleSubmit = async (values, { setSubmitting }) => {
    const formData = new FormData();

    formData.append('tincan', file[0]?.name);
    formData.append('courseId', courses.currentCourse?.courseId);
    formData.append('selectedOrganization', profile.organizationId);

    if (lessons.currentLesson) {
      formData.append('lessonId', lessons.currentLesson.lessonId);
      props.updateLesson(formData);
    } else {
      props.createLesson(formData, file[0]);
    }

    setSubmitting(false);
  };

  const validationSchema = Yup.object({
    // name: Yup.string(),
  });

  const initialValues = {
    // name: lessons.currentLesson?.lessonName,
  };

  if (lessons.loading) return <Preloader />;

  return (
    <div>
      <Dialog open={props.open} onClose={props.handleClose} aria-labelledby="form-dialog-title" fullWidth>
        <DialogTitle id="form-dialog-title">{props.title}</DialogTitle>
        <DialogContent>
          <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
            {() => (
              <Form>
                <Label style={{ marginBottom: '19px' }}>Course lesson</Label>
                <FileDrop getFiles={files => setFile(files)} fileTypes={['application/zip']} />
                <DialogActions disableSpacing style={{ marginRight: 'auto' }}>
                  <Button type="submit" variant="contained" color="primary">
                    Save
                  </Button>
                  <Button variant="contained" color="secondary" onClick={props.handleClose}>
                    Cancel
                  </Button>
                </DialogActions>
              </Form>
            )}
          </Formik>
        </DialogContent>
      </Dialog>
    </div>
  );
};

const mapStateToprops = state => ({
  profile: state.authentication.profile,
  courses: state.courses,
  lessons: state.lessons,
});

const mapDispatchToProps = {
  createLesson,
  updateLesson,
  getOneLesson,
  resetLessonsState,
  getOneCourse,
};

export default connect(mapStateToprops, mapDispatchToProps)(AddEdit);

AddEdit.propsTypes = {
  title: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  handleSave: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
};
