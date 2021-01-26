import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Autocomplete } from 'formik-material-ui-lab';

import { resetGlobalState } from 'Store/Reducers/global';
import { getPorgramDirectors } from 'Store/Reducers/users';
import { createCourse, updateCourse, resetCoursesState } from 'Store/Reducers/courses';
import { PageLayout, Grid, Button, TextField, Label, CircularProgress } from 'Components';

const AddEdit = props => {
  const { t, i18n } = useTranslation();
  const urlParams = useParams();

  const { programs, courses } = props;

  const handleSubmit = values => {
    //   const formData = new FormData();
    //   if (fileData) formData.append('tincan', fileData.name);
    //   formData.append('logo', selectedLogoDataUrl);
    //   formData.append('name', name);
    //   formData.append('courseCode', courseCode);
    //   formData.append('description', description);
    //   formData.append('programId', programId);
    //   formData.append('selectedOrganization', selectedOrganization.organizationId);
    //   let httpMethod = '';
    //   if (course) {
    //     httpMethod = 'PUT';
    //     formData.append('courseId', course.courseId);
    //     formData.append('contentPath', course.contentPath);
    //   } else {
    //     httpMethod = 'POST';
    //   }
  };

  const initialValues = {};
  const validationSchema = Yup.object({
    name: Yup.string().required('course name is required'),
  });

  return (
    <PageLayout title={urlParams.programId ? 'Edit course' : 'Add new course'} loading={courses.loading}>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
        {({ errors, touched, values, handleChange }) => (
          <Form>
            <Field
              id="name"
              name="name"
              defaultValue={programs.currentProgram?.name}
              label="Course name"
              component={TextField}
              onChange={handleChange}
              error={touched.name && Boolean(errors.name)}
              helperText={touched.name && errors.name}
              fullWidth
              required
            />
            <Field
              id="courseCode"
              name="courseCode"
              label="Course code"
              component={TextField}
              onChange={handleChange}
              error={touched.courseCode && Boolean(errors.courseCode)}
              helperText={touched.courseCode && errors.courseCode}
              fullWidth
              required
            />
            <Field
              id="description"
              name="description"
              label="Description"
              component={TextField}
              onChange={handleChange}
              error={touched.description && Boolean(errors.description)}
              helperText={touched.description && errors.description}
              fullWidth
            />

            {/* <Field
              id="logo"
              name="logo"
              label="Logo"
              downloadText={t('addCourse.uploadImage')}
              dragText={t('addCourse.dragImage')}
              name="image"
              component={() => <ImageFileSelect />}
              onChange={handleChange}
              error={touched.logo && Boolean(errors.logo)}
              helperText={touched.logo && errors.logo}
              fullWidth
            /> */}

            <Grid>
              <Button type="submit" variant="contained" color="primary" disabled={courses.loading}>
                {courses.loading ? <CircularProgress color="primary" size={20} /> : 'Save'}
              </Button>
              <Button variant="contained" color="secondary" disabled={courses.loading} onClick={props.history.goBack}>
                Cancel
              </Button>
            </Grid>
          </Form>
        )}
      </Formik>
    </PageLayout>
  );
};

const mapStateToProps = state => ({
  profile: state.authentication.profile,
  programs: state.programs,
  courses: state.courses,
});

const mapDispatchToProps = {
  createCourse,
  updateCourse,
  resetCoursesState,
  resetGlobalState,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddEdit);
