import React, { useState } from 'react';
import { useSelector, connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Formik, Form, Field, useFormik } from 'formik';
import { withRouter } from 'react-router-dom';
import * as Yup from 'yup';
import { Autocomplete } from 'formik-material-ui-lab';

import { getPorgramDirectors } from 'Store/Reducers/users';
import { PageLayout, TextEditor } from 'Components';
import { Grid, Button, TextField, MenuItem, Label, CircularProgress } from 'Components/Base';

const AddEDitProgram = props => {
  const [emailBody, setEmailBody] = useState('');
  const [certificateBody, setCertificateBody] = useState('');
  const [open, setOpen] = useState(false);
  const { t, i18n } = useTranslation();

  const { users, programs, profile } = props;

  const initialValues = {
    name: programs.currentProgram?.name,
    programDirectors: programs.currentProgram?.programDirectors,
    subject: programs.currentProgram?.subject,
    body: programs.currentProgram?.body,
    certificateSubject: programs.currentProgram?.certificateSubject,
    certificateBody: programs.currentProgram?.certificateBody,
  };
  const validationSchema = Yup.object({
    name: Yup.string().required('Program name is required'),
    programDirectors: Yup.array().min(1, 'You need to select at least one program manager').typeError('Invalid entry'),
  });

  const handleEmailBodyChange = event => {
    const content = event.editor.getData();
    setEmailBody(content);
  };
  const handleCertificateBodyChange = event => {
    const content = event.editor.getData();
    setCertificateBody(content);
  };

  const handleSubmit = (values, { setSubmitting }) => {
    console.log(values);
    setSubmitting(false);
  };

  const defaultUser = [
    {
      userId: '54615706-09f3-4186-93ef-7bead5aaaa4e',
      email: 'ruba.admin@neworg.com',
      name: 'Ruba',
      surname: 'admin',
      gender: 'F',
      startDate: null,
      profilePhoto: null,
      isActiveUser: true,
      employeeId: '69125d85-cfc5-49e4-b6a1-ec2631128f26',
      isActive: true,
      expLevelId: null,
      organizationId: '1557abe7-acf8-4442-a417-487ac5e940b0',
      organizationName: 'Cybershield Awareness Program New Organization',
      role: 'Admin',
      roleName: 'Administrator',
      expLevelName: null,
      programName: 'Engish Proram',
      programId: '0a3600c3-9758-432c-a0ac-8b8e4c0b224e',
      groupIds: [],
      joinedCourses: [],
    },
  ];

  return (
    <PageLayout title="Add/Edit Programs">
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
        {({ errors, touched, values, handleChange }) => (
          <Form>
            <Field
              id="name"
              name="name"
              component={TextField}
              label="Program name"
              onChange={handleChange}
              error={touched.name && Boolean(errors.name)}
              helperText={touched.name && errors.name}
              fullWidth
              required
            />
            <Field
              id="programDirectors"
              name="programDirectors"
              component={Autocomplete}
              multiple
              open={open}
              getOptionSelected={(option, value) => option.name === value.name}
              getOptionLabel={option => `${option.name} ${option.surname}`}
              options={users.users}
              loading={users.loading}
              onOpen={() => {
                setOpen(true);
                props.getPorgramDirectors(profile.organizationId);
              }}
              onClose={() => {
                setOpen(false);
              }}
              required
              renderInput={params => (
                <TextField
                  {...params}
                  label="Program directors"
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <>
                        {users.loading ? <CircularProgress color="primary" size={20} /> : null}
                        {params.InputProps.endAdornment}
                      </>
                    ),
                  }}
                />
              )}
            />
            <Field
              id="emailSubject"
              name="subject"
              label="Email subject"
              component={TextField}
              onChange={handleChange}
              error={touched.emailSubject && Boolean(errors.emailSubject)}
              helperText={touched.emailSubject && errors.emailSubject}
              fullWidth
            />
            <Label>Email body</Label>
            <TextEditor name="body" data={values.body} onChange={handleEmailBodyChange} />
            <Field
              id="certificateSubject"
              name="certificateSubject"
              label="Certificate subject"
              component={TextField}
              onChange={handleChange}
              error={touched.certificateSubject && Boolean(errors.certificateSubject)}
              helperText={touched.certificateSubject && errors.certificateSubject}
              fullWidth
            />
            <Label>Certificate body</Label>
            <TextEditor name="certifcateBody" data={values.certificateBody} onChange={handleCertificateBodyChange} />
            <Grid>
              <Button type="submit" variant="contained" color="primary" loading>
                {users.loading ? <CircularProgress color="primary" size={20} /> : 'Save'}
              </Button>
              <Button variant="contained" color="secondary">
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
  users: state.users,
  programs: state.programs,
  profile: state.authentication.profile,
});
const mapDispatchToProps = {
  getPorgramDirectors,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddEDitProgram);
