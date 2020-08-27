import React, { useState, useEffect } from 'react';
import { useIntl } from 'react-intl';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import styled from 'styled-components';
import ThemedButton from '@/components/ThemedButton';
import { Typeahead } from 'react-bootstrap-typeahead';
import { groupsService, groupTypesService } from '@/services';
import { Consumer } from '@/components/Theme/ThemeContext';
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Button,
  FormGroup,
  Label,
  Alert,
  CustomInput,
} from '@/components';

const InvalidFeedback = styled.section`
  width: 100%;
  margin-top: 0.25rem;
  font-size: 0.75rem;
  color: #ed1c24;
`;

const AddEditGroup = (props) => {
  const [groupTypes, setGroupTypes] = useState([]);
  const [selectedGroupTypes, setSelectedGroupTypes] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState(null);
  const [isActive, setIsActive] = useState(true);
  const { hideGroupForm, organizationId, group } = props;
  const intl = useIntl();

  useEffect(() => {
    setIsActive(group?.isActive);

    if (group && group.groupTypesName)
      setSelectedGroupTypes([group.groupTypesName]);

    groupTypesService
      .getAll(organizationId)
      .then((response) => setGroupTypes(response.groupTypes));
  }, []);

  const dismissAlert = () => {
    setAlertMessage(null);
    setShowAlert(false);
    hideGroupForm();
  };

  const showAlertMessage = ({ message, type, title }) => {
    setAlertMessage({ title, message, type });
    setShowAlert(true);
  };

  const createGroup = (data, { setStatus, setSubmitting }) => {
    const { groupTypeId } = groupTypes.find(
      ({ name }) => name === data.groupType[0]
    );

    groupsService
      .create({
        organizationId,
        typeId: groupTypeId,
        isActive,
        ...data,
      })
      .then(
        (reponse) => {
          showAlertMessage({
            title: intl.formatMessage({ id: 'General.Success' }),
            message: 'You have sucessfully created a groups!',
            type: 'success',
          });
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
    const { groupTypeId } = groupTypes.find(
      ({ name }) => name === data.groupType[0]
    );
    groupsService
      .update({
        ...group,
        ...data,
        typeId: groupTypeId,
        isActive,
      })
      .then(
        (reponse) => {
          showAlertMessage({
            title: intl.formatMessage({ id: 'General.Success' }),
            message: 'You have sucessfully changed the group!',
            type: 'success',
          });
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
    if (group && group.groupId) {
      updateGroup(data, actions);
    } else {
      createGroup(data, actions);
    }
  };

  const initialValues = {
    name: group.name,
    type: group.groupType,
    description: group.description,
    groupType: selectedGroupTypes,
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    type: Yup.array()
      .min(1, 'You need to select at least one group')
      .typeError('Invalid entry'),
    description: Yup.string().required('Description is required'),
    groupType: Yup.array(),
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
          {({ errors, touched }) => {
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
                        <Form>
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
                                  'bg-white form-control' +
                                  (errors.name && touched.name
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
                            <Label for="groupType" sm={3}>
                              Type
                            </Label>
                            <Col sm={9}>
                              <Typeahead
                                id="groupType"
                                name="groupType"
                                clearButton
                                selected={selectedGroupTypes}
                                labelKey="groupType"
                                className={
                                  errors.type && touched.type
                                    ? ' is-invalid'
                                    : ''
                                }
                                options={groupTypes.map(({ name }) => name)}
                                placeholder="Choose a groups type..."
                                onChange={(selectedOptions) => {
                                  setSelectedGroupTypes(selectedOptions);
                                }}
                              />
                              <ErrorMessage
                                name="grouType"
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
                                name="description"
                                id="description"
                                className={
                                  'bg-white form-control' +
                                  (errors.description && touched.description
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
                            <Label for="description" sm={3}>
                              Status
                            </Label>
                            <Col sm={9} className="mt-2">
                              <CustomInput
                                inline
                                type="radio"
                                id="active"
                                name="active"
                                label="Active"
                                checked={isActive}
                                onChange={() => setIsActive(true)}
                              />
                              <CustomInput
                                inline
                                type="radio"
                                id="notActive"
                                name="notActive"
                                label="Not Active"
                                checked={!isActive}
                                onChange={() => setIsActive(false)}
                              />
                            </Col>
                          </FormGroup>
                          <FormGroup row>
                            <Col sm={3} />
                            <Col sm={9}>
                              <Button type="submit" color="primary mr-2">
                                Save
                              </Button>
                              <Button
                                type="cancel"
                                onClick={() => hideGroupForm(false)}
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
