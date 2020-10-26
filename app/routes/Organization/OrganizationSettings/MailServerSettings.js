import React, { useState } from 'react'
import { hot } from 'react-hot-loader'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import { toast } from 'react-toastify'
import * as Yup from 'yup'

import {
  Col,
  FormGroup,
  Label,
  Button,
  Loading,
  TextEditor,
} from '@/components'
import { organizationService } from '@/services'

const MailsServerSettings = ({ organization }) => {
  const [isTesting, setIsTesting] = useState(false)
  const [Body, setBody] = useState(organization?.Body || '')

  const handleChange = event => {
    const content = event.editor.getData()
    setBody(content)
  }

  const handleOnSubmit = async (values, { setSubmitting }) => {
    try {
      await organizationService.update({ ...organization, ...values, Body })
      toast.success(
        <div>
          <h4 className="text-success">Success</h4>
          <p>Mail server saved.</p>
        </div>,
        { autoClose: 3000 }
      )
      setSubmitting(false)
    } catch (error) {
      setSubmitting(false)
      toast.error(
        <div>
          <h4 className="text-danger">Error</h4>
          <p>{error.mesage}</p>
        </div>
      )
    }
  }

  const testConnection = async values => {
    try {
      setIsTesting(true)
      await organizationService.testMailServerConnection({
        ...organization,
        ...values,
      })
      toast.success(
        <div>
          <h4 className="text-success">Success</h4>
          <p>Server ready</p>
        </div>,
        { autoClose: 3000 }
      )
      setIsTesting(false)
    } catch (error) {
      setIsTesting(false)
      toast.error(
        <div>
          <h4 className="text-danger">Error</h4>
          <p>Connection failed, please verify your settings</p>
        </div>
      )
    }
  }

  const MailServerSchema = Yup.object().shape({
    SMTPHost: Yup.string().required('Required'),
    PortNumber: Yup.string().required('Required'),
    Email: Yup.string().email().required('Required'),
    Label: Yup.string().required('Required'),
    ServerId: Yup.string().required('Required'),
    Password: Yup.string().required('Required'),
  })

  const initelValues = {
    SMTPHost: organization?.SMTPHost || '',
    PortNumber: organization?.PortNumber || '',
    Encryption: organization?.Encryption || '',
    Email: organization?.Email || '',
    Body: organization?.Body || '',
    Subject: organization?.Subject || '',
    Label: organization?.Label || '',
    ServerId: organization?.ServerId || '',
    Password: organization?.Password || '',
  }

  return (
    <Formik
      initialValues={initelValues}
      validationSchema={MailServerSchema}
      onSubmit={handleOnSubmit}
    >
      {({ values, errors, touched, handleSubmit, isSubmitting }) => (
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
            <Label for="PortNumber" sm={3}>
              Port Number
            </Label>
            <Col sm={9}>
              <Field
                type="text"
                name="PortNumber"
                id="PortNumber"
                className={
                  'bg-white form-control' +
                  (errors.PortNumber && touched.PortNumber ? ' is-invalid' : '')
                }
              />
              <ErrorMessage
                name="PortNumber"
                component="div"
                className="invalid-feedback"
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="ServerId" sm={3}>
              Server ID
            </Label>
            <Col sm={9}>
              <Field
                type="text"
                name="ServerId"
                id="ServerId"
                autocomplete="off"
                className={
                  'bg-white form-control' +
                  (errors.ServerId && touched.ServerId ? ' is-invalid' : '')
                }
              />
              <ErrorMessage
                name="ServerId"
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
                name="Password"
                id="Password"
                autocomplete="new-password"
                className={
                  'bg-white form-control' +
                  (errors.Password && touched.Password ? ' is-invalid' : '')
                }
              />
              <ErrorMessage
                name="Password"
                component="div"
                className="invalid-feedback"
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="Encryption" sm={3}>
              Encryption
            </Label>
            <Col sm={9}>
              <Field
                as="select"
                class="form-control"
                id="Encryption"
                name="Encryption"
              >
                <option value=""></option>
                <option value="SSL">SSL</option>
                <option value="TLS">TLS</option>
              </Field>
              <ErrorMessage
                name="Encryption"
                component="div"
                className="invalid-feedback"
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="Email" sm={3}>
              Sender Email
            </Label>
            <Col sm={9}>
              <Field
                type="text"
                name="Email"
                id="Email"
                className={
                  'bg-white form-control' +
                  (errors.Email && touched.Email ? ' is-invalid' : '')
                }
              />
              <ErrorMessage
                name="Email"
                component="div"
                className="invalid-feedback"
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="Label" sm={3}>
              Sender Name
            </Label>
            <Col sm={9}>
              <Field
                type="text"
                name="Label"
                id="Label"
                className={
                  'bg-white form-control' +
                  (errors.Label && touched.Label ? ' is-invalid' : '')
                }
              />
              <ErrorMessage
                name="Label"
                component="div"
                className="invalid-feedback"
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="Subject" sm={3}>
              Welcome Email Subject
            </Label>
            <Col sm={9}>
              <Field
                type="text"
                name="Subject"
                id="Subject"
                className={
                  'bg-white form-control' +
                  (errors.Subject && touched.Subject ? ' is-invalid' : '')
                }
              />
              <ErrorMessage
                name="Subject"
                component="div"
                className="invalid-feedback"
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="Body" sm={3}>
              Welcome Email body
            </Label>
            <Col sm={9}>
              <TextEditor data={Body} onChange={handleChange} />
              <small>
                Valid placeholders: {'{OrgName}'}, {'{UserLogin}'},{' '}
                {'{UserName}'}, {'{UserLastName}'}, {'{UserPass}'}
              </small>
              <ErrorMessage
                name="Body"
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
                {isSubmitting ? <Loading small /> : 'Save'}
              </Button>
              <Button
                type="button"
                onClick={() => testConnection(values)}
                color="info"
                disabled={isTesting}
              >
                {isTesting ? <Loading small /> : 'Test connection '}
              </Button>
            </Col>
          </FormGroup>
        </Form>
      )}
    </Formik>
  )
}

export default hot(module)(MailsServerSettings)
