import React from 'react';
import { useParams, Link } from "react-router-dom";
import { useIntl } from "react-intl";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import DatePicker, { setDefaultLocale } from 'react-datepicker';
import moment from 'moment';
import { SketchPicker } from 'react-color';
import styled from "styled-components";
import ThemedButton from "@/components/ThemedButton";
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
    Alert
} from '@/components';
import { programService, authenticationService, userService, facultyMemberService } from '@/services';
import { Consumer } from '@/components/Theme/ThemeContext';
import ImageUpload from '@/components/ImageUpload';
import { useAppState } from '@/components/AppState';


const InvalidFeedback = styled.section`
    width: 100%;
    margin-top: 0.25rem;
    font-size: 0.75rem;
    color: #ED1C24;
`;

const AddEditProgram = (props) => {
    const intl = useIntl();

    const [{currentUser, selectedInstitute}, dispatch] = useAppState();
    const [program, setProgram] = React.useState(null);
    const [users, setUsers] = React.useState([]);
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
        facultyMemberService.getAll(1, 999, null, selectedInstitute.instituteId).then((data) => {  
            console.log("facultyMemberService : ", data); 
            if(data.users) {
                const usersData = data.users.filter(u => u.role == Role.ProgramDirector).map(u => {  
                    return {
                        name: `${u.name} ${u.surname}`,
                        employeeId: u.employeeId
                    }
                });
                setUsers(usersData || []);
            }

            /* console.log("usersData: ", usersData); */
        });
    }, []);

    React.useEffect(() => {
        if (props.programId) {
            programService.getById(props.programId, selectedInstitute.instituteId).then((data) => {
                setProgram(data);
            });
        }
        else {
            setProgram(null);
        }
        if (inputEl && inputEl.current) {
            inputEl.current.focus();
        }
    }, [props.programId]
    );

    return (
        <Consumer>
            {
                (themeState) => (
                    <Formik {...themeState} {...props}
                        enableReinitialize={true}
                        initialValues={{
                            name: program && program.name || '',
                            programDirectors: program && program.programDirectors || [],
                        }}
                        validationSchema={Yup.object().shape({
                            name: Yup.string().required('Name is required'),
                            programDirectors: Yup.array().min(1, 'You need to select at least one program director').typeError('Invalid entry')
                        })}
                        onSubmit={({ name, programDirectors }, { setStatus, setSubmitting }) => {

                            console.log("Program directors:", name, programDirectors )
                            // Updating existing                    
                            if (program) {
                                programService.update({ name, programId: program.programId, programDirectors, instituteId: selectedInstitute.instituteId }).then(
                                    reponse => {
                                        showAlertMessage({
                                            title: intl.formatMessage({ id: 'General.Success'}),
                                            message: "You have sucessfully changed the program!",
                                            type: "success"
                                        });
                                        props.onEdited();
                                        setSubmitting(false);
                                    },
                                    error => {
                                        console.log(`Error while changing the program ${name}:`, error)
                                        let errorMessage = `Error while trying to change the program ${name}`;
                                        if(error.toLowerCase().includes('unique')) {
                                            errorMessage = `Program with the same name (${name}) already exists`;
                                        }

                                        showAlertMessage({
                                            title: "Error",
                                            message: errorMessage,
                                            type: "danger"
                                        });
                                        setSubmitting(false);
                                        setStatus(error);
                                    }
                                );
                            }
                            else {
                                programService.create({ name, programDirectors, instituteId: selectedInstitute.instituteId }).then(
                                    reponse => {
                                        showAlertMessage({
                                            title: intl.formatMessage({ id: 'General.Success'}),
                                            message: "You have sucessfully created a program!",
                                            type: "success"
                                        });
                                        props.onEdited();
                                        setSubmitting(false);
                                    },
                                    error => {
                                        console.log(`Error while trying to create a program:`, error)
                                        let errorMessage = `Error while trying to create a program`;
                                        if(error.toLowerCase().includes('unique')) {
                                            errorMessage = `Program with the same name already exists`;
                                        }

                                        showAlertMessage({
                                            title: "Error",
                                            message: errorMessage,
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
                                                                <Label for="programDirectors" sm={3}>
                                                                    Program director/s
                                                                </Label>
                                                                <Col sm={9}>
                                                                    <Typeahead
                                                                        clearButton
                                                                        id="programDirectors"
                                                                        selected={props.values.programDirectors}
                                                                        labelKey="name"
                                                                        multiple
                                                                        className={(props.errors.programDirectors && props.touched.programDirectors ? ' is-invalid' : '')}
                                                                        options={users}
                                                                        placeholder="Choose a program director..."
                                                                        onChange={(selectedOptions) => props.setFieldValue('programDirectors', selectedOptions)}
                                                                        onInputChange={(selectedOptions) => props.setFieldValue('programDirectors', selectedOptions)}
                                                                    />
                                                                    {props.errors.programDirectors && <InvalidFeedback>{props.errors.programDirectors}</InvalidFeedback>}
                                                                    <em>You can only select program directors here (users in the Program Director role)</em>
                                                                </Col>
                                                            </FormGroup>

                                                            <FormGroup row>
                                                                <Col sm={3} />
                                                                <Col sm={9}>
                                                                    <ThemedButton type="submit">{program && "Update" || "Create"}</ThemedButton>{' '}
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

export default AddEditProgram;