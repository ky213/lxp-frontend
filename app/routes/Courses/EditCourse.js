import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import ReactQuill from 'react-quill';
import DatePicker from "react-datepicker";
import moment from "moment";
import styled from "styled-components";
import ThemedButton from "@/components/ThemedButton";
import { Typeahead } from "react-bootstrap-typeahead";

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
import { courseService, programService } from "@/services";
import { Consumer } from "@/components/Theme/ThemeContext";
import { useAppState } from '@/components/AppState';
import FileList from "./FileList";

const EditCourse = ({ course,
  onCancel, editCourse, insertCourse, showAlertMessage, 
  hideAlertMessage, updateCourseList}) => {
  
  const [{selectedInstitute}] = useAppState();

  const [files, setFiles] = React.useState([]);
  const [programs, setPrograms] = React.useState([]);
  const [startingDate, setStartingDate] = React.useState(null);

  const [programsLoaded, setProgramsLoaded] = React.useState(false);
  const [formLoaded, setFormLoaded] = React.useState(false);

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
    if (course)
    {
      if (course.startingDate) {
        setStartingDate(moment(course.startingDate).toDate());
      }
    } 
  }, [course]);

  const cancel = () => {
    onCancel();
  };

  const uploadFile = (file) => {    
    console.log('uploading file', file);

    courseService.uploadFile(file);


    // announcementService.addFile(file)
    //   .then((announcementFileId) => {
    //     updateAnnouncementInList(files.length + 1);
    //     console.log('file uploaded', announcementFileId);
    //     file = {...file, announcementFileId: announcementFileId, status: 'uploaded'};
    //     setFiles(z => z.map(f => {
    //       if (f.name != file.name)
    //         return f;
          
    //       return file;
    //     }));
    //     showAlertMessage({
    //       title: "Success",
    //       message: "The file has been uploaded",
    //       type: "success"
    //     });
    //   })
    //   .catch((error) => {
    //     file = {...file, status: 'error'};
    //     setFiles(z => z.map(f => {
    //       if (f.name != file.name)
    //         return f;
          
    //       return file;
    //     }));
    //     showAlertMessage({
    //       title: "Error",
    //       message: `Error while uploading the file`,
    //       type: "danger"
    //     });
    //   });
  }

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
              description: (course && course.description) || "",
              programId: (course && course.programId) || '',
              periodDays: (course && course.periodDays) || 0              
            }}
            validationSchema={Yup.object().shape({
              name: Yup.string().required("Title is required"),
              description: Yup.string().required("Text is required")
            })}
            onSubmit={(
              { name, description, programId, periodDays },
              { setStatus, setSubmitting }
            ) => {
              
              let courseData = {
                name,
                description,
                programId,
                periodDays,
                startingDate: startingDate && moment(startingDate).format() || null,
                instituteId: selectedInstitute.instituteId
              };

              console.log('xxx', courseData);
              return;
              if (course) {
                courseData = { ...courseData, courseId: course.courseId };
                editCourse(courseData);
              } else {
                insertCourse(courseData).then(courseId => {
                  console.log(
                    "insertCourse -> courseId",
                    courseId
                  );
                });
              }
            }}
          >
            {props => {
              console.log("props", props);
              return (
                <React.Fragment>
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
                                  name="name"
                                  id="name"
                                  className={
                                    "bg-white form-control" +
                                    (props.errors.name && props.touched.name
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
                              <Label for="ann" sm={3}>
                                Description
                              </Label>
                              <Col sm={9}>
                                <ReactQuill
                                  value={props.values.description}
                                  name="text"
                                  onChange={ x => props.setFieldValue(
                                    "description",
                                    x
                                  )}
                                  modules={modules}
                                  formats={formats}
                                  className={
                                    "bg-white form-control" +
                                    (props.errors.description && props.touched.description
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
                                      (props.errors.startingDate &&
                                      props.touched.startingDate
                                        ? " is-invalid"
                                        : "")
                                    }
                                    selected={startingDate}
                                    showMonthDropdown
                                    showYearDropdown
                                    onChange={date => {
                                      console.log('date', moment(date).format());
                                      setStartingDate(date);
                                    }}
                                  />
                                  {props.errors.startingDate &&
                                    props.touched.startingDate && (
                                      <InvalidFeedback>
                                        {props.errors.startingDate}
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
                                <Typeahead
                                  clearButton
                                  id="programId"
                                  selected={props.values.programId}
                                  labelKey="name"
                                  className={
                                    props.errors.programId &&
                                    props.touched.programId
                                      ? " is-invalid"
                                      : ""
                                  }
                                  options={programs}
                                  placeholder="Choose a program..."
                                  onChange={selectedOptions =>
                                    props.setFieldValue(
                                      "programId",
                                      selectedOptions
                                    )
                                  }
                                  onInputChange={selectedOptions =>
                                    props.setFieldValue(
                                      "programId",
                                      selectedOptions
                                    )
                                  }
                                />
                                {props.errors.programId && (
                                  <InvalidFeedback>
                                    {props.errors.programId}
                                  </InvalidFeedback>
                                )}
                              </Col>
                            </FormGroup>

                            <Row>
                              <Col sm={3} />
                              <Col sm={9}>
                                <FileList
                                  course={course}
                                  files={files}
                                  setFiles={setFiles}
                                  uploadFile={uploadFile}
                                  showAlertMessage={showAlertMessage}
                                  updateCourseList={updateCourseList}
                                />
                              </Col>
                            </Row>

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
