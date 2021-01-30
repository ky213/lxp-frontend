import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-material-ui';
import * as Yup from 'yup';

import { Button, Preloader, Dialog, DialogTitle, DialogContent, DialogActions, Label, FileDrop } from 'Components';

const AddEdit = props => {
  const [open, setOpen] = useState(false);
  const [lessonName, setLessonName] = useState('');
  const [file, setFile] = useState(null);

  const handleSubmit = (values, { setSubmitting }) => {
    console.log(values);
    setSubmitting(false);
  };

  const validationSchema = Yup.object({
    name: Yup.string().required('course name is required'),
  });

  const initialValues = {
    name: 'xxxx',
  };

  return (
    <div>
      <Dialog open={props.open} onClose={props.handleClose} aria-labelledby="form-dialog-title" fullWidth>
        <DialogTitle id="form-dialog-title">{props.title}</DialogTitle>
        <DialogContent>
          <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
            {({ touched, errors }) => (
              <Form>
                <Field
                  id="name"
                  name="name"
                  label="Title"
                  component={TextField}
                  margin="dense"
                  fullWidth
                  autoFocus
                  onChange={({ target }) => setLessonName(target.value)}
                />
                <Label style={{ marginBottom: '19px' }}>Course lesson</Label>
                <FileDrop getFiles={files => setFile(files)} fileTypes={['application/zip']} />
                <DialogActions disableSpacing>
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

export default AddEdit;

AddEdit.propsTypes = {
  title: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  handleSave: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
};
