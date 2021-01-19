import React from 'react';
import { Formik, Form, ErrorMessage, Field } from 'formik';

import { Button, TextField } from 'Components/Base';
import { PageLayout, Input, InputGroup, Label } from 'Components';

const index = () => {
  return (
    <PageLayout title="Add/Edit Programs">
      <Formik
        initialValues={{ email: '', password: '' }}
        validate={values => {
          const errors = {};

          if (!values.email) {
            errors.email = 'Required';
          } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
            errors.email = 'Invalid email address';
          }

          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));

            setSubmitting(false);
          }, 400);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Field component={() => <TextField label="Email" fullWidth />} name="email" type="email" />
            <ErrorMessage name="email" component="div" />

            <Button variant="outlined" color="primary" size="large" disabled={isSubmitting}>
              Submit
            </Button>
            <Button variant="contained" color="secondary" size="large" disabled={isSubmitting}>
              Cancel
            </Button>
          </Form>
        )}
      </Formik>
    </PageLayout>
  );
};

export default index;
