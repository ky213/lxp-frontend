import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-material-ui';
import * as Yup from 'yup';

import { Button, Preloader, Dialog, DialogTitle, DialogContent, DialogActions, Label, FileDrop } from 'Components';
import { createLesson } from 'Store/Reducers/lessons';

const AddEdit = props => {
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState(null);

  const { courses, profile } = props;

  const handleSubmit = (values, { setSubmitting }) => {
    const formData = new FormData();

    formData.append('tincan', file[0]?.name);
    formData.append('courseId', courses.currentCourse?.courseId);
    formData.append('selectedOrganization', profile.organizationId);

    props.createLesson(formData);

    setSubmitting(false);
  };

  const validationSchema = Yup.object({
    name: Yup.string().required('lesson name is required'),
  });

  const initialValues = {
    name: '',
  };

  return (
    <div>
      <Dialog open={props.open} onClose={props.handleClose} aria-labelledby="form-dialog-title" fullWidth>
        <DialogTitle id="form-dialog-title">{props.title}</DialogTitle>
        <DialogContent>
          <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
            {() => (
              <Form>
                <Field id="name" name="name" label="Title" component={TextField} fullWidth autoFocus required />
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
};

export default connect(mapStateToprops, mapDispatchToProps)(AddEdit);

AddEdit.propsTypes = {
  title: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  handleSave: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
};
