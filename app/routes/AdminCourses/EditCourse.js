import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import ReactQuill from 'react-quill';
import DatePicker from "react-datepicker";
import moment from "moment";
import styled from "styled-components";
import ThemedButton from "@/components/ThemedButton";
import { Typeahead } from "react-bootstrap-typeahead";
import axios from 'axios';
import config from '@/config';
import { authHeader, handleResponse, buildQuery } from '@/helpers';
import  ImageUpload from '@/components/ImageUpload';

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
  Loading
} from "@/components";
import { programService } from "@/services";
import { Consumer } from "@/components/Theme/ThemeContext";
import { useAppState } from '@/components/AppState';

const EditCourse = ({ course,
  onCancel, finishEdit, finishInsert, showAlertMessage, 
  hideAlertMessage, updateCourseList}) => {
  
  const [{selectedInstitute}] = useAppState();
  const [programs, setPrograms] = React.useState([]);
  //const [startingDate, setStartingDate] = React.useState(null);

  const [programsLoaded, setProgramsLoaded] = React.useState(false);
  const [formLoaded, setFormLoaded] = React.useState(false);
  const [uploadProgress, setUploadProgress] = React.useState(0);
  const [selectedLogoDataUrl, setSelectedLogoDataUrl] = React.useState(null);

  React.useEffect(() => {
    programService.getByCurrentUser(selectedInstitute.instituteId).then(data => {
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
    }
    else {
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
        [{ 'header': [1, 2, false] }],
        ['bold', 'italic', 'underline','strike', 'blockquote'],
        [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
        ['clean']
    ],
  }

  const formats = [
      'header',
      'bold', 'italic', 'underline', 'strike', 'blockquote',
      'list', 'bullet', 'indent'
  ]

  return (
    (formLoaded && (
      <Consumer>
        {themeState => (
          <Formik
            {...themeState}
            enableReinitialize={true}
            initialValues={{
              name: (course && course.name) || "",
              logoImage: (course && course.image) || "",
              description: (course && course.description) || "",
              programId: (course && course.programId) || '',
              periodDays: (course && course.periodDays) || 0,
              startingDate: (course && course.startingDate && moment(course.startingDate).toDate()) || '',
              fileData: ""
            }}
            validationSchema={Yup.object().shape({
              name: Yup.string().required("Name is required"),
              description: Yup.string().required("Description is required"),
              periodDays: Yup.number(),
            })}
            onSubmit={(
              { name, description, programId, periodDays, fileData, startingDate, logoImage },
              { setStatus, setSubmitting, isSubmitting }
            ) => {

              setSubmitting(true);

              const formData = new FormData();
              if (fileData)
                formData.append('file', fileData);
              if (logoImage)
                formData.append('logo', logoImage);
              formData.append('name', name);
              formData.append('description', description);
              formData.append('programId', programId);
              formData.append('periodDays', periodDays);
              formData.append('startingDate', startingDate);
              formData.append('selectedInstitute', selectedInstitute.instituteId);              

              let httpMethod = '';
              if (course) {
                httpMethod = 'PUT';
                formData.append('courseId', course.courseId);
                formData.append('contentPath', course.contentPath);
              } else {
                httpMethod = 'POST';
              }

              axios({
                method: httpMethod,
                headers: {
                    'Content-Type': 'multipart/form-data',
                    ...authHeader()
                },
                data: formData,
                url: config.apiUrl + "/courses",
                onUploadProgress: (ev) => {
                    const progress = ev.loaded / ev.total * 100;
                    setUploadProgress(Math.round(progress));
                },
              })
              .then((resp) => {
                  // our mocked response will always return true
                  // in practice, you would want to use the actual response object
                  //setUploadStatus(true);
                  setSubmitting(false);
                  if (course) {
                    finishEdit();
                  }
                  else {
                    finishInsert();
                  }
              })
              .catch((err) => console.error(err));
            }}
          >
            {formikProps => {
              console.log("props", formikProps);
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
                                    "bg-white form-control" +
                                    (formikProps.errors.name && formikProps.touched.name
                                      ? " is-invalid"
                                      : "")
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
                                <ImageUpload name="logoImage" maxFileSizeKB={200} defaultImage={formikProps.values.logoImage} onSelectedImage={(imageDataUrl) => {
                                  //console.log("Selected image:", imageDataUrl)
                                  setFieldValue('logoImage', imageDataUrl);
                                  setSelectedLogoDataUrl(imageDataUrl);
                                }} />
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
                                  onChange={ x => formikProps.setFieldValue(
                                    "description",
                                    x
                                  )}
                                  modules={modules}
                                  formats={formats}
                                  className={
                                    "bg-white form-control" +
                                    (formikProps.errors.description && formikProps.touched.description
                                      ? " is-invalid"
                                      : "")
                                  }
                                  placeholder="Enter Description..."
                                  style={{
                                    minHeight: "180px"
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
                                      "bg-white form-control zIndex100" +
                                      (formikProps.errors.startingDate &&
                                        formikProps.touched.startingDate
                                        ? " is-invalid"
                                        : "")
                                    }
                                    selected={formikProps.values.startingDate}
                                    showMonthDropdown
                                    showYearDropdown
                                    onChange={date => formikProps.setFieldValue('startingDate', date)}
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
                              <Label for="periodDays" sm={3}>
                                Period days
                              </Label>
                              <Col sm={4}>
                                <Field
                                  type="text"
                                  name="periodDays"
                                  id="periodDays"
                                  className={'bg-white form-control' + (formikProps.errors.periodDays && formikProps.touched.periodDays ? ' is-invalid' : '')}
                                  placeholder="Min level..."
                                />
                                <ErrorMessage name="periodDays" component="div" className="invalid-feedback" />
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
                                  className={'bg-white form-control' + (formikProps.errors.programId && formikProps.touched.programId ? ' is-invalid' : '')}                                   
                                >
                                    <option value="">Select a program</option>
                                    {programs.map(p => {
                                        return (
                                          <option value={p.programId}>{p.name}</option>
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
                                <input
                                  type="file"
                                  onChange={(f) => formikProps.setFieldValue(
                                    "fileData",
                                    f.target.files[0]
                                  )}
                                  accept=".zip" />
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
                                  {(course && "Update") || "Create"}
                                </ThemedButton>{" "}
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
