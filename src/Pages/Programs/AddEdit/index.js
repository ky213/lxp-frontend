import React from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import { withRouter } from 'react-router-dom';
import * as yup from 'yup';

import { PageLayout, FileSelect } from 'Components';
import { Grid, Button, TextField, MenuItem, Label } from 'Components/Base';

const AddEDitProgram = () => {
  const { currentProgram } = useSelector(state => state.programs);
  const { t, i18n } = useTranslation();

  const validationSchema = yup.object({
    name: yup.string('e.g: Data Science').required('program name is required'),
    department: yup.string('select department'),
    courseNames: yup.string(),
    description: yup.string(),
  });

  const formik = useFormik({
    initialValues: {
      name: currentProgram?.name,
      department: currentProgram?.department,
      courseNames: currentProgram?.courseNames,
      description: currentProgram?.description,
      thumbNail: currentProgram?.thumbNail,
    },
    validationSchema: validationSchema,
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <PageLayout title="Add/Edit Programs">
      <form onSubmit={formik.handleSubmit} style={{ width: '40%', margin: 'auto' }}>
        <TextField
          id="name"
          name="name"
          label="Program name"
          value={formik.values.name}
          onChange={formik.handleChange}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
          fullWidth
        />
        <TextField
          id="department"
          name="department"
          label="Department"
          placeholder="select department"
          value={formik.values.department}
          onChange={formik.handleChange}
          error={formik.touched.department && Boolean(formik.errors.department)}
          helperText={formik.touched.department && formik.errors.department}
          fullWidth
          select
        >
          {['dep 1', 'dep 2', 'dep 3'].map(option => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          id="courseNames"
          name="courseNames"
          label="Courses names"
          value={formik.values.courseNames}
          onChange={formik.handleChange}
          error={formik.touched.courseNames && Boolean(formik.errors.courseNames)}
          helperText={(formik.touched.courseNames && formik.errors.courseNames) || 'Comma-separated values'}
          fullWidth
        />
        <Label style={{ margin: '8px 1px 14px 1px' }}>Short description</Label>
        <TextField
          id="description"
          name="description"
          variant="outlined"
          value={formik.values.description}
          onChange={formik.handleChange}
          error={formik.touched.description && Boolean(formik.errors.description)}
          helperText={(formik.touched.description && formik.errors.description) || '300 characters max'}
          fullWidth
          multiline
          rowsMax={4}
          rows={4}
        />

        <FileSelect downloadText={t('addProgram.upload')} dragText={t('addProgram.drag')} name="image" />

        <Grid>
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
          <Button type="cancel" variant="contained" color="secondary">
            Cancel
          </Button>
        </Grid>
      </form>
    </PageLayout>
  );
};

export default withRouter(AddEDitProgram);
