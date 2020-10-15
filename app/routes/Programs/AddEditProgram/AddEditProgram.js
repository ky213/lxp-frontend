import React from 'react'
import { hot } from 'react-hot-loader'
import { useIntl } from 'react-intl'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import styled from 'styled-components'
import ThemedButton from '@/components/ThemedButton'
import { Typeahead } from 'react-bootstrap-typeahead'
import { Role } from '@/helpers'
import ReactQuill from 'react-quill'
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Button,
  FormGroup,
  Label,
  Alert,
} from '@/components'
import { programService, courseManagerService } from '@/services'
import { Consumer } from '@/components/Theme/ThemeContext'
import { useAppState } from '@/components/AppState'

const InvalidFeedback = styled.section`
  width: 100%;
  margin-top: 0.25rem;
  font-size: 0.75rem;
  color: #ed1c24;
`

const AddEditProgram = props => {
  const intl = useIntl()

  const [{ currentUser, selectedOrganization }, dispatch] = useAppState()
  const [program, setProgram] = React.useState(null)
  const [users, setUsers] = React.useState([])
  const [showAlert, setShowAlert] = React.useState(false)
  const [alertMessage, setAlertMessage] = React.useState(null)
  const { onCancelCreate } = props
  const inputEl = React.useRef(null)
  const [body, setBody] = React.useState('')

  const dismissAlert = () => {
    setAlertMessage(null)
    setShowAlert(false)
  }

  const showAlertMessage = ({ message, type, title }) => {
    setAlertMessage({ title, message, type })
    setShowAlert(true)
  }

  React.useEffect(() => {
    courseManagerService
      .getAll(1, 999, null, selectedOrganization.organizationId)
      .then(data => {
        if (data.users) {
          const usersData = data.users
            .filter(u => u.role == Role.ProgramDirector)
            .map(u => {
              return {
                name: `${u.name} ${u.surname}`,
                employeeId: u.employeeId,
              }
            })
          setUsers(usersData || [])
        }

        /* console.log("usersData: ", usersData); */
      })
  }, [])

  React.useEffect(() => {
    if (props.programId) {
      programService
        .getById(props.programId, selectedOrganization.organizationId)
        .then(data => {
          setProgram(data)
          setBody(data.body)
        })
    } else {
      setProgram(null)
      setBody('')
    }
    if (inputEl && inputEl.current) {
      inputEl.current.focus()
    }
  }, [props.programId])

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    programDirectors: Yup.array()
      .min(1, 'You need to select at least one program manager')
      .typeError('Invalid entry'),
    subject: Yup.string().required('Email subject is required'),
  })

  const initialValues = {
    name: (program && program.name) || '',
    programDirectors: (program && program.programDirectors) || [],
    subject: program?.subject || '',
    body: program?.body || '',
  }

  return (
    <Consumer>
      {themeState => (
        <Formik
          {...themeState}
          {...props}
          enableReinitialize={true}
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(
            { name, programDirectors, subject },
            { setStatus, setSubmitting }
          ) => {
            // Updating existing
            if (program) {
              programService
                .update({
                  name,
                  subject,
                  body,
                  programId: program.programId,
                  programDirectors,
                  organizationId: selectedOrganization.organizationId,
                })
                .then(
                  reponse => {
                    showAlertMessage({
                      title: intl.formatMessage({ id: 'General.Success' }),
                      message: 'You have sucessfully changed the program!',
                      type: 'success',
                    })
                    props.onEdited()
                    setSubmitting(false)
                  },
                  error => {
                    console.log(
                      `Error while changing the program ${name}:`,
                      error
                    )
                    let errorMessage = `Error while trying to change the program ${name}`
                    if (error.toLowerCase().includes('unique')) {
                      errorMessage = `Program with the same name (${name}) already exists`
                    }

                    showAlertMessage({
                      title: 'Error',
                      message: errorMessage,
                      type: 'danger',
                    })
                    setSubmitting(false)
                    setStatus(error)
                  }
                )
            } else {
              programService
                .create({
                  name,
                  subject,
                  body,
                  programDirectors,
                  organizationId: selectedOrganization.organizationId,
                })
                .then(
                  reponse => {
                    showAlertMessage({
                      title: intl.formatMessage({ id: 'General.Success' }),
                      message: 'You have sucessfully created a program!',
                      type: 'success',
                    })
                    props.onEdited()
                    setSubmitting(false)
                  },
                  error => {
                    console.log(
                      `Error while trying to create a program:`,
                      error
                    )
                    let errorMessage = `Error while trying to create a program`
                    if (error.toLowerCase().includes('unique')) {
                      errorMessage = `Program with the same name already exists`
                    }

                    showAlertMessage({
                      title: 'Error',
                      message: errorMessage,
                      type: 'danger',
                    })
                    setSubmitting(false)
                    setStatus(error)
                  }
                )
            }
          }}
        >
          {props => {
            return (
              <React.Fragment>
                <Container>
                  {showAlert && alertMessage && (
                    <Alert color={alertMessage.type}>
                      <h6 className="mb-1 alert-heading">
                        {alertMessage.title}
                      </h6>
                      {alertMessage.message}
                      <div className="mt-2">
                        <Button
                          color={alertMessage.type}
                          onClick={dismissAlert}
                        >
                          Dismiss
                        </Button>
                      </div>
                    </Alert>
                  )}

                  <Row>
                    <Col lg={12}>
                      <Card className="mb-3">
                        <CardBody>
                          {/* START Form */}
                          <Form onSubmit={props.handleSubmit}>
                            {/* START Input */}
                            <FormGroup row>
                              <Label for="name" sm={3}>
                                Name
                              </Label>
                              <Col sm={9}>
                                <Field
                                  type="text"
                                  ref={inputEl}
                                  name="name"
                                  id="name"
                                  className={
                                    'bg-white form-control' +
                                    (props.errors.name && props.touched.name
                                      ? ' is-invalid'
                                      : '')
                                  }
                                  placeholder="Enter Name..."
                                />
                                <ErrorMessage
                                  name="name"
                                  component="div"
                                  className="invalid-feedback"
                                />
                              </Col>
                            </FormGroup>
                            <FormGroup row>
                              <Label for="programDirectors" sm={3}>
                                Program manager/s
                              </Label>
                              <Col sm={9}>
                                <Typeahead
                                  clearButton
                                  id="programDirectors"
                                  selected={props.values.programDirectors}
                                  labelKey="name"
                                  multiple
                                  className={
                                    props.errors.programDirectors &&
                                    props.touched.programDirectors
                                      ? ' is-invalid'
                                      : ''
                                  }
                                  options={users}
                                  placeholder="Choose a program manager..."
                                  onChange={selectedOptions =>
                                    props.setFieldValue(
                                      'programDirectors',
                                      selectedOptions
                                    )
                                  }
                                />
                                {props.errors.programDirectors && (
                                  <InvalidFeedback>
                                    {props.errors.programDirectors}
                                  </InvalidFeedback>
                                )}
                                <em>
                                  You can only select program managers here
                                  (users in the Program Manager role)
                                </em>
                              </Col>
                            </FormGroup>
                            <FormGroup row>
                              <Label for="subject" sm={3}>
                                Email Subject
                              </Label>
                              <Col sm={9}>
                                <Field
                                  type="text"
                                  name="subject"
                                  id="subject"
                                  className={
                                    'bg-white form-control' +
                                    (props.errors.subject &&
                                    props.touched.subject
                                      ? ' is-invalid'
                                      : '')
                                  }
                                />
                                <ErrorMessage
                                  name="subject"
                                  component="div"
                                  className="invalid-feedback"
                                />
                              </Col>
                            </FormGroup>
                            <FormGroup row>
                              <Label for="body" sm={3}>
                                Email Body
                              </Label>
                              <Col sm={9}>
                                <ReactQuill
                                  value={body}
                                  onChange={setBody}
                                  style={{
                                    border: '1px solid  #80808038',
                                    minHeight: '200px',
                                  }}
                                  modules={{
                                    toolbar: [
                                      ['bold', 'italic', 'underline', 'strike'], // toggled buttons
                                      ['blockquote', 'code-block'],

                                      [{ header: 1 }, { header: 2 }], // custom button values
                                      [{ list: 'ordered' }, { list: 'bullet' }],
                                      [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
                                      [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
                                      [{ direction: 'rtl' }], // text direction

                                      [{ header: [1, 2, 3, 4, 5, 6, false] }],

                                      [{ color: [] }, { background: [] }], // dropdown with defaults from theme
                                      [{ font: [] }],
                                      [{ align: [] }],

                                      ['clean'], // remove formatting button
                                    ],
                                  }}
                                />
                                <ErrorMessage
                                  name="body"
                                  component="div"
                                  className="invalid-feedback"
                                />
                              </Col>
                            </FormGroup>
                            <FormGroup row>
                              <Col sm={3} />
                              <Col sm={9}>
                                <ThemedButton type="submit">
                                  {(program && 'Update') || 'Create'}
                                </ThemedButton>{' '}
                                <Button
                                  type="button"
                                  onClick={onCancelCreate}
                                  color="light"
                                >
                                  Cancel
                                </Button>
                              </Col>
                            </FormGroup>
                          </Form>
                          {/* END Form */}
                        </CardBody>
                      </Card>
                    </Col>
                  </Row>
                  {/* END Section 2 */}
                </Container>
              </React.Fragment>
            )
          }}
        </Formik>
      )}
    </Consumer>
  )
}

export default hot(module)(AddEditProgram)
