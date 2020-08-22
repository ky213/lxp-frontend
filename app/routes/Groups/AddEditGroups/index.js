import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useIntl } from 'react-intl';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import DatePicker, { setDefaultLocale } from 'react-datepicker';
import moment from 'moment';
import { SketchPicker } from 'react-color';
import styled from 'styled-components';
import ThemedButton from '@/components/ThemedButton';
import { Typeahead } from 'react-bootstrap-typeahead';
import { Role } from '@/helpers';

import {
  Container,
  Row,
  Col,
  Card,
  CardTitle,
  CardBody,
  Button,
  InputGroup,
  InputGroupAddon,
  CustomInput,
  FormGroup,
  Label,
  Media,
  Input,
  FormText,
  Alert,
} from '@/components';
import {
  groupsService,
  authenticationService,
  userService,
  courseManagerService,
} from '@/services';
import { Consumer } from '@/components/Theme/ThemeContext';
import ImageUpload from '@/components/ImageUpload';
import { useAppState } from '@/components/AppState';

const InvalidFeedback = styled.section`
  width: 100%;
  margin-top: 0.25rem;
  font-size: 0.75rem;
  color: #ed1c24;
`;

const AddEditGroup = (props) => {
  const { onCancelCreate } = props;
  const intl = useIntl();

  const [{ currentUser, selectedOrganization }, dispatch] = useAppState();
  const [group, setGroup] = React.useState(null);
  const [users, setUsers] = React.useState([]);
  const [showAlert, setShowAlert] = React.useState(false);
  const [alertMessage, setAlertMessage] = React.useState(null);
  const inputEl = React.useRef(null);

  useEffect(() => {
    courseManagerService
      .getAll(1, 999, null, selectedOrganization.organizationId)
      .then((data) => {
        if (data.users) {
          const usersData = data.users
            .filter((u) => u.role == Role.GroupDirector)
            .map((u) => {
              return {
                name: `${u.name} ${u.surname}`,
                employeeId: u.employeeId,
              };
            });
          setUsers(usersData || []);
        }

        /* console.log("usersData: ", usersData); */
      });
  }, []);

  useEffect(() => {
    if (props.groupId) {
      groupsService
        .getById(props.groupId, selectedOrganization.organizationId)
        .then((data) => {
          setGroup(data);
        });
    } else {
      setGroup(null);
    }
    if (inputEl && inputEl.current) {
      inputEl.current.focus();
    }
  }, [props.groupId]);

  const dismissAlert = () => {
    setAlertMessage(null);
    setShowAlert(false);
  };

  const showAlertMessage = ({ message, type, title }) => {
    setAlertMessage({ title, message, type });
    setShowAlert(true);
  };

  const formValidation = (
    { name, groupDirectors },
    { setStatus, setSubmitting }
  ) => {
    // Updating existing
    if (group) {
      groupsService
        .update({
          name,
          groupId: group.groupId,
          groupDirectors,
          organizationId: selectedOrganization.organizationId,
        })
        .then(
          (reponse) => {
            showAlertMessage({
              title: intl.formatMessage({ id: 'General.Success' }),
              message: 'You have sucessfully changed the group!',
              type: 'success',
            });
            props.onEdited();
            setSubmitting(false);
          },
          (error) => {
            console.log(`Error while changing the group ${name}:`, error);
            let errorMessage = `Error while trying to change the group ${name}`;
            if (error.toLowerCase().includes('unique')) {
              errorMessage = `Group with the same name (${name}) already exists`;
            }

            showAlertMessage({
              title: 'Error',
              message: errorMessage,
              type: 'danger',
            });
            setSubmitting(false);
            setStatus(error);
          }
        );
    } else {
      groupsService
        .create({
          name,
          groupsDirectors,
          organizationId: selectedOrganization.organizationId,
        })
        .then(
          (reponse) => {
            showAlertMessage({
              title: intl.formatMessage({ id: 'General.Success' }),
              message: 'You have sucessfully created a groups!',
              type: 'success',
            });
            props.onEdited();
            setSubmitting(false);
          },
          (error) => {
            console.log(`Error while trying to create a groups:`, error);
            let errorMessage = `Error while trying to create a groups`;
            if (error.toLowerCase().includes('unique')) {
              errorMessage = `Group with the same name already exists`;
            }

            showAlertMessage({
              title: 'Error',
              message: errorMessage,
              type: 'danger',
            });
            setSubmitting(false);
            setStatus(error);
          }
        );
    }
  };

  const initialValues = {
    name: (group && group.name) || '',
    groupDirectors: (group && group.groupDirectors) || [],
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    type: Yup.array()
      .min(1, 'You need to select at least one group')
      .typeError('Invalid entry'),
    description: Yup.string().required('Description is required'),
  });

  return (
    <Consumer>
      {(themeState) => (
        <Formik
          {...themeState}
          {...props}
          enableReinitialize={true}
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={formValidation}
        >
          {(props) => {
            return (
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
                                ref={inputEl}
                                name="name"
                                id="name"
                                className={
                                  'bg-white form-control' +
                                  (props.errors.name && props.touched.name
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
                            <Label for="groupsDirectors" sm={3}>
                              Type
                            </Label>
                            <Col sm={9}>
                              <Typeahead
                                id="type"
                                name="type"
                                clearButton
                                selected={props.values.groupsDirectors}
                                labelKey="name"
                                multiple
                                className={
                                  props.errors.groupsDirectors &&
                                  props.touched.groupsDirectors
                                    ? ' is-invalid'
                                    : ''
                                }
                                options={users}
                                placeholder="Choose a groups type..."
                                onChange={(selectedOptions) =>
                                  props.setFieldValue(
                                    'groupsDirectors',
                                    selectedOptions
                                  )
                                }
                              />
                              {props.errors.groupsDirectors && (
                                <InvalidFeedback>
                                  {props.errors.groupsDirectors}
                                </InvalidFeedback>
                              )}
                            </Col>
                          </FormGroup>
                          <FormGroup row>
                            <Label for="desciption" sm={3}>
                              Desciption
                            </Label>
                            <Col sm={9}>
                              <Field
                                as="textarea"
                                row={15}
                                ref={inputEl}
                                name="desciption"
                                id="description"
                                className={
                                  'bg-white form-control' +
                                  (props.errors.name && props.touched.name
                                    ? ' is-invalid'
                                    : '')
                                }
                                placeholder="Enter Description..."
                              />
                              <ErrorMessage
                                name="description"
                                component="div"
                                className="invalid-feedback"
                              />
                            </Col>
                          </FormGroup>
                          <FormGroup row>
                            <Col sm={3} />
                            <Col sm={9}>
                              <ThemedButton type="submit">
                                {(group && 'Update') || 'Create'}
                              </ThemedButton>{' '}
                              <Button
                                type="button"
                                onClick={onCancelCreate}
                                color="light"
                              >
                                Cancel
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
            );
          }}
        </Formik>
      )}
    </Consumer>
  );
};

export default AddEditGroup;
