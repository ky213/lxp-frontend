import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { hot } from 'react-hot-loader'

import { FormGroup, Label, EmptyLayout } from '@/components'
import { HeaderAuth } from '../../components/Pages/HeaderAuth'
import { FooterAuth } from '../../components/Pages/FooterAuth'
import { userService } from '@/services'

const PasswordReset = () => {
  const { token } = useParams()

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Not a valid email!')
      .required('Email is required'),
    password: Yup.string().required('Password is required'),
    confirmPassword: Yup.string()
      .required()
      .oneOf([Yup.ref('password')], 'Passwords must match'),
  })

  const initialValues = {
    email: '',
    password: '',
    confirmPassword: '',
  }

  const resetPassword = async (
    { email, password },
    { setStatus, setSubmitting }
  ) => {
    try {
      setStatus()
      await userService.resetPassword(email, password, token)
    } catch (error) {
      setSubmitting(false)
      setStatus(error)
    }
  }

  return (
    <EmptyLayout>
      <EmptyLayout.Section center>
        <HeaderAuth title="Reset Password" />
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={resetPassword}
          render={({ errors, touched, isSubmitting, handleSubmit }) => (
            <React.Fragment>
              <Form className="mb-3" onSubmit={handleSubmit}>
                <FormGroup>
                  <Label for="email">Email</Label>
                  <Field
                    type="text"
                    name="email"
                    id="email"
                    placeholder="Enter email address..."
                    className={
                      'bg-white form-control' +
                      (errors.email && touched.email ? ' is-invalid' : '')
                    }
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="invalid-feedback"
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="password">New Password</Label>
                  <Field
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Password..."
                    className={
                      'bg-white form-control' +
                      (errors.password && touched.password ? ' is-invalid' : '')
                    }
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="invalid-feedback"
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="password">Confirm Password</Label>
                  <Field
                    type="password"
                    name="confirmPassword"
                    id="confirmPassword"
                    placeholder="Password..."
                    className={
                      'bg-white form-control' +
                      (errors.confirmPassword && touched.confirmPassword
                        ? ' is-invalid'
                        : '')
                    }
                  />
                  <ErrorMessage
                    name="confirmPassword"
                    component="div"
                    className="invalid-feedback"
                  />
                </FormGroup>
                <FormGroup className="mt-5 ">
                  <button
                    type="submit"
                    className="btn btn-block login__submit"
                    block
                    disabled={isSubmitting}
                  >
                    Reset password
                  </button>
                </FormGroup>
              </Form>
            </React.Fragment>
          )}
        />
        <FooterAuth />
      </EmptyLayout.Section>
    </EmptyLayout>
  )
}

export default hot(module)(PasswordReset)
