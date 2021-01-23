import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import { withRouter } from 'react-router-dom';
import * as Yup from 'yup';

import { PageLayout, FileSelect, TextEditor } from 'Components';
import { Grid, Button, TextField, MenuItem, Label } from 'Components/Base';

const AddEDitProgram = () => {
  const [emailBody, setEmailBody] = useState('');
  const [certificateBody, setCertificateBody] = useState('');
  const { currentProgram } = useSelector(state => state.programs);
  const { t, i18n } = useTranslation();

  const form = useFormik({
    initialValues: {
      name: currentProgram?.name,
      programDirectors: currentProgram?.programDirectors,
      subject: currentProgram?.subject,
      body: currentProgram?.body,
      certificateSubject: currentProgram?.certificateSubject,
      certificateBody: currentProgram?.certificateBody,
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Program name is required'),
      programDirectors: Yup.array()
        .min(1, 'You need to select at least one program manager')
        .typeError('Invalid entry'),
    }),
    onSubmit: values => {
      alert(JSON.stringify({ ...values, certificateBody, body: emailBody }, null, 2));
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
        />
        <TextField
          id="programDirectors"
          name="programDirectors"
          label="Program directors"
          placeholder="select program director"
          value={form.values.programDirectors}
          onChange={form.handleChange}
          error={form.touched.programDirectors && Boolean(form.errors.programDirectors)}
          helperText={form.touched.programDirectors && form.errors.programDirectors}
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

export default withRouter(AddEDitProgram);
