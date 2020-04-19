import React from 'react';
import { useIntl } from "react-intl";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import DatePicker from "react-datepicker";
import moment from "moment";
import styled from "styled-components";
import ThemedButton from "@/components/ThemedButton";
import { Typeahead } from 'react-bootstrap-typeahead';
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
import { Consumer } from "@/components/Theme/ThemeContext";
import AcademicYearDeletionModal from './AcademicYearDeletionModal';

const EditAcademicYear = ({ academicYear, onCancel, onDelete, updateAcademicYear, createAcademicYear,
  programs }) => {  
  const intl = useIntl();

  const [isDeletionModalOpen, setIsDeletionModalOpen] = React.useState(false);
  console.log('academicYear', academicYear, programs);

  const InvalidFeedback = styled.section`
    width: 100%;
    margin-top: 0.25rem;
    font-size: 0.75rem;
    color: #ed1c24;
  `;

  const showDeletionModal = () => {
    setIsDeletionModalOpen(true);
  }

  const hideDeletionModal = () => {
    setIsDeletionModalOpen(false);
  }

  return (
    (programs && (
      <Consumer>
        {themeState => (
          <Formik
            {...themeState}
            enableReinitialize={true}
            initialValues={{
              name: (academicYear && academicYear.academicYearName) || "",
              dateFrom: (academicYear && academicYear.startDate) || '',
              dateTo: (academicYear && academicYear.endDate) || '',
              programs: (academicYear && programs.filter(p => p.programId == academicYear.programId)) || [],
            }}
            validationSchema={Yup.object().shape({
              name: Yup.string().required("Name is required"),
              dateFrom: Yup.date().required("Date From is required"),
              dateTo: Yup.date().required("Date To is required"),
              programs: Yup.array().min(1, 'You need to select at least one program')
            })}

            onSubmit={(
              { name, dateFrom, dateTo, programs },
              { setStatus, setSubmitting }
            ) => {
              
              let ay = {
                name,
                startDate: dateFrom,
                endDate: dateTo,
                programs
              };

              console.log('Academic year', ay);

              if (academicYear) {
                updateAcademicYear({ ...ay, academicYearId: academicYear.academicYearId });
              } else {
                createAcademicYear(ay);
              }
            }}
          >
            {props => {
              //console.log("props", props);
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
                              <Label for="programs" sm={3}>
                                Program
                              </Label>
                              <Col sm={9}>
                                <Typeahead
                                  clearButton
                                  disabled={academicYear}
                                  id="programs"
                                  selected={props.values.programs}
                                  labelKey="name"
                                  multiple
                                  className={
                                    props.errors.programs &&
                                    props.touched.programs
                                      ? " is-invalid"
                                      : ""
                                  }
                                  options={programs}
                                  placeholder="Choose a program..."
                                  onChange={selectedOptions =>
                                    props.setFieldValue(
                                      "programs",
                                      selectedOptions
                                    )
                                  }
                                  onInputChange={selectedOptions =>
                                    props.setFieldValue(
                                      "programs",
                                      selectedOptions
                                    )
                                  }
                                />
                                {props.errors.programs && (
                                  <InvalidFeedback>
                                    {props.errors.programs}
                                  </InvalidFeedback>
                                )}
                              </Col>                              
                            </FormGroup>

                            <FormGroup row>
                              <Label for="duration" sm={3}>
                                Duration
                              </Label>
                              <Col sm={4}>
                                <InputGroup>
                                  <InputGroupAddon addonType="prepend">
                                    <i className="fa fa-fw fa-calendar"></i>
                                    From:
                                  </InputGroupAddon>
                                  <DatePicker
                                    id="dateFrom"
                                    name="dateFrom"
                                    disabled={academicYear}
                                    showMonthDropdown
                                    showYearDropdown
                                    autoComplete="off"
                                    className={
                                      "bg-white form-control zIndex100" +
                                      (props.errors.dateFrom &&
                                      props.touched.dateFrom
                                        ? " is-invalid"
                                        : "")
                                    }
                                    value={
                                      (props.values.dateFrom &&
                                        moment(
                                          props.values.dateFrom
                                        ).toDate()) ||
                                      ""
                                    }
                                    selected={
                                      (props.values.dateFrom &&
                                        moment(
                                          props.values.dateFrom
                                        ).toDate()) ||
                                      ""
                                    }
                                    onChange={date => {
                                      props.setFieldValue(
                                        "dateFrom",
                                        (date && moment(date).toDate()) || ""
                                      );
                                    }}
                                  />
                                  {props.errors.dateFrom &&
                                    props.touched.dateFrom && (
                                      <InvalidFeedback>
                                        {props.errors.dateFrom}
                                      </InvalidFeedback>
                                    )}
                                </InputGroup>
                              </Col>
                              <Col sm={4}>
                                <InputGroup>
                                  <InputGroupAddon addonType="prepend">
                                    <i className="fa fa-fw fa-calendar"></i>
                                    To:
                                  </InputGroupAddon>
                                  <DatePicker
                                    id="dateTo"
                                    name="dateTo"
                                    showMonthDropdown
                                    autoComplete="off"
                                    showYearDropdown
                                    disabled={academicYear}
                                    className={
                                      "bg-white form-control zIndex100" +
                                      (props.errors.dateTo &&
                                      props.touched.dateTo
                                        ? " is-invalid"
                                        : "")
                                    }
                                    value={
                                      (props.values.dateTo &&
                                        moment(props.values.dateTo).toDate()) ||
                                      ""
                                    }
                                    selected={
                                      (props.values.dateTo &&
                                        moment(props.values.dateTo).toDate()) ||
                                      ""
                                    }
                                    onChange={date => {
                                      props.setFieldValue(
                                        "dateTo",
                                        (date && moment(date).toDate()) || ""
                                      );
                                    }}
                                  />
                                  {props.errors.dateTo &&
                                    props.touched.dateTo && (
                                      <InvalidFeedback>
                                        {props.errors.dateTo}
                                      </InvalidFeedback>
                                    )}
                                </InputGroup>
                              </Col>
                            </FormGroup>

                            <FormGroup row>
                              <Col sm={3} />
                              <Col sm={9}>
                                <ThemedButton type="submit">
                                  {(academicYear && "Update") || "Create"}
                                </ThemedButton>
                                
                                {academicYear && (
                                  <React.Fragment>
                                    {" "}
                                    <Button
                                      onClick={showDeletionModal}
                                      type="button"
                                      color="danger">
                                      {intl.formatMessage({ id: 'General.Delete'})}
                                    </Button>
                                    <AcademicYearDeletionModal 
                                      isOpen={isDeletionModalOpen} 
                                      handleDeletion={onDelete} 
                                      cancelDeletion={hideDeletionModal} />
                                  </React.Fragment>                               
                                )}

                                {" "}
                                <Button
                                  type="button"
                                  onClick={onCancel}
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

export default EditAcademicYear;
