import React, { useState, useEffect } from 'react';
import { useIntl } from 'react-intl';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import styled from 'styled-components';
import { toast } from 'react-toastify';
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
    if (group && group.groupId) setIsActive(group?.isActive);

    if (group && group.groupTypesName)
      setSelectedGroupTypes([group.groupTypesName]);

    groupTypesService
      .getAll(organizationId)
      .then((response) => setGroupTypes(response.groupTypes));
  }, []);

  const createGroup = (data, { setStatus, setSubmitting }) => {
    groupsService
      .create({
        organizationId,
        isActive,
        ...data,
      })
      .then(
        (reponse) => {
          toast.success(
            <div>
              <h4 className="text-success">Success</h4>
              <p>A new group has been created</p>
            </div>,
            { autoClose: 5000 }
          );
          setSubmitting(false);
          hideGroupForm();
        },
        (error) => {
          console.log(`Error while trying to create a groups:`, error);
          toast.error(
            <div>
              <h4 className="text-danger">Error</h4>
              <p>{JSON.stringify(error)}</p>
            </div>
          );
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
        isActive,
      })
      .then(
        (reponse) => {
          toast.success(
            <div>
              <h4 className="text-success">Success</h4>
              <p>Group has been updated</p>
            </div>,
            { autoClose: 5000 }
          );
          setSubmitting(false);
          hideGroupForm();
        },
        (error) => {
          console.log(`Error while updating the group ${name}:`, error);
          toast.error(
            <div>
              <h4 className="text-danger">Error</h4>
              <p>{JSON.stringify(error)}</p>
            </div>
          );
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
    typeId: group.group_type_id,
    description: group.description,
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    typeId: Yup.string().required('Group type is requires'),
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
                        <Form>
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
                            <Label for="group" sm={3}>
                              Group type
                            </Label>
                            <Col sm={9}>
                              <Field
                                as="select"
                                name="typeId"
                                id="groupType"
                                defaultValue={group.group_type_id}
                                className={
                                  'bg-white form-control' +
                                  (errors.typeId && touched.typeId
                                    ? ' is-invalid'
                                    : '')
                                }
                              >
                                <option value="">Select group type...</option>
                                {groupTypes.map((groupType) => {
                                  return (
                                    <option
                                      key={groupType.groupTypeId}
                                      value={groupType.groupTypeId}
                                    >
                                      {groupType.name}
                                    </option>
                                  );
                                })}
                              </Field>
                              <ErrorMessage
                                name="typeId"
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
