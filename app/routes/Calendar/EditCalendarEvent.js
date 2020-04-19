import React from 'react';
import { useIntl } from "react-intl";
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
    Input,
    InputGroup,
    InputGroupAddon,
    InvalidFeedback
  } from "@/components";

import DatePicker, { setDefaultLocale } from 'react-datepicker';
import moment from 'moment';
import {AddonInput} from '@/routes/Forms/DatePicker/components';
import {calendarService} from '@/services';
import { useAppState, AppStateContext } from '@/components/AppState';


export const EditCalendarEvent = ({toggle, isOpen, selectedEvent, onSuccess}) => {
    const intl = useIntl();

    const [{currentUser}, dispatch] = useAppState();
    const setEventStatus = async (status) => {
        try {
            await calendarService.updateStatus(selectedEvent.eventId, status);
            alert("You have successfully updated the status of the event!");
            onSuccess();
        }
        catch(error) {
            alert("Error occured while updating the status of the event!");
        }
        
        toggle();
    }

    return selectedEvent && (
        <Modal toggle={toggle} isOpen={isOpen} className="modal-outline-primary">
            <React.Fragment>
                <ModalHeader tag="h6">
                    {selectedEvent.title}
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
                                        {intl.formatMessage({ id: 'General.Title'})}
                                        </Label>
                                        <Col sm={9}>
                                            <strong>{selectedEvent.title}</strong>
                                           
                                        </Col>                                                    
                                    </FormGroup>
                                    <FormGroup row>
                                        <Label for="title" sm={3}>
                                            {intl.formatMessage({ id: 'General.Status'})}
                                        </Label>
                                        <Col sm={9}>
                                            <strong style={{color: 
                                            selectedEvent.status == "Accepted" && 'green!important' &&
                                            selectedEvent.status == "Declined" && 'red!important' || 'gray'
                                        }}>{selectedEvent.status}</strong>
                                        </Col>                                                    
                                    </FormGroup>
                                    {selectedEvent.referencedEmployee && (
                                         <FormGroup row>
                                         <Label for="title" sm={3}>
                                             Employee
                                         </Label>
                                         <Col sm={9}>
                                             <strong>{`${selectedEvent.referencedEmployee.name} ${selectedEvent.referencedEmployee.surname}`}</strong>
                                         </Col>                                                    
                                     </FormGroup>
                                    )}
                                    <FormGroup row>
                                        <Label for="title" sm={3}>
                                            Agenda
                                        </Label>
                                        <Col sm={9}>
                                            <strong>{selectedEvent.description || "-"}</strong>
                                        </Col>                                                    
                                    </FormGroup>

                                    <FormGroup row>
                                        <Label for="start" sm={3}>
                                            Starting at
                                        </Label>
                                        <Col sm={9}>                                        
                                            <DatePicker
                                                disabled
                                                customInput={ <AddonInput /> }
                                                autoComplete="off"
                                                dateFormat="dd/MM/yyyy h:mm aa"
                                                showMonthDropdown
                                                showYearDropdown
                                                name="start"
                                                id="start"
                                                selected={moment(selectedEvent.start).toDate('LLLL')}
                                            />                                                            
                                        </Col>
                                    </FormGroup>

                                    <FormGroup row>
                                        <Label for="end" sm={3}>
                                            Ending at
                                        </Label>
                                        <Col sm={9}>
                                            <DatePicker
                                                disabled
                                                customInput={ <AddonInput /> }
                                                dateFormat="dd/MM/yyyy h:mm aa"
                                                showMonthDropdown
                                                autoComplete="off"
                                                showYearDropdown
                                                name="end"
                                                id="end"
                                                selected={moment(selectedEvent.end).toDate('LLLL')}
                                                />  
                                                                                                   
                                        </Col>
                                    </FormGroup>
                                { /* END Form */}
                            </CardBody>
                        </Card>                  
                    </Col>                
                </Row>
                </ModalBody>
                <ModalFooter>
                    {selectedEvent && selectedEvent.referencedEmployee && selectedEvent.referencedEmployee.employee_id == currentUser.user.employeeId && (
                        <>
                        <Button type="button" color="success" onClick={() => setEventStatus('Accepted')}>Accept</Button>{' '}
                        <Button type="button" color="danger" onClick={() => setEventStatus('Declined')}>Decline</Button>{' '}
                        </>
                    )}
                    <Button type="button" onClick={toggle} color="light">Close</Button>
                </ModalFooter>
          
        </React.Fragment>
        </Modal>
    ) || null
}
