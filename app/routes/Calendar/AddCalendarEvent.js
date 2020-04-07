import React from 'react';
import {
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    Row,
    Col,
    Card,
    CardBody,
    FormGroup,
    Label,
    InputGroup,
    InputGroupAddon,
    InvalidFeedback
  } from "@/components";

import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import DatePicker, { setDefaultLocale } from 'react-datepicker';
import moment from 'moment';
import {AddonInput} from '@/routes/Forms/DatePicker/components';
import {calendarService, userService, activityService} from '@/services';
import { useAppState, AppStateContext } from '@/components/AppState';
import { Typeahead } from 'react-bootstrap-typeahead';

export const AddCalendarEvent = ({toggle, isOpen, selectedResident, eventStart, eventEnd, onSuccess}) => {
    //console.log("Selected resident for calendar:", selectedResident)
    const minDate = moment().toDate();
    const [{currentUser, selectedInstitute}, dispatch] = useAppState();
    const [currentSelectedResident, setCurrentSelectedResident] = React.useState(null);
    const [users, setUsers] = React.useState([]);

    React.useEffect(() => {
        console.log("Event start, end:", eventStart, eventEnd, selectedResident)
        if(!selectedResident) {
            console.log("Entered get users:")
            userService.getAllActive(selectedInstitute.instituteId).then(users => {
                console.log("Got users:", users)
                setUsers(users);
            });
           
        }    
    }, []);

    return (
        <Modal toggle={toggle} isOpen={isOpen} className="modal-outline-primary">
            <Formik
                enableReinitialize={true}
                initialValues={{
                    title: selectedResident && `${selectedResident.residentName} (Meeting)` || '',
                    description: '',
                    start: eventStart || moment().toDate(),
                    end: eventEnd || null,
                    resident: ''
                }}
                validationSchema={Yup.object().shape({
                    title: Yup.string().required('Title of the meeting is required'),
                    start: Yup.date().required('Starting time of the meeting is required'),
                    end: Yup.date()
                            .when('start', (start, schema) => schema.min(start, ({min}) => `Ending time must be greater than meeting start time (${moment(min).format('LLLL')})`))
                })}
                onSubmit={async ({ title, description, start, end, resident }, { setStatus, setSubmitting }) => {
                    setStatus();
                    setSubmitting(false);  
                    console.log('onSubmit', title, description, start, end, resident);

                    if((selectedResident && selectedResident.residentId == currentUser.user.employeeId) ||
                        (resident && resident.length > 0 && resident[0].employeeId == currentUser.user.employeeId)) {
                        alert(`You cannot request a meeting with yourself! :)`);
                        return;
                    }

                    const selectedEmployeeName = selectedResident && selectedResident.residentName || resident && resident.length > 0 && resident[0].name || null;
                    console.log("Selected employee name:", selectedEmployeeName)


                    setSubmitting(true);
                    try {
                        const activity = {
                            //programId: programId, 
                            name: title,
                            start: start,      
                            end: end,      
                            priority: 4,
                            activityTypeId: 11,
                            location: '',
                            repeat: false,
                            description: description,
                            participants: [{
                                employeeId: selectedResident && selectedResident.residentId || resident && resident.length > 0 && resident[0].employeeId || null
                            }]
                        };

                        await activityService.create(activity);

                        if(selectedEmployeeName) {
                            alert(`You have successfully requested a meeeting with ${selectedEmployeeName}!`);
                        }
                        else {
                            alert(`You have successfully entered a calendar event titled ${title}!`);
                        }

                        toggle();
                        if(onSuccess) {
                            onSuccess();
                        }
                    }
                    catch(error) {
                        console.log(error);
                        setStatus(error);  
                        if(selectedEmployeeName) {
                            alert(`Something went wrong while processing your meeting request with ${selectedEmployeeName}, please try again!`);
                        }
                        else {
                            alert(`Something went wrong while processing your calendar event titled ${title}!`);
                        }
                    }

                    setSubmitting(false); 

                }}
            >
                {formikProps => {
                    return (
                    <React.Fragment>
                        <Form onSubmit={formikProps.handleSubmit}>
                        <ModalHeader tag="h6">
                        {
                            selectedResident && (<>
                                <span className="small ml-1 text-muted">
                                Request a meeting with 
                                </span>{' '}
                                {selectedResident && selectedResident.residentName || ''}
                                </>
                            ) 
                            || "Create a calendar event"
                        }
                            
                        </ModalHeader>
                        <ModalBody>

                        <Row>
                            <Col lg={ 12 }>
                                <Card className="mb-3">
                                    <CardBody>
                                        { /* START Form */}
                                        
                                            { /* START Input */}
            
                                            <FormGroup row>
                                                <Label for="title" sm={3}>
                                                    Title
                                                </Label>
                                                <Col sm={9}>
                                                    <Field 
                                                        type="text" 
                                                        name="title" 
                                                        id="title" 
                                                        className={'bg-white form-control' + (formikProps.errors.title && formikProps.touched.title ? ' is-invalid' : '')} 
                                                        placeholder="Enter title..." 
                                                    />
                                                    <ErrorMessage name="title" component="div" className="invalid-feedback" />
                                                </Col>                                                    
                                            </FormGroup>
                                            <FormGroup row>
                                                <Label for="title" sm={3}>
                                                    Agenda
                                                </Label>
                                                <Col sm={9}>
                                                    <Field component="textarea"
                                                        name="description" 
                                                        id="description" 
                                                        className={'bg-white form-control' + (formikProps.errors.description && formikProps.touched.description ? ' is-invalid' : '')} 
                                                        placeholder="Enter agenda..." 
                                                    />
                                                    <ErrorMessage name="description" component="div" className="invalid-feedback" />
                                                </Col>                                                    
                                            </FormGroup>
                                            {!selectedResident && (
                                                <FormGroup row>
                                                    <Label for="title" sm={3}>
                                                        Employee
                                                    </Label>
                                                    <Col sm={9}>
                                                            <Typeahead
                                                                clearButton
                                                                id="resident"
                                                                labelKey="name"
                                                                options={users}
                                                                className={(formikProps.errors.resident && formikProps.touched.resident ? ' is-invalid' : '')}
                                                                placeholder="Select employee to request a meeting with..."
                                                                onChange={(selectedOptions) =>  formikProps.setFieldValue('resident', selectedOptions)}
                                                                onInputChange={(selectedOptions) =>  formikProps.setFieldValue('resident', selectedOptions)}
                                                            />
                                                        
                                                        <ErrorMessage name="resident" component="div" className="invalid-feedback" />
                                                    </Col>                                                    
                                                </FormGroup>
                                            )}
                                            <FormGroup row>
                                                <Label for="start" sm={3}>
                                                    Starting at
                                                </Label>
                                                <Col sm={9}>
                                             
                                                
                                                    <DatePicker
                                                        customInput={ <AddonInput /> }
                                                        dateFormat="dd/MM/yyyy h:mm aa"
                                                        showMonthDropdown
                                                        showYearDropdown
                                                        autoComplete="off"
                                                        showTimeSelect
                                                        name="start"
                                                        id="start"
                                                        className={(formikProps.errors.start && formikProps.touched.start ? ' is-invalid' : '')}
                                                        selected={formikProps.values.start}
                                                        onChange={e => formikProps.setFieldValue('start', e)}
                                                    />
                                                    {formikProps.errors.start && formikProps.touched.start && <InvalidFeedback>{formikProps.errors.start}</InvalidFeedback>}     
                                           
                                                                                    
                                                </Col>
                                            </FormGroup>
        
                                            <FormGroup row>
                                                <Label for="end" sm={3}>
                                                    Ending at
                                                </Label>
                                                <Col sm={9}>
                                                    <DatePicker
                                                        customInput={ <AddonInput /> }
                                                        dateFormat="dd/MM/yyyy h:mm aa"
                                                        name="end"
                                                        id="end"
                                                        showTimeSelect
                                                        autoComplete="off"
                                                        showMonthDropdown
                                                        showYearDropdown
                                                        className={ (formikProps.errors.end && formikProps.touched.end ? ' is-invalid' : '')}
                                                        selected={formikProps.values.end}
                                                        onChange={e => formikProps.setFieldValue('end', e)}
                                                        />  
                                                    {formikProps.errors.end && formikProps.touched.end && <InvalidFeedback>{formikProps.errors.end}</InvalidFeedback>}                                                             
                                                </Col>
                                            </FormGroup>
                                        { /* END Form */}
                                    </CardBody>
                                </Card>                  
                            </Col>                
                        </Row>
                        </ModalBody>
                        <ModalFooter>
                            <Button type="submit">Schedule</Button>{' '}
                            <Button type="button" onClick={toggle} color="light">Close</Button>
                        </ModalFooter>
                    </Form>
                </React.Fragment>
                )
            }}
            </Formik>
        </Modal>
    )
}
