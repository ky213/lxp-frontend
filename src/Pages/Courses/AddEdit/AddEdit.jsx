import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-material-ui';
import * as Yup from 'yup';

import { resetGlobalState } from 'Store/Reducers/global';
import { getOneCourse, createCourse, updateCourse, resetCoursesState } from 'Store/Reducers/courses';
import { PageLayout, Preloader, Grid, Button, Label, FileDrop, TextAreaCustom } from 'Components';

const AddEdit = props => {
  const { t, i18n } = useTranslation();
  const urlParams = useParams();

  const { courses, profile } = props;

  useEffect(() => {
    if (urlParams.courseId) props.getOneCourse(profile.organizationId, urlParams.courseId);
    return props.resetCoursesState;
  }, []);

  useEffect(() => {
    if (!courses.loading && courses.success)
      props.getOneCourse(profile.organizationId, courses.currentCourse?.courseId || urlParams.courseId);
  }, [courses.success]);

  const handleSubmit = (values, { setSubmitting }) => {
    const formData = new FormData();

    formData.append('logo', values.logo);
    formData.append('name', values.name);
    formData.append('courseCode', values.courseCode);
    formData.append('description', values.description);
    formData.append('selectedOrganization', profile.organizationId);

    if (courses.currentCourse) {
      formData.append('programId', courses.currentCourse.programId);
      formData.append('courseId', courses.currentCourse.courseId);
      formData.append('contentPath', courses.currentCourse.contentPath);
      props.updateCourse(formData);
    } else {
      formData.append('programId', urlParams.programId);
      props.createCourse(formData);
    }

    setSubmitting(false);
  };

  const handleGetFiles = (file, setFieldValue) => {
    const fileReader = new FileReader();

    if (!file) return;

    fileReader.readAsDataURL(file);

    fileReader.onload = data => {
      setFieldValue('logo', fileReader.result);
    };
  };

  const initialValues = {
    name: courses.currentCourse?.name,
    courseCode: courses.currentCourse?.courseCode,
    description: courses.currentCourse?.description,
  };
  const validationSchema = Yup.object({
    name: Yup.string().required('course name is required'),
    courseCode: Yup.string().required('course code  is required'),
  });

  if (courses.loading) return <Preloader />;

  return (
    <PageLayout title={urlParams.courseId ? 'Edit course' : 'Add new course'} loading={courses.loading}>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
        {({ errors, touched, handleChange, setFieldValue }) => (
          <Form>
            <Field
              id="name"
              name="name"
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
            <Label style={{ lineHeight: 1 }}>Description</Label>
            <TextAreaCustom
              id="description"
              name="description"
              defaultValue={courses.currentCourse?.description}
              onChange={handleChange}
              rows={5}
              meta={{ touched, errors }}
              style={{ width: '93%' }}
            />

            <Label style={{ lineHeight: 1 }}>Logo</Label>
            <FileDrop
              fileTypes={['image/*']}
              getFiles={files => handleGetFiles(files[0], setFieldValue)}
              defaultImage={courses.currentCourse?.image}
            />

            <Grid>
              <Button type="submit" variant="contained" color="primary" disabled={courses.loading}>
                Save
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
  getOneCourse,
  createCourse,
  updateCourse,
  resetCoursesState,
  resetGlobalState,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddEdit);
