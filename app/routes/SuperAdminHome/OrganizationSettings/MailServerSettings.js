import React from 'react'
import { hot } from 'react-hot-loader'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'

import { Col, FormGroup, Label, Button } from '@/components'

const MailsServerSettings = () => {
  const handleOnSubmit = (values, { setSubmitting }) => {
    setTimeout(() => {
      alert(JSON.stringify(values, null, 2))

      setSubmitting(false)
    }, 1000)
  }

  const MailServerSchema = Yup.object().shape({
    SMTPHost: Yup.string().required('Required'),
    portNumber: Yup.string().required('Required'),
    encryption: Yup.string().required('Required'),
    senderEmail: Yup.string().required('Required'),
    senderLabel: Yup.string().required('Required'),
    serverId: Yup.string().required('Required'),
    serverPassword: Yup.string().required('Required'),
  })

  return (
    <Formik
      initialValues={{ SMTPHost: '' }}
      validationSchema={MailServerSchema}
      onSubmit={handleOnSubmit}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleSubmit,
        handleBlur,
        isSubmitting,
      }) => (
        <Form onSubmit={handleSubmit}>
          <FormGroup row>
            <Label for="SMTPHost" sm={3}>
              SMTP Host
            </Label>
            <Col sm={9}>
              <Field
                id="SMTPHost"
                name="SMTPHost"
                type="text"
                className={
                  'bg-white form-control' +
                  (errors.SMTPHost && touched.SMTPHost ? ' is-invalid' : '')
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
                  (errors.portNumber && touched.portNumber ? ' is-invalid' : '')
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
                  (errors.senderEmail && touched.senderEmail
                    ? ' is-invalid'
                    : '')
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
                  (errors.senderLabel && touched.senderLabel
                    ? ' is-invalid'
                    : '')
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
                  (errors.serverId && touched.serverId ? ' is-invalid' : '')
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
                  (errors.password && touched.password ? ' is-invalid' : '')
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
                disabled={isSubmitting}
              >
                Submit
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
