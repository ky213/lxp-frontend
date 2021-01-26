import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Autocomplete } from 'formik-material-ui-lab';

import { resetGlobalState } from 'Store/Reducers/global';
import { getPorgramDirectors } from 'Store/Reducers/users';
import { getOneCourse, createCourse, updateCourse, resetCoursesState } from 'Store/Reducers/courses';
import { PageLayout, TextEditor } from 'Components';
import { Grid, Button, TextField, Label, CircularProgress } from 'Components';

const AddEdit = () => {
  const urlParams = useParams();

  const formData = new FormData();
  if (fileData) formData.append('tincan', fileData.name);
  formData.append('logo', selectedLogoDataUrl);
  formData.append('name', name);
  formData.append('courseCode', courseCode);
  formData.append('description', description);
  formData.append('programId', programId);
  formData.append('selectedOrganization', selectedOrganization.organizationId);

  let httpMethod = '';
  if (course) {
    httpMethod = 'PUT';
    formData.append('courseId', course.courseId);
    formData.append('contentPath', course.contentPath);
  } else {
    httpMethod = 'POST';
  }

  return (
    <PageLayout
      title={urlParams.programId ? 'Edit program' : 'Add new program'}
      loading={programs.loading}
    ></PageLayout>
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
