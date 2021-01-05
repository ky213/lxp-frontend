import React from 'react'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import ReactQuill from 'react-quill'
import styled from 'styled-components'
import ThemedButton from '@/components/ThemedButton'
import axios from 'axios'
import classNames from 'classnames'
import { hot } from 'react-hot-loader'

import config from '@/config'
import { authHeader } from '@/helpers'
import ImageUpload from '@/components/ImageUpload'
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Button,
  FormGroup,
  Label,
  Loading,
} from '@/components'
import { programService } from '@/services'
import { Consumer } from '@/components/Theme/ThemeContext'
import { useAppState } from '@/components/AppState'
import CourseLearners from './CourseLearners'

const EditCourse = ({ course, onCancel, finishInsert }) => {
  const [{ selectedOrganization }] = useAppState()
  const [programs, setPrograms] = React.useState([])

  const [programsLoaded, setProgramsLoaded] = React.useState(false)
  const [formLoaded, setFormLoaded] = React.useState(false)
  const [uploadProgress, setUploadProgress] = React.useState(0)
  const [selectedLogoDataUrl, setSelectedLogoDataUrl] = React.useState('')
  const [courseFileName, setCourseFileName] = React.useState('')
  const [selectedTab, setSelectedTab] = React.useState('settings')

  React.useEffect(() => {
    programService
      .getByCurrentUser(selectedOrganization.organizationId)
      .then(data => {
        setPrograms(data)
        setProgramsLoaded(true)
      })
  }, [])

  React.useEffect(() => {
    if (programsLoaded) setFormLoaded(true)
  }, [programsLoaded])

  React.useEffect(() => {
    if (course) {
      setSelectedLogoDataUrl(course.image)
      setCourseFileName(course.contentPath)
    } else {
      setSelectedLogoDataUrl(null)
    }
  }, [course])

  const cancel = () => {
    onCancel()
  }

  const InvalidFeedback = styled.section`
    width: 100%;
    margin-top: 0.25rem;
    font-size: 0.75rem;
    color: #ed1c24;
  `

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [
        { list: 'ordered' },
        { list: 'bullet' },
        { indent: '-1' },
        { indent: '+1' },
      ],
      ['clean'],
    ],
  }

  const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
  ]

  return (
    (formLoaded && (
      <Consumer>
        {themeState => (
          <Formik
            {...themeState}
            enableReinitialize={true}
            initialValues={{
              name: (course && course.name) || '',
              logoImage: (course && course.image) || '',
              description: (course && course.description) || '',
              programId: (course && course.programId) || '',
              courseCode: course?.courseCode || '',
            }}
            validationSchema={Yup.object().shape({
              name: Yup.string().required('Name is required'),
              description: Yup.string().required('Description is required'),
              courseCode: Yup.string()
                .required('Course code is required')
                .matches(
                  /^[a-zA-Z0-9()*_\-!#$%^&*,."\'\][]+$/,
                  'course code should be in latin characters and numbers only'
                ),
            })}
            onSubmit={async (
              { name, courseCode, description, programId, fileData },
              { setStatus, setSubmitting, isSubmitting }
            ) => {
              setSubmitting(true)
              const formData = new FormData()
              if (fileData) formData.append('tincan', fileData.name)
              formData.append('logo', selectedLogoDataUrl)
              formData.append('name', name)
              formData.append('courseCode', courseCode)
              formData.append('description', description)
              formData.append('programId', programId)
              formData.append(
                'selectedOrganization',
                selectedOrganization.organizationId
              )

              let httpMethod = ''
              if (course) {
                httpMethod = 'PUT'
                formData.append('courseId', course.courseId)
                formData.append('contentPath', course.contentPath)
              } else {
                httpMethod = 'POST'
              }

              await axios({
                method: httpMethod,
                headers: {
                  'Content-Type': 'application/json',
                  ...authHeader(),
                },
                data: formData,
                url: config.apiUrl + '/courses',
              })
                .then(resp => {
                  if (fileData) {
                    let uploadUrl = resp.data.uploadUrl

                    axios({
                      method: 'PUT',
                      url: uploadUrl,
                      data: fileData,
                      headers: {
                        'Content-Type': fileData.type,
                      },
                      onUploadProgress: ev => {
                        const progress = (ev.loaded / ev.total) * 100
                        setUploadProgress(Math.round(progress))
                      },
                    })
                      .then(resp => {
                        // our mocked response will always return true
                        // in practice, you would want to use the actual response object
                        //setUploadStatus(true);
                        setSubmitting(false)
                        finishInsert()
                      })
                      .catch(err => {
                        console.error(err)
                        throw err
                      })
                  }
                  setSubmitting(false)
                  finishInsert()
                })
                .catch(err => console.error(err))
            }}
          >
            {formikProps => {
              return (
                <React.Fragment>
                  <Row>
                    <Col lg={12}>
                      <Card className="mb-3">
                        <CardHeader>
                          <ul className="nav nav-tabs card-header-tabs">
                            <li
                              className="nav-item"
                              onClick={() => setSelectedTab('settings')}
                            >
                              <a
                                className={classNames('nav-link', {
                                  active: selectedTab === 'settings',
                                })}
                                href="#"
                              >
                                <i className="fa fa-gear mr-2"></i> Settings
                              </a>
                            </li>
                            <li
                              className="nav-item"
                              onClick={() => {
                                setSelectedTab('learners')
                              }}
                            >
                              <a
                                className={classNames('nav-link', {
                                  active: selectedTab === 'learners',
                                })}
                                href="#"
                              >
                                <i className="fa fa-users mr-2"></i> Learners
                              </a>
                            </li>
                          </ul>
                        </CardHeader>
                        <CardBody>
                          {selectedTab === 'settings' ? (
                            <Form onSubmit={formikProps.handleSubmit}>
                              <FormGroup row>
                                <Label for="name" sm={3}>
                                  Name
                                </Label>
                                <Col sm={9}>
                                  <Field
                                    type="text"
                                    name="name"
                                    id="name"
                                    className={
                                      'bg-white form-control' +
                                      (formikProps.errors.name &&
                                      formikProps.touched.name
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
                                <Label for="courseCode" sm={3}>
                                  Code
                                </Label>
                                <Col sm={9}>
                                  <Field
                                    type="text"
                                    name="courseCode"
                                    id="courseCode"
                                    className={
                                      'bg-white form-control' +
                                      (formikProps.errors.courseCode &&
                                      formikProps.touched.courseCode
                                        ? ' is-invalid'
                                        : '')
                                    }
                                    placeholder="Enter Code..."
                                  />
                                  <ErrorMessage
                                    name="courseCode"
                                    component="div"
                                    className="invalid-feedback"
                                  />
                                </Col>
                              </FormGroup>
                              <FormGroup row>
                                <Label for="name" sm={3}>
                                  Logo
                                </Label>
                                <Col sm={9}>
                                  <ImageUpload
                                    name="logoImage"
                                    maxFileSizeKB={200}
                                    defaultImage={selectedLogoDataUrl}
                                    onSelectedImage={imageDataUrl => {
                                      setSelectedLogoDataUrl(imageDataUrl)
                                    }}
                                  />
                                </Col>
                              </FormGroup>
                              <FormGroup row>
                                <Label for="ann" sm={3}>
                                  Description
                                </Label>
                                <Col sm={9}>
                                  <ReactQuill
                                    value={formikProps.values.description}
                                    name="text"
                                    onChange={x =>
                                      formikProps.setFieldValue(
                                        'description',
                                        x
                                      )
                                    }
                                    modules={modules}
                                    formats={formats}
                                    className={
                                      'bg-white form-control' +
                                      (formikProps.errors.description &&
                                      formikProps.touched.description
                                        ? ' is-invalid'
                                        : '')
                                    }
                                    placeholder="Enter Description..."
                                    style={{
                                      minHeight: '180px',
                                    }}
                                  />

                                  <ErrorMessage
                                    name="description"
                                    component="div"
                                    className="invalid-feedback"
                                  />
                                </Col>
                              </FormGroup>
                              <FormGroup row>
                                <Label for="programId" sm={3}>
                                  Program
                                </Label>
                                <Col sm={9}>
                                  <Field
                                    component="select"
                                    name="programId"
                                    id="programId"
                                    className={
                                      'bg-white form-control' +
                                      (formikProps.errors.programId &&
                                      formikProps.touched.programId
                                        ? ' is-invalid'
                                        : '')
                                    }
                                    required
                                  >
                                    <option value="">Select a program</option>
                                    {programs.map(p => {
                                      return (
                                        <option value={p.programId}>
                                          {p.name}
                                        </option>
                                      )
                                    })}
                                  </Field>
                                  {formikProps.errors.programId &&
                                    formikProps.touched.programId && (
                                      <InvalidFeedback>
                                        {formikProps.errors.programId}
                                      </InvalidFeedback>
                                    )}
                                </Col>
                              </FormGroup>
                              <FormGroup row>
                                <Label for="courseFile" sm={3}>
                                  Course file (.zip)
                                </Label>
                                <Col sm={9}>
                                  <div class="input-group mb-3">
                                    <div class="input-group-prepend">
                                      <span
                                        class="input-group-text"
                                        id="inputGroupFileAddon02"
                                      >
                                        {course ? 'Update' : 'Upload'}
                                      </span>
                                    </div>

                                    <div class="custom-file">
                                      <input
                                        type="file"
                                        id="courseFile"
                                        name="courseFile"
                                        className="custom-file-input"
                                        required={!course}
                                        onChange={f => {
                                          formikProps.setFieldValue(
                                            'fileData',
                                            f.target.files[0]
                                          )

                                          setCourseFileName(
                                            f.target.files[0].name
                                          )
                                        }}
                                        accept=".zip"
                                      />
                                      <label
                                        class="custom-file-label"
                                        for="courseFile"
                                      >
                                        {courseFileName || 'Choose a fille'}
                                      </label>
                                    </div>
                                  </div>
                                  {/* Uploading: {uploadProgress}/100% */}
                                </Col>
                              </FormGroup>
                              <FormGroup row>
                                <Col sm={3} />
                                <Col sm={9}>
                                  <ThemedButton type="submit">
                                    {(course && 'Update') || 'Create'}
                                  </ThemedButton>{' '}
                                  <Button
                                    type="button"
                                    onClick={cancel}
                                    color="light"
                                  >
                                    Back
                                  </Button>
                                </Col>
                              </FormGroup>
                            </Form>
                          ) : (
                            <CourseLearners course={course} />
                          )}
                        </CardBody>
                      </Card>
                    </Col>
                  </Row>
                </React.Fragment>
              )
            }}
          </Formik>
        )}
      </Consumer>
    )) || <Loading />
  )
}

export default hot(module)(EditCourse)
