import React from "react";
import {
  Alert,
  Button,
  Card,
  CardBody,
  Col,
  Input,
  FormGroup,
  Label,
  Row
} from "@/components";
import { Consumer } from "@/components/Theme/ThemeContext";
import ProfilePhoto from "@/components/ProfilePhoto";
import { Role } from "@/helpers";
import { Formik, Field, Form, ErrorMessage } from "formik";
import ThemedButton from "@/components/ThemedButton";
import moment from "moment";
import { userService } from "../../services/user.service";

const ProfileDetails = ({ currentUser, user, getUserData }) => {
  
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
            phoneNumber: user.phoneNumber || "",
            pagerNumber: user.pagerNumber || ""
          }}
          onSubmit={async (
            { phoneNumber, pagerNumber },
            { setStatus, setSubmitting, resetForm }
          ) => {
            userService
              .updateProfileData(phoneNumber, pagerNumber)
              .then(response => {
                alert(response);
                setSubmitting(false);
                getUserData();
              })
              .catch(err => {
                alert(err);
                setSubmitting(false);
              });
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
                        <Form>
                          {/* START Input */}
                          <FormGroup row>
                            <Label sm={3}>Email</Label>
                            <Label sm={9} className='color-form-text'>{user.email}</Label>
                          </FormGroup>
                          {user && user.roleName && (
                            <FormGroup row>
                              <Label sm={3}>Role</Label>
                              <Label sm={9} className='color-form-text'>{user.roleName}</Label>
                            </FormGroup>
                          )}
                          <FormGroup row>
                            <Label sm={3}>Gender</Label>
                            <Label sm={9} className='color-form-text'>{user.gender == "F" ? "Female" : "Male"}</Label>
                          </FormGroup>
                          {user && user.startDate && (
                            <FormGroup row>
                              <Label sm={3}>Start date</Label>
                              <Label sm={9} className='color-form-text'>{user.startDate && moment(user.startDate).format("LLLL")}</Label>                              
                            </FormGroup>
                          )}
                          {currentUser &&
                            currentUser.user &&
                            currentUser.user.role != "Resident" && (
                              <React.Fragment>
                                <FormGroup row>
                                  <Label for="phoneNumber" sm={3}>
                                    Phone number
                                  </Label>
                                  <Col sm={6}>
                                    <Field
                                      type="text"
                                      autoComplete="off"
                                      name="phoneNumber"
                                      id="phoneNumber"
                                      className="bg-white form-control"
                                      placeholder="Enter your phone number..."
                                      onChange={event => {
                                        formikProps.setFieldValue(
                                          "phoneNumber",
                                          event.target.value
                                        );
                                      }}
                                    />
                                  </Col>
                                </FormGroup>
                                <FormGroup row>
                                  <Label for="pagerNumber" sm={3}>
                                    Pager number
                                  </Label>
                                  <Col sm={6}>
                                    <Field
                                      type="text"
                                      autoComplete="off"
                                      name="pagerNumber"
                                      id="pagerNumber"
                                      className="bg-white form-control"
                                      placeholder="Enter your pager number..."
                                      onChange={event => {
                                        formikProps.setFieldValue(
                                          "pagerNumber",
                                          event.target.value
                                        );
                                      }}
                                    />
                                  </Col>
                                </FormGroup>

                                <FormGroup row>
                                  <Col sm={3} />
                                  <Col sm={9}>
                                    <ThemedButton type="submit">
                                      Update
                                    </ThemedButton>
                                  </Col>
                                </FormGroup>
                              </React.Fragment>
                            )}
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

export default ProfileDetails;
