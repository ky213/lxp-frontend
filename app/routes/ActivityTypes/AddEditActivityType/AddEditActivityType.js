import React from 'react';
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
import { activityTypesService, authenticationService, userService, facultyMemberService } from '@/services';
import { Consumer } from '@/components/Theme/ThemeContext';
import ImageUpload from '@/components/ImageUpload';
import { useAppState } from '@/components/AppState';


const InvalidFeedback = styled.section`
    width: 100%;
    margin-top: 0.25rem;
    font-size: 0.75rem;
    color: #ED1C24;
`;

const AddEditActivityType = (props) => {
    const [{currentUser, selectedInstitute}, dispatch] = useAppState();
    const [activityType, setActivityType] = React.useState(null);

    const [showAlert, setShowAlert] = React.useState(false);
    const [alertMessage, setAlertMessage] = React.useState(null);
    const { onCancelCreate } = props;
    const inputEl = React.useRef(null);

    const dismissAlert = () => {
        setAlertMessage(null);
        setShowAlert(false);
    }

    const showAlertMessage = ({ message, type, title }) => {
        setAlertMessage({ title, message, type });
        setShowAlert(true);
    }

    React.useEffect(() => {
        if (props.activityTypeId) {
            activityTypesService.getById(props.activityTypeId, selectedInstitute.instituteId).then((data) => {                
                setActivityType(data);
            });
        }
        else {
            setActivityType(null);
        }
        if (inputEl && inputEl.current) {
            inputEl.current.focus();
        }
    }, [props.activityTypeId]
    );

    return (
        <Consumer>
            {
                (themeState) => (
                    <Formik {...themeState} {...props}
                        enableReinitialize={true}
                        initialValues={{
                            name: activityType && activityType.name || '',
                        }}
                        validationSchema={Yup.object().shape({
                            name: Yup.string().required('Name is required'),
                        })}
                        onSubmit={({ name }, { setStatus, setSubmitting }) => {

                            //console.log("Activity Type Update :", name, activityType.activityTypeId, selectedInstitute.instituteId)
                            // Updating existing                    
                            if (activityType) {
                                activityTypesService.update({ name, activityTypeId: activityType.activityTypeId, instituteId: selectedInstitute.instituteId }).then(
                                    reponse => {
                                        showAlertMessage({
                                            title: "Success",
                                            message: "You have sucessfully changed the activity type!",
                                            type: "success"
                                        });
                                        props.onEdited();
                                        setSubmitting(false);
                                    },
                                    error => {
                                        showAlertMessage({
                                            title: "Error",
                                            message: `Error while changing activity type: ${error}`,
                                            type: "danger"
                                        });
                                        setSubmitting(false);
                                        setStatus(error);
                                    }
                                );
                            }
                            else {
                                activityTypesService.create({ name, instituteId: selectedInstitute.instituteId }).then(
                                    reponse => {
                                        showAlertMessage({
                                            title: "Success",
                                            message: "You have sucessfully created a activity type!",
                                            type: "success"
                                        });
                                        props.onEdited();
                                        setSubmitting(false);
                                    },
                                    error => {
                                        showAlertMessage({
                                            title: "Error",
                                            message: `Error while trying to create a activity type: ${error}`,
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
                                                                    <ThemedButton type="submit">{activityType && "Update" || "Create"}</ThemedButton>{' '}
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

export default AddEditActivityType;