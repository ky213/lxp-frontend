import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import ReactQuill from 'react-quill';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import styled from 'styled-components';
import ThemedButton from '@/components/ThemedButton';
import { Typeahead } from 'react-bootstrap-typeahead';
import axios from 'axios';
import config from '@/config';
import { authHeader, handleResponse, buildQuery } from '@/helpers';
import ImageUpload from '@/components/ImageUpload';

import {
  Row,
  Col,
  Card,
  CardBody,
  Button,
  InputGroup,
  InputGroupAddon,
  CustomInput,
  FormGroup,
  Label,
  Loading,
} from '@/components';
import { programService } from '@/services';
import { Consumer } from '@/components/Theme/ThemeContext';
import { useAppState } from '@/components/AppState';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';

const EditCourse = ({
  course,
  onCancel,
  finishEdit,
  finishInsert,
  showAlertMessage,
  hideAlertMessage,
  updateCourseList,
}) => {
  const [{ selectedOrganization }] = useAppState();
  const [programs, setPrograms] = React.useState([]);
  //const [startingDate, setStartingDate] = React.useState(null);

  const [programsLoaded, setProgramsLoaded] = React.useState(false);
  const [formLoaded, setFormLoaded] = React.useState(false);
  const [uploadProgress, setUploadProgress] = React.useState(0);
  const [selectedLogoDataUrl, setSelectedLogoDataUrl] = React.useState('');
  const [courseFileName, setCourseFileName] = React.useState('');

  React.useEffect(() => {
    programService
      .getByCurrentUser(selectedOrganization.organizationId)
      .then((data) => {
        setPrograms(data);
        setProgramsLoaded(true);
      });
  }, []);

  React.useEffect(() => {
    if (programsLoaded) setFormLoaded(true);
  }, [programsLoaded]);

  React.useEffect(() => {
    if (course) {
      setSelectedLogoDataUrl(course.image);
      setCourseFileName(course.contentPath);
    } else {
      setSelectedLogoDataUrl(null);
    }
  }, [course]);

  const cancel = () => {
    onCancel();
  };

  const InvalidFeedback = styled.section`
    width: 100%;
    margin-top: 0.25rem;
    font-size: 0.75rem;
    color: #ed1c24;
  `;

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
  };

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
  ];

  return (
    (formLoaded && (
      <Consumer>
        {(themeState) => (
          <Formik
            {...themeState}
            enableReinitialize={true}
            initialValues={{
              name: (course && course.name) || '',
              logoImage: (course && course.image) || '',
              description: (course && course.description) || '',
              programId: (course && course.programId) || '',
              startingDate:
                (course &&
                  course.startingDate &&
                  moment(course.startingDate).toDate()) ||
                '',
            }}
            validationSchema={Yup.object().shape({
              name: Yup.string().required('Name is required'),
              description: Yup.string().required('Description is required'),
            })}
            onSubmit={async (
              { name, description, programId, fileData, startingDate },
              { setStatus, setSubmitting, isSubmitting }
            ) => {
              setSubmitting(true);
              const formData = new FormData();
              if (fileData) formData.append('tincan', fileData.name);
              formData.append('logo', selectedLogoDataUrl);
              formData.append('name', name);
              formData.append('description', description);
              formData.append('programId', programId);
              formData.append('startingDate', startingDate);
              formData.append(
                'selectedOrganization',
                selectedOrganization.organizationId
              );

              let httpMethod = '';
              if (course) {
                httpMethod = 'PUT';
                formData.append('courseId', course.courseId);
                formData.append('contentPath', course.contentPath);
              } else {
                httpMethod = 'POST';
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
                .then((resp) => {
                  if (fileData) {
                    let uploadUrl = resp.data.uploadUrl;

                    axios({
                      method: 'PUT',
                      url: uploadUrl,
                      data: fileData,
                      headers: {
                        'Content-Type': fileData.type,
                      },
                      onUploadProgress: (ev) => {
                        const progress = (ev.loaded / ev.total) * 100;
                        setUploadProgress(Math.round(progress));
                      },
                    })
                      .then((resp) => {
                        // our mocked response will always return true
                        // in practice, you would want to use the actual response object
                        //setUploadStatus(true);
                        setSubmitting(false);
                        finishInsert();
                      })
                      .catch((err) => {
                        console.error(err);
                        throw err;
                      });
                  }
                  setSubmitting(false);
                  finishInsert();
                })
                .catch((err) => console.error(err));
            }}
          >
            {(formikProps) => {
              return (
                <React.Fragment>
                  <Row>
                    <Col lg={12}>
                      <Card className="mb-3">
                        <CardBody>
                          {/* START Form */}
                          <Form onSubmit={formikProps.handleSubmit}>
                            {/* START Input */}
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
                              <Label for="name" sm={3}>
                                Logo
                              </Label>
                              <Col sm={9}>
                                <ImageUpload
                                  name="logoImage"
                                  maxFileSizeKB={200}
                                  defaultImage={selectedLogoDataUrl}
                                  onSelectedImage={(imageDataUrl) => {
                                    setSelectedLogoDataUrl(imageDataUrl);
                                  }}
                                />
                                <small text="muted">
                                  - max file size 200KB
                                </small>
                                <br />
                                <small text="muted">
                                  - for a better view use at least a 400 X 400
                                  resolution
                                </small>
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
                                  onChange={(x) =>
                                    formikProps.setFieldValue('description', x)
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
                              <Label for="startingDate" sm={3}>
                                Starting date
                              </Label>
                              <Col sm={4}>
                                <InputGroup>
                                  <InputGroupAddon addonType="prepend">
                                    <i className="fa fa-fw fa-calendar"></i>
                                    From:
                                  </InputGroupAddon>
                                  <DatePicker
                                    id="startingDate"
                                    name="startingDate"
                                    showMonthDropdown
                                    showYearDropdown
                                    autoComplete="off"
                                    className={
                                      'bg-white form-control zIndex100' +
                                      (formikProps.errors.startingDate &&
                                      formikProps.touched.startingDate
                                        ? ' is-invalid'
                                        : '')
                                    }
                                    selected={formikProps.values.startingDate}
                                    showMonthDropdown
                                    showYearDropdown
                                    onChange={(date) =>
                                      formikProps.setFieldValue(
                                        'startingDate',
                                        date
                                      )
                                    }
                                  />
                                  {formikProps.errors.startingDate &&
                                    formikProps.touched.startingDate && (
                                      <InvalidFeedback>
                                        {formikProps.errors.startingDate}
                                      </InvalidFeedback>
                                    )}
                                </InputGroup>
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
                                  {programs.map((p) => {
                                    return (
                                      <option value={p.programId}>
                                        {p.name}
                                      </option>
                                    );
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
                                      onChange={(f) => {
                                        formikProps.setFieldValue(
                                          'fileData',
                                          f.target.files[0]
                                        );

                                        setCourseFileName(
                                          f.target.files[0].name
                                        );
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
                                {/* {props.errors.programId && (
                                  <InvalidFeedback>
                                    {props.errors.programId}
                                  </InvalidFeedback>
                                )} */}
                                Uploading: {uploadProgress}/100%
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
                          {/* END Form */}
                        </CardBody>
                      </Card>
                    </Col>
                  </Row>
                  {/* END Section 2 */}
                </React.Fragment>
              );
            }}
          </Formik>
        )}
      </Consumer>
    )) || <Loading />
  );
};

export default EditCourse;
