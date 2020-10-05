import React from 'react'
import { hot } from 'react-hot-loader'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'

import { Col, FormGroup, Label, Button } from '@/components'
import ThemedButton from '@/components/ThemedButton'

const MailsServerSettings = () => {
  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validate={values => {
        const errors = {}

        if (!values.email) {
          errors.email = 'Required'
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ) {
          errors.email = 'Invalid email address'
        }

        return errors
      }}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2))

          setSubmitting(false)
        }, 400)
      }}
    >
      {({
        values,

        errors,

        touched,

        handleChange,

        handleBlur,

        handleSubmit,

        isSubmitting,

        /* and other goodies */
      }) => (
        <Form onSubmit={handleSubmit}>
          <FormGroup row>
            <Label for="SMTPHost" sm={3}>
              SMTP Host
            </Label>
            <Col sm={9}>
              <Field
                type="text"
                name="SMTPHost"
                id="SMTPHost"
                className={
                  'bg-white form-control' +
                  (errors.name && touched.name ? ' is-invalid' : '')
                }
              />
              <ErrorMessage
                name="SMTPHost"
                component="div"
                className="invalid-feedback"
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="portNumber" sm={3}>
              Port Number
            </Label>
            <Col sm={9}>
              <Field
                type="text"
                name="portNumber"
                id="portNumber"
                className={
                  'bg-white form-control' +
                  (errors.name && touched.name ? ' is-invalid' : '')
                }
              />
              <ErrorMessage
                name="portNumber"
                component="div"
                className="invalid-feedback"
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="encryption" sm={3}>
              Encryption
            </Label>
            <Col sm={9}>
              <select
                class="form-control"
                id="exampleFormControlSelect1"
                name="encryption"
              >
                <option value="NONE">None</option>
                <option value="SSL">SSL</option>
                <option value="TLS">TLS</option>
              </select>
              <ErrorMessage
                name="encryption"
                component="div"
                className="invalid-feedback"
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="senderEmail" sm={3}>
              Sender Email
            </Label>
            <Col sm={9}>
              <Field
                type="text"
                name="senderEmail"
                id="senderEmail"
                className={
                  'bg-white form-control' +
                  (errors.name && touched.name ? ' is-invalid' : '')
                }
              />
              <ErrorMessage
                name="senderEmail"
                component="div"
                className="invalid-feedback"
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="senderLabel" sm={3}>
              Sender Label
            </Label>
            <Col sm={9}>
              <Field
                type="text"
                name="senderLabel"
                id="senderLabel"
                className={
                  'bg-white form-control' +
                  (errors.name && touched.name ? ' is-invalid' : '')
                }
              />
              <ErrorMessage
                name="senderLabel"
                component="div"
                className="invalid-feedback"
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="serverId" sm={3}>
              Server ID
            </Label>
            <Col sm={9}>
              <Field
                type="text"
                name="serverId"
                id="serverId"
                className={
                  'bg-white form-control' +
                  (errors.name && touched.name ? ' is-invalid' : '')
                }
              />
              <ErrorMessage
                name="serverId"
                component="div"
                className="invalid-feedback"
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="serverPassword" sm={3}>
              Server Password
            </Label>
            <Col sm={9}>
              <Field
                type="password"
                name="serverPassword"
                id="serverPassword"
                className={
                  'bg-white form-control' +
                  (errors.name && touched.name ? ' is-invalid' : '')
                }
              />
              <ErrorMessage
                name="serverPassword"
                component="div"
                className="invalid-feedback"
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Col className="col-9 offset-3">
              <Button
                type="submit"
                color="primary"
                className="mr-2"
                onClick={() => {}}
              >
                Save
              </Button>
              <Button type="button" onClick={() => {}} color="info">
                Test connection
              </Button>
            </Col>
          </FormGroup>
        </Form>
      )}
    </Formik>
  )
}

export default hot(module)(MailsServerSettings)
