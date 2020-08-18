import React from 'react';
import { useIntl } from "react-intl";
import { useParams, Link } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import DatePicker, { setDefaultLocale } from 'react-datepicker';
import moment from 'moment';
import { SketchPicker } from 'react-color';
import styled from "styled-components";
import ThemedButton from "@/components/ThemedButton";
import { Typeahead } from 'react-bootstrap-typeahead';

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
    Alert
} from '@/components';
import { groupTypesService, authenticationService, userService, courseManagerService } from '@/services';
import { Consumer } from '@/components/Theme/ThemeContext';
import ImageUpload from '@/components/ImageUpload';
import { useAppState } from '@/components/AppState';


const InvalidFeedback = styled.section`
    width: 100%;
    margin-top: 0.25rem;
    font-size: 0.75rem;
    color: #ED1C24;
`;

const AddEditGroupType = (props) => {
    const [{currentUser, selectedOrganization}, dispatch] = useAppState();
    const [groupType, setGroupType] = React.useState(null);

    const [showAlert, setShowAlert] = React.useState(false);
    const [alertMessage, setAlertMessage] = React.useState(null);
    const { onCancelCreate } = props;
    const inputEl = React.useRef(null);
    const intl = useIntl();

    const dismissAlert = () => {
        setAlertMessage(null);
        setShowAlert(false);
    }

    const showAlertMessage = ({ message, type, title }) => {
        setAlertMessage({ title, message, type });
        setShowAlert(true);
    }

    React.useEffect(() => {       
        if (props.groupTypeId) {
            groupTypesService.getById(props.groupTypeId,selectedOrganization.organizationId).then((data) => {                
                setGroupType(data);
                console.log("Group Type  :", data);
            });
        }
        else {            
            setGroupType(null);
        }
        if (inputEl && inputEl.current) {
            inputEl.current.focus();
        }
    }, [props.groupTypeId]);

    return (
        <Consumer>
            {
                (themeState) => (
                    <Formik {...themeState} {...props}
                        enableReinitialize={true}
                        initialValues={{
                            name: groupType && groupType.name || '',
                        }}
                        validationSchema={Yup.object().shape({
                            name: Yup.string().required('Name is required'),
                        })}
                        onSubmit={({ name }, { setStatus, setSubmitting }) => {
                            console.log("Group Type Update s:", groupType.name , groupType.groupTypeId);
                            setStatus();
                            console.log("Group Type Update :", name, props.groupTypeId, selectedOrganization.organizationId)
                            // Updating existing                    
                            if (groupType) {
                                groupTypesService.update({ name, groupTypeId: props.groupTypeId, organizationId: selectedOrganization.organizationId }).then(
                                    reponse => {
                                        showAlertMessage({
                                            title: intl.formatMessage({ id: 'General.Success'}),
                                            message: "You have sucessfully changed the group type!",
                                            type: "success"
                                        });
                                        props.onEdited();
                                        setSubmitting(false);
                                    },
                                    error => {
                                        showAlertMessage({
                                            title: "Error",
                                            message: `Error while changing group type: ${error}`,
                                            type: "danger"
                                        });
                                        setSubmitting(false);
                                        setStatus(error);
                                    }
                                );
                            }
                            else {
                                groupTypesService.create({ name, organizationId: selectedOrganization.organizationId }).then(
                                    reponse => {
                                        showAlertMessage({
                                            title: intl.formatMessage({ id: 'General.Success'}),
                                            message: "You have sucessfully created a group type!",
                                            type: "success"
                                        });
                                        props.onEdited();
                                        setSubmitting(false);
                                    },
                                    error => {
                                        showAlertMessage({
                                            title: "Error",
                                            message: `Error while trying to create a group type: ${error}`,
                                            type: "danger"
                                        });
                                        setSubmitting(false);
                                        setStatus(error);
                                    }
                                );
                            }

                        }}
                    >
                        {props => {
                            return (
                                <React.Fragment>
                                    <Container>
                                        {
                                            showAlert && alertMessage && (
                                                <Alert color={alertMessage.type}>
                                                    <h6 className="mb-1 alert-heading">
                                                        {alertMessage.title}
                                                    </h6>
                                                    {alertMessage.message}
                                                    <div className="mt-2">
                                                        <Button color={alertMessage.type} onClick={dismissAlert}>Dismiss</Button>
                                                    </div>
                                                </Alert>
                                            )
                                        }

                                        <Row>
                                            <Col lg={12}>
                                                <Card className="mb-3">
                                                    <CardBody>
                                                        { /* START Form */}
                                                        <Form onSubmit={props.handleSubmit}>
                                                            { /* START Input */}
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
                                                                        className={'bg-white form-control' + (props.errors.name && props.touched.name ? ' is-invalid' : '')}
                                                                        placeholder="Enter Name..."
                                                                    />
                                                                    <ErrorMessage name="name" component="div" className="invalid-feedback" />
                                                                </Col>
                                                            </FormGroup>

                                                            <FormGroup row>
                                                                <Col sm={3} />
                                                                <Col sm={9}>
                                                                    <ThemedButton type="submit">{groupType && "Update" || "Create"}</ThemedButton>{' '}
                                                                    <Button type="button" onClick={onCancelCreate} color="light">Cancel</Button>
                                                                </Col>
                                                            </FormGroup>
                                                        </Form>
                                                        { /* END Form */}
                                                    </CardBody>
                                                </Card>
                                            </Col>
                                        </Row>
                                        { /* END Section 2 */}
                                    </Container>
                                </React.Fragment>
                            )
                        }}
                    </Formik>)
            }
        </Consumer>
    )
};

export default AddEditGroupType;