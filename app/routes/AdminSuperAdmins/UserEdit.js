import React from "react";
import { Link, useHistory } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import styled from "styled-components";
import ProfilePhoto from '@/components/ProfilePhoto';
import ThemedButton from "@/components/ThemedButton";

import {
  Alert,
  Container,
  Button,
  Col,
  Card,
  CardBody,
  CustomInput,
  FormGroup,
  Label,
  Row
} from "@/components";
import { HeaderDemo } from "@/routes/components/HeaderDemo";
import { superAdminService } from "@/services";
import { useAppState } from '@/components/AppState';

const InvalidFeedback = styled.section`
    width: 100%;
    margin-top: 0.25rem;
    font-size: 0.75rem;
    color: #ED1C24;
`;

const UserEdit = props => {
  const [{currentUser, selectedInstitute}, dispatch] = useAppState();
  const loggedInUser = currentUser && currentUser.user;
  
  let history = useHistory();
  const [user, setUser] = React.useState(null);
  const [alertMessage, setAlertMessage] = React.useState(null);
  const [showAlert, setShowAlert] = React.useState(false);  

  React.useEffect(() => {
    
  }, []);

  React.useEffect(() => {
    console.log('props.user', props.user);
    setUser(props.user);
  }, [props.user]);

  const dismissAlert = () => {
    setAlertMessage(null);
    setShowAlert(false);
  };

  const showAlertMessage = ({ message, type, title }) => {
    setAlertMessage({ title, message, type });
    setShowAlert(true);
  };

  const goBack = () => {
    props.onCancel();
  };

  return (
    <Formik
      enableReinitialize={true}
      initialValues={{
        name: (user && user.name) || "",
        surname: (user && user.surname) || "",
        email: (user && user.email) || "",
        isActive: user ? (user.isActive ? 1 : 0) : 1
      }}
      validationSchema={Yup.object().shape({
        name: Yup.string().required("Name is required"),
        surname: Yup.string().required("Surname is required"),
        role: Yup.array().min(1, 'You have to select Role')
      })}
      onSubmit={(
        { name, surname, email, role, isActive, institute },
        { setStatus, setSubmitting }
      ) => {
        setStatus();
        if (user) {
          superAdminService
            .update({
              name,
              surname,
              email,
              isActive,
              userId: user.userId
            })
            .then(
              response => {
                setSubmitting(false);
                
                props.onEdited();

                  showAlertMessage({
                    title: "Success",
                    message: "You have sucessfully created an user!",
                    type: "success"
                  });
              }
            )
            .catch(err => {
              showAlertMessage({
                title: "Error",
                message: err,
                type: "danger"
              });
            });
        } else {
          superAdminService
            .add({
              name,
              surname,
              email            
            })
            .then(
              response => {
                setSubmitting(false);
                
                props.onEdited();

                showAlertMessage({
                  title: "Success",
                  message: "You have sucessfully created an user!",
                  type: "success"
                });
              }
            )
            .catch(err => {
              console.log('err', err);
              showAlertMessage({
                title: "Error",
                message: err,
                type: "danger"
              });
            });
        }
      }}
    >
      {formikProps => (
        <React.Fragment>
          {console.log('formikProps', formikProps)}
          <Container>
            {showAlert && alertMessage && (
              <Alert color={alertMessage.type}>
                <h6 className="mb-1 alert-heading">{alertMessage.title}</h6>
                {alertMessage.message}
                <div className="mt-2">
                  <Button color={alertMessage.type} onClick={dismissAlert}>
                    Dismiss
                  </Button>
                </div>
              </Alert>
            )}

            {/* START Header 1 */}
            <Row>
              <Col lg={12}>
                <HeaderDemo title="Edit Super admin details" subTitle="" />
              </Col>
            </Row>
            {/* START Section 1 */}
            <Row>
              <Col lg={12}>
                <Card className="mb-3">
                  <CardBody>
                    {/* START Form */}
                    <Form>
                      <FormGroup row>
                        <Col sm={3}></Col>
                        <Col sm={9}>
                          <ProfilePhoto
                            profilePhoto={user && user.profilePhoto || null}
                            enableEdit={true}
                            userId={user && user.userId}
                            size='size128'
                          />
                        </Col>
                      </FormGroup>
                      {/* START Input */}
                      <FormGroup row>
                        <Label for="name" sm={3}>
                          First name
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
                        <Label for="surname" sm={3}>
                          Last name
                        </Label>
                        <Col sm={9}>
                          <Field
                            type="text"
                            name="surname"
                            id="surname"
                            className={
                              "bg-white form-control" +
                              (formikProps.errors.surname && formikProps.touched.surname
                                ? " is-invalid"
                                : "")
                            }
                            placeholder="Enter Surname..."
                          />
                          <ErrorMessage
                            name="surname"
                            component="div"
                            className="invalid-feedback"
                          />
                        </Col>
                      </FormGroup>

                      <FormGroup row>
                        <Label for="email" sm={3}>
                          Email
                        </Label>
                        <Col sm={9}>
                          <Field
                            type="email"
                            name="email"
                            id="email"
                            className={
                              "bg-white form-control" +
                              (formikProps.errors.email && formikProps.touched.email
                                ? " is-invalid"
                                : "")
                            }
                            placeholder="Enter Email..."
                          />
                          <ErrorMessage
                            name="email"
                            component="div"
                            className="invalid-feedback"
                          />
                        </Col>
                      </FormGroup>

                      <FormGroup row>
                        <Label for="email" sm={3}>
                          Status
                        </Label>
                        <Col sm={9}>
                          <CustomInput
                            inline
                            type="radio"
                            id="statusActive"
                            name="isActive"
                            label="Active"
                            checked={formikProps.values.isActive == 1}
                            value={1}
                            onChange={event => {
                              formikProps.setFieldValue("isActive", event.target.value);
                            }}
                          />
                          <CustomInput
                            inline
                            type="radio"
                            id="statusInactive"
                            name="isActive"
                            label="Inactive"
                            value={0}
                            checked={formikProps.values.isActive == 0}
                            onChange={event => {
                              console.log('event.target.value', event.target.value);
                              formikProps.setFieldValue("isActive", event.target.value);
                            }}
                          />{" "}
                        </Col>
                      </FormGroup>
                      
                      <FormGroup row>
                        <Col sm={3}></Col>
                        <Col sm={9}>
                          <ThemedButton type="submit">
                            {(user && "Update") || "Create"}
                          </ThemedButton>{" "}
                          <Button
                            type="button"
                            onClick={() => goBack()}
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
          </Container>
        </React.Fragment>
      )}
    </Formik>
  );
};

export default UserEdit;
