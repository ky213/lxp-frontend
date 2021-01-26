import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

import { resetGlobalState } from 'Store/Reducers/global';
import { getPorgramDirectors } from 'Store/Reducers/users';
import { createCourse, updateCourse, resetCoursesState } from 'Store/Reducers/courses';
import { PageLayout, Grid, Button, Label, TextField, FileDrop, CircularProgress, TextAreaCustom } from 'Components';

const AddEdit = props => {
  const [courseLogo, setCourseLogo] = useState(null);
  const { t, i18n } = useTranslation();
  const urlParams = useParams();

  const { programs, courses, profile } = props;

  const handleSubmit = values => {
    console.log(values);
    const formData = new FormData();
    formData.append('logo', courseLogo.name);
    formData.append('name', values.name);
    formData.append('courseCode', values.courseCode);
    formData.append('description', values.description);
    formData.append('programId', urlParams.programId);
    formData.append('selectedOrganization', profile.organizationId);

    if (courses.currenCourse) {
      formData.append('courseId', courses.currenCourse.courseId);
      formData.append('contentPath', courses.currenCourse.contentPath);
    } else {
      props.createCourse(formData);
    }
  };
  const handleGetFiles = files => {
    setCourseLogo(files[0]?.file);
  };

  const initialValues = {
    name: courses.currenCourse?.name,
    courseCode: courses.currenCourse?.courseCode,
    description: courses.currenCourse?.description,
  };
  const validationSchema = Yup.object({
    name: Yup.string().required('course name is required'),
    courseCode: Yup.string().required('course code  is required'),
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
            <Label style={{ lineHeight: 1 }}>Description</Label>
            <TextAreaCustom
              id="description"
              name="description"
              onChange={handleChange}
              rows={5}
              meta={{ touched, errors }}
              style={{ width: '93%' }}
            />

            <Label style={{ lineHeight: 1 }}>Logo</Label>
            <FileDrop getFiles={handleGetFiles} />

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
