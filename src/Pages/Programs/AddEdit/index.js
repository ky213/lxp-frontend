import React from 'react';
import { Formik, Form, ErrorMessage, Field } from 'formik';
import { Input, InputGroup, Label, Button } from '../../../Components';

const index = () => {
  return (
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
          <InputGroup>
            <Label>Email</Label>
            <Field as={Input} name="email" type="email" />
            <ErrorMessage name="email" component="div" />
          </InputGroup>
          <InputGroup>
            <Label>Password</Label>
            <Field as={Input} name="password" type="password" />
            <ErrorMessage name="password" component="div" />
          </InputGroup>

          <Button type="submit" color="primary" disabled={isSubmitting}>
            Submit
          </Button>
          <Button type="cancel" style={{ background: '#fff', color: 'black' }} disabled={isSubmitting}>
            Cancel
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default index;
