import React from "react";
import { useIntl } from "react-intl";
import { Link, useHistory } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import styled from "styled-components";
import ProfilePhoto from '@/components/ProfilePhoto';
import ThemedButton from "@/components/ThemedButton";
import { Typeahead } from 'react-bootstrap-typeahead';
import { Role } from '@/helpers';
import DatePicker from "react-datepicker";
import {
  Alert,
  Container,
  Button,
  Col,
  Card,
  CardBody,
  CustomInput,
  InputGroup,
  InputGroupAddon,
  FormGroup,
  Label,
  Row
} from "@/components";
import { HeaderDemo } from "@/routes/components/HeaderDemo";
import { facultyMemberService, roleService } from "@/services";
import { useAppState } from '@/components/AppState';
import moment from "moment";

const InvalidFeedback = styled.section`
    width: 100%;
    margin-top: 0.25rem;
    font-size: 0.75rem;
    color: #ED1C24;
`;

const FmEdit = props => {
  const intl = useIntl();
  
  const [{currentUser, selectedInstitute}, dispatch] = useAppState();
  const loggedInUser = currentUser && currentUser.user;
  const isSuperAdmin = loggedInUser && loggedInUser.role == Role.SuperAdmin || false;

  let history = useHistory();
  const [user, setUser] = React.useState(null);
  const [alertMessage, setAlertMessage] = React.useState(null);
  const [showAlert, setShowAlert] = React.useState(false);
  const [roles, setRoles] = React.useState([]);
  const [selectedRoles, setSelectedRoles] = React.useState(null);

  React.useEffect(() => {
    roleService.getFmRoles().then(data => {
      setRoles(data);
    });
  }, []);

  React.useEffect(() => {
    setUser(props.user);    
  }, [props.user]);

  React.useEffect(() => {
    if (user && user.roleId && roles) {
      setSelectedRoles([user.roleId]);
    }

    console.log('props.user', user);
  }, [user, roles]);

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
    <Formik  {...props}
      enableReinitialize={true}
      initialValues={{
        name: (user && user.name) || "",
        surname: (user && user.surname) || "",
        email: (user && user.email) || "",
        gender: (user && user.gender) || "",        
        role: selectedRoles || [],
        isActive: (!user && true) || user.isActive
      }}
      validationSchema={Yup.object().shape({
        name: Yup.string().required("Name is required"),
        surname: Yup.string().required("Surname is required"),        
        email: Yup.string().required("Email is required"),
        role: Yup.array().min(1, 'You have to select Role')
      })}
      onSubmit={(
        { name, surname, email, gender,
          role, isActive },
        { setStatus, setSubmitting }
      ) => {
        setStatus();
        if (user) {
          facultyMemberService
            .update({
              name,
              surname,
              email,
              gender,
              isActive,
              userId: user.userId,
              employeeId: user.employeeId,
              roleId: role[0],
              instituteId: selectedInstitute.instituteId
            },
            selectedInstitute.instituteId)
            .then(
              response => {
                setSubmitting(false);
                console.log('response', response);
                if (response.isValid)
                {
                  props.onEdited();

                  showAlertMessage({
                    title: intl.formatMessage({ id: 'General.Sucess'}),
                    message: "You have sucessfully created an user!",
                    type: "success"
                  });

                }
                else
                {
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
          facultyMemberService
            .add({
              name,
              surname,
              email,
              gender,
              instituteId: selectedInstitute.instituteId,
              roleId: role[0]
            },
            selectedInstitute.instituteId)
            .then(
              response => {
                setSubmitting(false);
                
                if (response.isValid)
                {
                  props.onEdited();

                  showAlertMessage({
                    title: intl.formatMessage({ id: 'General.Sucess'}),
                    message: "You have sucessfully created an user!",
                    type: "success"
                  });
                }
                else
                {
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
                  {intl.formatMessage({ id: 'General.Dismiss'})}
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
                        </Col>
                      </FormGroup>

                      <FormGroup row>
                        <Label for="email" sm={3}>
                        {intl.formatMessage({ id: 'General.Status'})}
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
                              props.setFieldValue("isActive", event.target.value == true);
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
                              props.setFieldValue("isActive", event.target.value == true);
                            }}
                          />{" "}
                        </Col>
                      </FormGroup>

                      <FormGroup row>
                        <Label for="role" sm={3}>
                          Role
                        </Label>
                        <Col sm={9}>
                          <Typeahead
                            clearButton
                            id="role"
                            selected={selectedRoles || []}
                            labelKey="name"
                            options={roles || []}
                            className={(props.errors.role && props.touched.role ? ' is-invalid' : '')}
                            placeholder="Choose a role..."
                            onChange={selectedOption => { props.setFieldValue('role', selectedOption)}
                            }
                          />
                          {props.errors.role && <InvalidFeedback>{props.errors.role}</InvalidFeedback>}
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

export default FmEdit;
