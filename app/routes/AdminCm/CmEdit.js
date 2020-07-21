import React from "react";
import { useIntl } from "react-intl";
import { useHistory } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import styled from "styled-components";
import ProfilePhoto from '@/components/ProfilePhoto';
import ThemedButton from "@/components/ThemedButton";
import { Role } from '@/helpers';
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
import { courseManagerService, roleService } from "@/services";
import { useAppState } from '@/components/AppState';

const InvalidFeedback = styled.section`
    width: 100%;
    margin-top: 0.25rem;
    font-size: 0.75rem;
    color: #ED1C24;
`;

const CmEdit = ({ user, onEdited, onCancel }) => {
  const intl = useIntl();

  const [{ currentUser, selectedOrganization }, dispatch] = useAppState();

  let history = useHistory();
  const [alertMessage, setAlertMessage] = React.useState(null);
  const [showAlert, setShowAlert] = React.useState(false);
  const [roles, setRoles] = React.useState([]);

  React.useEffect(() => {
    roleService.getCmRoles().then(data => {
      setRoles(data);
    });
  }, []);

  const dismissAlert = () => {
    setAlertMessage(null);
    setShowAlert(false);
  };

  const showAlertMessage = ({ message, type, title }) => {
    setAlertMessage({ title, message, type });
    setShowAlert(true);
  };

  const goBack = () => {
    onCancel();
  };

  return (
    <Formik
      enableReinitialize={true}
      initialValues={{
        name: (user && user.name) || "",
        surname: (user && user.surname) || "",
        email: (user && user.email) || "",
        gender: (user && user.gender) || "",
        userRoleId: (user && user.roleId) || "",
        isActive: (!user && true) || user.isActive
      }}
      validationSchema={Yup.object().shape({
        name: Yup.string().required("Name is required"),
        surname: Yup.string().required("Surname is required"),
        email: Yup.string().required("Email is required"),
        userRoleId: Yup.string().required('You have to select Role'),
        gender: Yup.string().required('Gender is required')
      })}
      onSubmit={(
        { name, surname, email, gender,
          userRoleId, isActive },
        { setStatus, setSubmitting }
      ) => {
        setStatus();

        if (user) {
          courseManagerService
            .update({
              name,
              surname,
              email,
              gender,
              isActive,
              userId: user.userId,
              employeeId: user.employeeId,
              roleId: userRoleId,
              organizationId: selectedOrganization.organizationId
            },
              selectedOrganization.organizationId)
            .then(
              response => {
                setSubmitting(false);
                console.log('response', response);
                if (response.isValid) {
                  onEdited();

                  showAlertMessage({
                    title: intl.formatMessage({ id: 'General.Success' }),
                    message: "You have sucessfully created an user!",
                    type: "success"
                  });

                }
                else {
                  showAlertMessage({
                    title: "Error",
                    message: response.errorDetails,
                    type: "danger"
                  });
                }
              }
            )
            .catch(err => console.log("err", err));
        } else {
          courseManagerService
            .add({
              name,
              surname,
              email,
              gender,
              organizationId: selectedOrganization.organizationId,
              roleId: userRoleId
            },
              selectedOrganization.organizationId)
            .then(
              response => {
                setSubmitting(false);

                if (response.isValid) {
                  onEdited();

                  showAlertMessage({
                    title: intl.formatMessage({ id: 'General.Success' }),
                    message: "You have sucessfully created an user!",
                    type: "success"
                  });
                }
                else {
                  showAlertMessage({
                    title: "Error",
                    message: response.errorDetails,
                    type: "danger"
                  });
                }
              },
              error => {
                setSubmitting(false);
                setStatus(error);
              }
            );
        }
      }}
    >
      {props => (
        <React.Fragment>
          {console.log('formik props', props)}
          <Container>
            {showAlert && alertMessage && (
              <Alert color={alertMessage.type}>
                <h6 className="mb-1 alert-heading">{alertMessage.title}</h6>
                {alertMessage.message}
                <div className="mt-2">
                  <Button color={alertMessage.type} onClick={dismissAlert}>
                    {intl.formatMessage({ id: 'General.Dismiss' })}
                  </Button>
                </div>
              </Alert>
            )}

            {/* START Header 1 */}
            <Row>
              <Col lg={12}>
                <HeaderDemo title="Edit user details" subTitle="" />
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
                              (props.errors.surname && props.touched.surname
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
                              (props.errors.email && props.touched.email
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
                        <Label for="gender" sm={3}>
                          Gender
                        </Label>
                        <Col sm={9}>
                          <CustomInput
                            inline
                            type="radio"
                            id="genderMale"
                            name="gender"
                            label="Male"
                            checked={props.values.gender == "M"}
                            value="M"
                            onChange={event => {
                              props.setFieldValue("gender", event.target.value);
                            }}
                          />
                          <CustomInput
                            inline
                            type="radio"
                            id="genderFemale"
                            name="gender"
                            label="Female"
                            value="F"
                            checked={props.values.gender == "F"}
                            onChange={event => {
                              props.setFieldValue("gender", event.target.value);
                            }}
                          />{" "}
                          {props.errors.gender && <InvalidFeedback>{props.errors.gender}</InvalidFeedback>}
                        </Col>
                      </FormGroup>

                      <FormGroup row>
                        <Label for="email" sm={3}>
                          {intl.formatMessage({ id: 'General.Status' })}
                        </Label>
                        <Col sm={9}>
                          <CustomInput
                            inline
                            type="radio"
                            id="statusActive"
                            name="isActive"
                            label="Active"
                            checked={props.values.isActive}
                            value={true}
                            onChange={event => {
                              props.setFieldValue("isActive", true);
                            }}
                          />
                          <CustomInput
                            inline
                            type="radio"
                            id="statusInactive"
                            name="isActive"
                            label="Inactive"
                            value={false}
                            checked={!props.values.isActive}
                            onChange={event => {
                              props.setFieldValue("isActive", false);
                            }}
                          />{" "}
                        </Col>
                      </FormGroup>

                      <FormGroup row>
                        <Label for="role" sm={3}>
                          Role
                        </Label>
                        <Col sm={9}>
                          <Field
                            component="select"
                            name="userRoleId"
                            id="userRoleId"
                            className={'bg-white form-control' + (props.errors.userRoleId && props.touched.userRoleId ? ' is-invalid' : '')}
                          >
                            <option value="">Select user role...</option>
                            {roles.map(r => {
                              return (
                                <option value={r.roleId} selected={user && r.roleId == user.roleId}>{r.name}</option>
                              );
                            })}
                          </Field>
                          {props.errors.userRoleId && <InvalidFeedback>{props.errors.userRoleId}</InvalidFeedback>}
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

export default CmEdit;
