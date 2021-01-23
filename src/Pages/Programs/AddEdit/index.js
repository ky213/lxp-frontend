import React, { useState } from 'react';
import { useSelector, connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import { withRouter } from 'react-router-dom';
import * as Yup from 'yup';

import { getPorgramDirectors } from 'Store/Reducers/users';
import { PageLayout, TextEditor } from 'Components';
import { Grid, Button, TextField, MenuItem, Label, Autocomplete, CircularProgress } from 'Components/Base';

const AddEDitProgram = props => {
  const [emailBody, setEmailBody] = useState('');
  const [certificateBody, setCertificateBody] = useState('');
  const [open, setOpen] = useState(false);
  const { t, i18n } = useTranslation();

  const { users, programs, profile } = props;

  const form = useFormik({
    initialValues: {
      name: programs.currentProgram?.name,
      programDirectors: programs.currentProgram?.programDirectors,
      subject: programs.currentProgram?.subject,
      body: programs.currentProgram?.body,
      certificateSubject: programs.currentProgram?.certificateSubject,
      certificateBody: programs.currentProgram?.certificateBody,
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Program name is required'),
      programDirectors: Yup.array()
        .min(1, 'You need to select at least one program manager')
        .typeError('Invalid entry'),
    }),
    onSubmit: values => {
      // alert(JSON.stringify({ ...values, certificateBody, body: emailBody }, null, 2));
      console.log(values);
    },
  });

  const handleEmailBodyChange = event => {
    const content = event.editor.getData();
    setEmailBody(content);
  };
  const handleCertificateBodyChange = event => {
    const content = event.editor.getData();
    setCertificateBody(content);
  };

  return (
    <PageLayout title="Add/Edit Programs">
      <form onSubmit={form.handleSubmit}>
        <TextField
          id="name"
          name="name"
          label="Program name"
          value={form.values.name}
          onChange={form.handleChange}
          error={form.touched.name && Boolean(form.errors.name)}
          helperText={form.touched.name && form.errors.name}
          fullWidth
          required
        />
        <Autocomplete
          id="programDirectors"
          name="programDirectors"
          multiple
          open={open}
          defaultValue={users.users[0]}
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
          onChange={form.handleChange}
          renderInput={params => (
            <TextField
              {...params}
              id="programDirectors"
              name="programDirectors"
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
              required
            />
          )}
        />
        <TextField
          id="emailSubject"
          name="subject"
          label="Email subject"
          value={form.values.emailSubject}
          onChange={form.handleChange}
          error={form.touched.emailSubject && Boolean(form.errors.emailSubject)}
          helperText={form.touched.emailSubject && form.errors.emailSubject}
          fullWidth
        />
        <Label>Email body</Label>
        <TextEditor name="body" data={form.values.body} onChange={handleEmailBodyChange} />
        <TextField
          id="certificateSubject"
          name="certificateSubject"
          label="Certificate subject"
          value={form.values.certificateSubject}
          onChange={form.handleChange}
          error={form.touched.certificateSubject && Boolean(form.errors.certificateSubject)}
          helperText={form.touched.certificateSubject && form.errors.certificateSubject}
          fullWidth
        />
        <Label>Certificate body</Label>
        <TextEditor name="certifcateBody" data={form.values.certificateBody} onChange={handleCertificateBodyChange} />
        <Grid>
          <Button type="submit" variant="contained" color="primary">
            Save
          </Button>
          <Button variant="contained" color="secondary">
            Cancel
          </Button>
        </Grid>
      </form>
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
