import React, { useState, useEffect, useRef } from 'react';
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
  groupTypesService,
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
  const { showGroupForm } = props;
  const intl = useIntl();
  const [group, setGroup] = useState(null);
  const [groupTypes, setGroupTypes] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState(null);
  const inputEl = useRef(null);
  const [
    {
      currentUser,
      selectedOrganization: { organizationId },
    },
    dispatch,
  ] = useAppState();

  useEffect(async () => {
    const response = await groupTypesService.getAll(organizationId);
    setGroupTypes(response.groupTypes);
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

  const createGroup = (data, { setStatus, setSubmitting }) => {
    const groupType = groupTypes.find(({ name }) => name === data.type[0]);

    groupsService
      .create({
        organizationId,
        groupTypeId,
        ...data,
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
  };

  const updateGroup = (data, { setStatus, setSubmitting }) => {
    groupsService
      .update({
        ...group,
        ...data,
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
  };

  const handleSubmit = (data, actions) => {
    // Updating existing
    if (group) {
      updateGroup(data, actions);
    } else {
      createGroup(data, actions);
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
          onSubmit={handleSubmit}
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
                            <Label for="type" sm={3}>
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
                                  props.errors.type && props.touched.type
                                    ? ' is-invalid'
                                    : ''
                                }
                                options={groupTypes.map(({ name }) => name)}
                                placeholder="Choose a groups type..."
                                onChange={(selectedOptions) =>
                                  props.setFieldValue('type', selectedOptions)
                                }
                              />
                              <ErrorMessage
                                name="type"
                                component="div"
                                className="invalid-feedback"
                              />
                            </Col>
                          </FormGroup>
                          <FormGroup row>
                            <Label for="description" sm={3}>
                              Desciption
                            </Label>
                            <Col sm={9}>
                              <Field
                                as="textarea"
                                row={15}
                                ref={inputEl}
                                name="description"
                                id="description"
                                className={
                                  'bg-white form-control' +
                                  (props.errors.description &&
                                  props.touched.description
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
                              <ThemedButton type="submit">Save</ThemedButton>
                              <Button
                                type="button"
                                onClick={() => showGroupForm(false)}
                                color="light"
                              >
                                Cancel
                              </Button>
                            </Col>
                          </FormGroup>
                        </Form>
                      </CardBody>
                    </Card>
                  </Col>
                </Row>
              </Container>
            );
          }}
        </Formik>
      )}
    </Consumer>
  );
};
export default AddEditGroup;
