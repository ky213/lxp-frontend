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
    CustomInput,
    InputGroup,
    InputGroupAddon,
    InvalidFeedback
  } from "@/components";

import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import DatePicker, { setDefaultLocale } from 'react-datepicker';
import moment from 'moment';
import {AddonInput} from '@/routes/Forms/DatePicker/components';
import {activityService, facultyMemberService} from '@/services';
import { useAppState, AppStateContext } from '@/components/AppState';
import { Typeahead } from 'react-bootstrap-typeahead';
import { Role } from '@/helpers';
import ThemedButton from "@/components/ThemedButton";

export const LogActivity = ({toggle, isOpen, eventStart, eventEnd, onSuccess, selectedActivity}) => {
    const [{currentUser, selectedOrganization}, dispatch] = useAppState();
    const currentUserRole = currentUser && currentUser.user && currentUser.user.role;
    const [supervisors, setSupervisors] = React.useState([]);
    const [activityTypes, setActivityTypes] = React.useState([]);
    const [participationLevels, setParticipationLevels] = React.useState([]);
    const [timeDifference, setTimeDifference] = React.useState(30);

    React.useEffect(() => {
        activityService.getActivityTypes(selectedOrganization.organizationId).then(types => {
            console.log("Got activity types:", types)
            setActivityTypes(types);
        });

        activityService.getParticipationLevels().then(levels => {
            console.log("Got participation levels:", levels)
            setParticipationLevels(levels);
        });
        
        facultyMemberService.getAllActive(1, 999, null, selectedOrganization.organizationId).then(users => {
            console.log("Got users:", users)
            setSupervisors(users.users.map(usr => {
                if(usr.employeeId != currentUser.user.employeeId) {
                    return {
                        employeeId: usr.employeeId,
                        name: `${usr.name} ${usr.surname}`
                    }
                }
            }));
        });

        if(selectedActivity) {
            const calculatedTimeDifference = Math.round(moment.duration(moment(selectedActivity.end).diff(moment(selectedActivity.start))).add(remainder, 'minutes').asMinutes());
            console.log("Initial time diff:", calculatedTimeDifference)
            setTimeDifference(calculatedTimeDifference);
        }

    }, [selectedActivity]);

    const eventStartObj = eventStart && moment(eventStart).toObject() || null;
    const eventEndObj = eventStart && moment(eventEnd).toObject() || null;
    const remainder = 30 - (moment().minute() % 30);

    const updateActivityStatus = async (status) => {
        if(selectedActivity) {
            try {
                await activityService.updateLogActivityStatus(selectedActivity.activityId, status);
                alert(`You have successfully deleted the logged activity!`);
                onSuccess();
            }
            catch(error) {
                console.log("Error while changing the status of the logged activity:", error)
                alert("We're sorry but something went wrong while we were changing the status of your logged activity!");
            }
            
            toggle();
        }
    }


    return (
        <Modal toggle={toggle} isOpen={isOpen} className="modal-outline-primary" size="lg">
            <Formik
                enableReinitialize={false}
                initialValues={{
                    activityName: selectedActivity && selectedActivity.name ||'',
                    details: selectedActivity && selectedActivity.details ||'',
                    start: selectedActivity && selectedActivity.start && moment(selectedActivity.start).toDate() || (eventStart && moment().add(remainder, 'minutes').set({ years: eventStartObj.years, months: eventStartObj.months, date: eventStartObj.date }).toDate()) || '',
                    end: selectedActivity && selectedActivity.end && moment(selectedActivity.end).toDate() || (eventEnd && moment().add(remainder, 'minutes').add(timeDifference, 'minutes').set({ years: eventEndObj.years, months: eventEndObj.months, date: eventEndObj.date }).toDate()) || '',
                    supervisors: selectedActivity && selectedActivity.supervisors || [],
                    participationLevel: selectedActivity && selectedActivity.participationLevel ||'',
                    activityType: selectedActivity && selectedActivity.activityTypeId || '',
                    location: selectedActivity && selectedActivity.location || '',
                }}
                validationSchema={Yup.object().shape({
                    activityName: Yup.string().required('You need to enter a name for the activity'),
                    start: Yup.date().required('You need to enter when you have started working on this activity'),
                    activityType: Yup.string().required('You need to choose the activity type'),
                    participationLevel: Yup.string().required('You need to select a participation level'),
                    end: Yup.date().required('You need to enter when you have finished with this activity')
                            .when('start', (start, schema) => schema.min(start, ({min}) => `Ending time must be greater than the activity starting time (${moment(min).format('LLLL')})`)),
                            
                })}
                onSubmit={async ({ activityName, details, start, end, supervisors, activityType, participationLevel, location }, { setStatus, setSubmitting }) => {
                    setStatus();
                    setSubmitting(true);
                    
                    try {
                        if(selectedActivity) {
                            const activity = {
                                activityId: selectedActivity.activityId,
                                name: activityName,
                                start: start,      
                                end: end,      
                                activityTypeId: activityType,
                                location: location,
                                details: details,
                                participationLevel: participationLevel,
                                supervisors: supervisors
                            };

                            await activityService.updateLogActivity(activity);
                            alert(`You have successfully updated the logged activity!`);
                        }
                        else {
                            const activity = {
                                programId: currentUser && currentUser.user && currentUser.user.programId || null, 
                                name: activityName,
                                start: start,      
                                end: end,      
                                activityTypeId: activityType,
                                location: location,
                                details: details,
                                participationLevel: participationLevel,
                                supervisors: supervisors
                            };

                            await activityService.logActivity(activity);
                            alert(`You have successfully logged an activity!`);
                        }

                        toggle();
                        if(onSuccess) {
                            onSuccess();
                        }
                    }
                    catch(error) {
                        console.log(error);
                        setStatus(error);  
                        alert(`We're sorry but something went wrong while trying to assign the activity.`);
                    }
                    
                    setSubmitting(false); 
                }}
            >
                {formikProps => {
                    return (
                    <React.Fragment>
                        <Form onSubmit={formikProps.handleSubmit}>
                        <ModalHeader tag="h6" toggle={toggle}>{selectedActivity && "Edit logged activity" || "Log an activity"}</ModalHeader>
                        <ModalBody>

                        <Row>
                            <Col lg={ 12 }>
                                <Card className="mb-3">
                                    <CardBody>
                                        { /* START Form */}
                                        
                                            { /* START Input */}
            
                                            <FormGroup row>
                                                <Label for="name" sm={3}>
                                                    Activity name
                                                </Label>
                                                <Col sm={9}>
                                                    <Field 
                                                        type="text" 
                                                        name="activityName" 
                                                        id="activityName" 
                                                        className={'bg-white form-control' + (formikProps.errors.activityName && formikProps.touched.activityName ? ' is-invalid' : '')} 
                                                        placeholder="Activity name..." 
                                                    />
                                                    <ErrorMessage name="activityName" component="div" className="invalid-feedback" />
                                                </Col>                                                    
                                            </FormGroup>
                                            <FormGroup row>
                                                <Label for="start" sm={3}>
                                                    From
                                                </Label>
                                                <Col sm={9}>
                                                    <DatePicker
                                                        customInput={ <AddonInput /> }
                                                        dateFormat="dd/MM/yyyy h:mm aa"
                                                        showTimeSelect
                                                        showMonthDropdown
                                                        autoComplete="off"
                                                        showYearDropdown
                                                        name="start"
                                                        id="start"
                                                        className={(formikProps.errors.start && formikProps.touched.start ? ' is-invalid' : '')}
                                                        selected={formikProps.values.start}
                                                        onChange={e => {
                                                            formikProps.setFieldValue('start', e);
                                                            formikProps.setFieldValue('end', moment(e).add(timeDifference, 'minutes').toDate());
                                                        }}
                                                    />
                                                    {formikProps.errors.start && formikProps.touched.start && <InvalidFeedback>{formikProps.errors.start}</InvalidFeedback>}                                  
                                                </Col>
                                            </FormGroup>
                                            <FormGroup row>
                                                <Label for="end" sm={3}>
                                                    To
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
                                                        onChange={e => {
                                                            formikProps.setFieldValue('end', e);
                                                            const calculatedTimeDifference = moment.duration(moment(e).diff(moment(formikProps.values.start))).asMinutes();
                                                            setTimeDifference(calculatedTimeDifference)
                                                        }}
                                                        />  
                                                    {formikProps.errors.end && formikProps.touched.end && <InvalidFeedback>{formikProps.errors.end}</InvalidFeedback>}                                                             
                                                </Col>
                                            </FormGroup>
                                            <FormGroup row>
                                                <Label for="location" sm={3}>
                                                    Location
                                                </Label>
                                                <Col sm={9}>
                                                    <Field 
                                                        type="text" 
                                                        name="location" 
                                                        id="location" 
                                                        className={'bg-white form-control' + (formikProps.errors.location && formikProps.touched.location ? ' is-invalid' : '')} 
                                                        placeholder="Location..." 
                                                    /> 
                                                    <ErrorMessage name="location" component="div" className="invalid-feedback" />                                                           
                                                </Col>
                                            </FormGroup>
                                            <FormGroup row>
                                                <Label for="supervisors" sm={3}>
                                                    Supervisor
                                                </Label>
                                                <Col sm={9}>
                                                        <Typeahead
                                                            clearButton
                                                            id="supervisors"
                                                            labelKey="name"
                                                            options={supervisors}
                                                            selected={selectedActivity && selectedActivity.supervisors || []}
                                                            className={(formikProps.errors.supervisor && formikProps.touched.supervisor ? ' is-invalid' : '')}
                                                            placeholder="Select a supervisor..."
                                                            onChange={(selectedOptions) =>  formikProps.setFieldValue('supervisors', selectedOptions)}
                                                            onInputChange={(selectedOptions) =>  formikProps.setFieldValue('supervisors', selectedOptions)}
                                                        />
                                                    
                                                        <ErrorMessage name="supervisors" component="div" className="invalid-feedback" />
                                                </Col>                                                    
                                            </FormGroup>
                                            <FormGroup row>
                                                <Label for="activityType" sm={3}>
                                                    Activity type
                                                </Label>
                                                <Col sm={9}>
                                                    <Field 
                                                        component="select" 
                                                        name="activityType" 
                                                        id="activityType" 
                                                        className={'bg-white form-control' + (formikProps.errors.activityType && formikProps.touched.activityType ? ' is-invalid' : '')} 
                                                        placeholder="Activity type..." 
                                                    >
                                                        <option key={9999} value="">Activity type...</option>
                                                        {activityTypes.map(at => {
                                                            //console.log("Map each at:", at)
                                                            return (
                                                            <option key={at.activityTypeId} value={at.activityTypeId}>{at.activityTypeName}</option>
                                                            );
                                                        })} 
                                                    </Field> 
                                                    <ErrorMessage name="activityType" component="div" className="invalid-feedback" />                                                           
                                                </Col>
                                            </FormGroup>
                                            <FormGroup row>
                                                <Label for="participationLevel" sm={3}>
                                                    Participation level
                                                </Label>
                                                <Col sm={9}>
                                                    <Field 
                                                        component="select" 
                                                        name="participationLevel" 
                                                        id="participationLevel" 
                                                        className={'bg-white form-control' + (formikProps.errors.participationLevel && formikProps.touched.participationLevel ? ' is-invalid' : '')} 
                                                        placeholder="Participation level..." 
                                                    >
                                                        <option key={8959} value="">Participation Level...</option>
                                                        {participationLevels.map(at => {
                                                            //console.log("Map each at:", at)
                                                            return (
                                                            <option key={at.participationLevel} value={at.participationLevel}>{at.type}</option>
                                                            );
                                                        })} 
                                                    </Field> 
                                                    <ErrorMessage name="participationLevel" component="div" className="invalid-feedback" />                                                           
                                                </Col>
                                            </FormGroup>
                                            <FormGroup row>
                                                <Label for="details" sm={3}>
                                                    Details
                                                </Label>
                                                <Col sm={9}>
                                                    <Field component="textarea"
                                                        name="details" 
                                                        id="details" 
                                                        className={'bg-white form-control' + (formikProps.errors.details && formikProps.touched.details ? ' is-invalid' : '')} 
                                                        placeholder="Enter activity details..." 
                                                    />
                                                    <ErrorMessage name="details" component="div" className="invalid-feedback" />
                                                </Col>                                                    
                                            </FormGroup>
                                            {selectedActivity && (
                                                <FormGroup row>
                                                    <Label for="createdBy" sm={3}>
                                                        Created by
                                                    </Label>
                                                    <Col sm={9}>
                                                        <Label  className="col-form-label">
                                                            <strong>{`${selectedActivity.loggedByFirstName} ${selectedActivity.loggedByLastName}`} 
                                                            {currentUser && currentUser.user && selectedActivity.loggedBy == currentUser.user.employeeId && " (You)"}</strong>
                                                        </Label>
                                                        
                                                    </Col>                                                    
                                                </FormGroup>
                                            )}

                                  
                                        { /* END Form */}
                                    </CardBody>
                                </Card>                  
                            </Col>                
                        </Row>
                        </ModalBody>
                        <ModalFooter>
                            {!selectedActivity && (
                                <>
                                    <ThemedButton type="submit">Log Activity</ThemedButton>{' '}
                                </>
                            )}
                            {(selectedActivity && selectedActivity.loggedBy == currentUser.user.employeeId)  && (
                                <>
                                    <ThemedButton type="submit">Update activity</ThemedButton>{' '}
                                    <Button type="button" color="danger" onClick={() => updateActivityStatus(3)}>Delete</Button>{' '}
                                </>
                            )}
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
