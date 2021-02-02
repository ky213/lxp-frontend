import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { TextField } from 'formik-material-ui';
import { Autocomplete } from 'formik-material-ui-lab';

import { resetGlobalState } from 'Store/Reducers/global';
import { getPorgramDirectors } from 'Store/Reducers/users';
import { getOneProgram, createProgram, updateProgram, resetProgramsState } from 'Store/Reducers/programs';
import {
  Grid,
  Button,
  Label,
  CircularProgress,
  PageLayout,
  TextEditor,
  FileDrop,
  TextField as BaseTextField,
} from 'Components';

const AddEDitProgram = props => {
  const [emailBody, setEmailBody] = useState(props.programs.currentProgram?.body || '');
  const [certificateBody, setCertificateBody] = useState(props.programs.currentProgram?.certificateBody || '');
  const [open, setOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const urlParams = useParams();

  const { users, programs, profile } = props;

  useEffect(() => {
    if (urlParams.programId) props.getOneProgram(profile.organizationId, urlParams.programId);

    return () => {
      props.resetProgramsState();
      props.resetGlobalState();
    };
  }, []);

  const handleEmailBodyChange = event => {
    const content = event.editor.getData();
    setEmailBody(content);
  };
  const handleCertificateBodyChange = event => {
    const content = event.editor.getData();
    setCertificateBody(content);
  };

  const handleThumbnailchange = (file, setFieldValue) => {
    const fileReader = new FileReader();

    if (!file) return;

    fileReader.readAsDataURL(file);

    fileReader.onload = data => {
      setFieldValue('thumbnail', fileReader.result);
    };
  };

  const handleSubmit = (values, { setSubmitting }) => {
    const programData = { ...values, certificateBody, body: emailBody, organizationId: profile.organizationId };
    if (programs.currentProgram) props.updateProgram({ ...programData, programId: programs.currentProgram.programId });
    else props.createProgram(programData);
    setSubmitting(false);
  };

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

  return (
    <PageLayout title={urlParams.programId ? 'Edit program' : 'Add new program'} loading={programs.loading}>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
        {({ errors, touched, values, handleChange, setFieldValue }) => (
          <Form>
            <Field
              id="name"
              name="name"
              label="Program name"
              defaultValue={programs.currentProgram?.name}
              component={TextField}
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
              open={open}
              getOptionSelected={(option, value) => option.name === value.name}
              getOptionLabel={option => `${option.name} ${option.surname}`}
              options={users.users}
              loading={users.loading}
              multiple
              required
              onOpen={() => {
                setOpen(true);
                props.getPorgramDirectors(profile.organizationId);
              }}
              onClose={() => {
                setOpen(false);
              }}
              error={touched.programDirectors && Boolean(errors.programDirectors)}
              renderInput={params => (
                <BaseTextField
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

            <Label style={{ lineHeight: 2 }}>Program thumbnail</Label>
            <Field
              name="thumbnail"
              component={FileDrop}
              fileTypes={['image/*']}
              getFiles={file => handleThumbnailchange(file[0], setFieldValue)}
            />
            <Grid>
              <Button type="submit" variant="contained" color="primary" disabled={programs.loading}>
                {programs.loading ? <CircularProgress color="primary" size={20} /> : 'Save'}
              </Button>
              <Button variant="contained" color="secondary" disabled={programs.loading} onClick={props.history.goBack}>
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
  global: state.global,
  users: state.users,
  programs: state.programs,
  profile: state.authentication.profile,
});
const mapDispatchToProps = {
  getOneProgram,
  createProgram,
  updateProgram,
  getPorgramDirectors,
  resetProgramsState,
  resetGlobalState,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddEDitProgram);
