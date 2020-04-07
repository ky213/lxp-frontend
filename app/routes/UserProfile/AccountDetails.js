import React from "react";
import { useParams, useHistory } from "react-router-dom";
import {
  Button,
  Col,
  Container,
  Card,
  CardBody,
  Media,
  FormGroup,
  Label,
  Row
} from "@/components";
import { HeaderMain } from "@/routes/components/HeaderMain";
import { userService } from "@/services";
import { useAppState } from "@/components/AppState";
import ProfilePhoto from "@/components/ProfilePhoto";
import { Consumer } from "@/components/Theme/ThemeContext";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import ThemedButton from "@/components/ThemedButton";
import { Role } from "@/helpers";
import { Loading } from "@/components";
import UserProfileNav from "./UserProfileNav";

const AccountDetails = ({currentUser, user, setSelectedTab}) => {
  
  const [showAlert, setShowAlert] = React.useState(false);
  const [alertMessage, setAlertMessage] = React.useState(null);

  const dismissAlert = () => {
    setAlertMessage(null);
    setShowAlert(false);
  };

  const showAlertMessage = ({ message, type, title }) => {
    setAlertMessage({ title, message, type });
    setShowAlert(true);
  };

  return (
    <Consumer>
      {themeState => (
        <Formik
          {...themeState}
          enableReinitialize={false}
          initialValues={{
            oldPassword: "",
            newPassword: "",
            newPasswordConfirm: ""
          }}
          validationSchema={Yup.object().shape({
            oldPassword: Yup.string().required(
              "You need to enter your old password"
            ),
            newPassword: Yup.string().required(
              "You need to enter a new password"
            ),
            newPasswordConfirm: Yup.string()
              .oneOf(
                [Yup.ref("newPassword"), null],
                "New password values must match"
              )
              .required("You need to confirm your new password")
          })}
          onSubmit={async (
            { oldPassword, newPassword, newPasswordConfirm },
            { setStatus, setSubmitting, resetForm }
          ) => {
            // Updating existing
            if (
              currentUser &&
              currentUser.user &&
              user.employeeId == currentUser.user.employeeId
            ) {
              try {
                const response = await userService.changePassword(
                  oldPassword,
                  newPassword
                );
                alert(response);
                setSubmitting(false);   
                setSelectedTab(null);
                resetForm({});
              } catch (error) {
                alert(error);
                setSubmitting(false);
                setStatus(error);
              }
            }
          }}
        >
          {formikProps => {
            return (
              <React.Fragment>
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

                <Row>
                  <Col lg={12}>
                    <Card className="mb-3">
                      <CardBody>
                        {/* START Form */}
                        <Form onSubmit={formikProps.handleSubmit}>
                          {/* START Input */}
                          <FormGroup row>
                            <Label for="name" sm={3}>
                              Old password
                            </Label>
                            <Col sm={9}>
                              <Field
                                type="password"
                                autoComplete="off"
                                name="oldPassword"
                                id="oldPassword"
                                className={
                                  "bg-white form-control" +
                                  (formikProps.errors.oldPassword &&
                                  formikProps.touched.oldPassword
                                    ? " is-invalid"
                                    : "")
                                }
                                placeholder="Enter your old password..."
                              />
                              <ErrorMessage
                                name="oldPassword"
                                component="div"
                                className="invalid-feedback"
                              />
                            </Col>
                          </FormGroup>
                          <FormGroup row>
                            <Label for="newPassword" sm={3}>
                              New password
                            </Label>
                            <Col sm={9}>
                              <Field
                                type="password"
                                name="newPassword"
                                id="newPassword"
                                className={
                                  "bg-white form-control" +
                                  (formikProps.errors.newPassword &&
                                  formikProps.touched.newPassword
                                    ? " is-invalid"
                                    : "")
                                }
                                placeholder="Enter a new password..."
                              />
                              <ErrorMessage
                                name="newPassword"
                                component="div"
                                className="invalid-feedback"
                              />
                            </Col>
                          </FormGroup>
                          <FormGroup row>
                            <Label for="newPassword" sm={3}>
                              Confirm new password
                            </Label>
                            <Col sm={9}>
                              <Field
                                type="password"
                                name="newPasswordConfirm"
                                id="newPasswordConfirm"
                                className={
                                  "bg-white form-control" +
                                  (formikProps.errors.newPasswordConfirm &&
                                  formikProps.touched.newPasswordConfirm
                                    ? " is-invalid"
                                    : "")
                                }
                                placeholder="Confirm the new password..."
                              />
                              <ErrorMessage
                                name="newPasswordConfirm"
                                component="div"
                                className="invalid-feedback"
                              />
                            </Col>
                          </FormGroup>
                          <FormGroup row>
                            <Col sm={3} />
                            <Col sm={9}>
                              <ThemedButton type="submit">
                                Change password
                              </ThemedButton>                              
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
  );
};

export default AccountDetails;
