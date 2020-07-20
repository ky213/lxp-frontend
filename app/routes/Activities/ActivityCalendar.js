import React from 'react';
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';

import {
    Container,
    Row,
    Col
} from '@/components';

import { HeaderMain } from "@/routes/components/HeaderMain";
import { HeaderDemo } from "@/routes/components/HeaderDemo";
import { activityService, programService } from "@/services";
import { AssignActivity } from "./AssignActivity";
import { EditActivity } from "./EditActivity";
import { LogActivity } from "./LogActivity";
import { useAppState } from '@/components/AppState';
import { Role } from '@/helpers';
import { Loading } from "@/components";
import {
    Responsive,
    isMobileDevice, 
    isTabletDevice,
    isLaptopDevice,
    isBiggerThanLaptop
  } from "responsive-react";

import MobileToolbar from '@/components/Calendar/MobileToolbar';
import CustomCalendarToolbar from './components/CustomCalendarToolbar'
//const Calendar = BigCalendar
const localizer = momentLocalizer(moment);


export const ActivityCalendar = (props) => {
    const [{currentUser, selectedOrganization}, dispatch] = useAppState();
    const currentUserRole = currentUser && currentUser.user && currentUser.user.role;
    //const currentProgramId = currentUser && currentUser.user && currentUser.user.programId;

    const [events, setEvents] = React.useState(null);
    const [eventStart, setEventStart] = React.useState(null);
    const [eventEnd, setEventEnd] = React.useState(null);
    const [meetingsModal, setMeetingsModal] = React.useState(false);
    const [showLogActivityModal, setShowLogActivityModal] = React.useState(false);
    const [showEditEventModal, setShowEditEventModal] = React.useState(false);
    const [selectedActivity, setSelectedActivity] = React.useState(null);
    const [selectedLogActivity, setSelectedLogActivity] = React.useState(null);
    const [calendarView, setCalendarView] = React.useState('month');
    const [calendarDate, setCalendarDate] = React.useState(new Date());
    const [userPrograms, setUserPrograms] = React.useState(null);
    const [currentProgramId, setCurrentProgramId] = React.useState(currentUser && currentUser.user && currentUser.user.programId || null);

    React.useEffect(() => {
        try {
            const fetchData = async () => {
                const programs = await programService.getByCurrentUser(selectedOrganization.organizationId);
                setUserPrograms(programs);
                if(programs && programs.length == 1) {
                    setCurrentProgramId(programs[0].programId);
                }
            }

            fetchData();
        }
        catch(error) {
            console.log("Error while fetching programs:", error)
        }
    },[])

    const getActivities = async () => {
        const currentDate =  moment(calendarDate);
        let dateFrom = null;
		let dateTo = null;

		switch(calendarView) {
			case 'day':
            dateFrom = currentDate.clone();
			dateTo = currentDate.clone();
			break;

			case 'week':
			dateFrom = currentDate.clone().startOf('week');
			dateTo = currentDate.clone().endOf('week');
			break;

			case 'month':
			dateFrom = currentDate.clone().startOf('month').startOf('week');
			dateTo = currentDate.clone().endOf('month').endOf('week');
			break;
		}
        
        const activities = await activityService.getAll(currentProgramId, dateFrom.format('DDMMYYYY'), dateTo && dateTo.format('DDMMYYYY') || dateFrom.format('DDMMYYYY'), selectedOrganization.organizationId);
        //console.log("Got activities: ", activities);

        const calendarEvents = activities.map(ev => {
            if(ev.status != 3) {
                return {
                    id: ev.activityId,
                    title: ev.name,
                    start: new Date(ev.start),
                    end: new Date(ev.end),
                    desc: ev.description,
                    status: ev.status,
                    source: ev.source,
                    priority: ev.priority
                }
            }
        });

        console.log("Got calendar events from activities: ", calendarEvents);
        setEvents(calendarEvents);
    }



    React.useEffect(() => {
        getActivities();
    }, [calendarView, calendarDate, currentProgramId]);

    React.useEffect(() => {
        if(!showLogActivityModal) {
            setSelectedLogActivity(null)
        }
    }, [showLogActivityModal])

    React.useEffect(() => {
        if(!showEditEventModal) {
            setSelectedActivity(null)
        }
    }, [showEditEventModal])

    const onCreatedEvent = async () => {
        setSelectedActivity(null);
        setSelectedLogActivity(null);
        await getActivities();
    }

    const onEditedEvent = async () => {
        setSelectedActivity(null);
        setSelectedLogActivity(null);
        await getActivities();
    }

    const newEvent = (event) => {
        const start = moment(event.start).clone().toDate() || null;
        const end = moment(event.end).clone().toDate() || null;
        setEventStart(start);
        setEventEnd(end);

        const today = moment().startOf('day');

        if(currentUserRole == Role.Learner) {
            toggleLogActivityModal();
        }
        else {
            if(moment(start).clone().startOf('day').isBefore(today) || moment(end).clone().startOf('day').isBefore(today)) {
                alert(`You cannot assign an activity in the past!`);
                return;
            }

            toggleMeetingsModal();
        }
    };

    const toggleMeetingsModal = () => {
        setMeetingsModal(!meetingsModal);
    }

    const toggleLogActivityModal = () => {
        setShowLogActivityModal(!showLogActivityModal);
        
    }

    const toggleEditEventModal = () => {
        setShowEditEventModal(!showEditEventModal);
    }
    
    const showEvent = async (event) => {
        console.log("Show event:", event)
        if(event.source == "assigned") {
            const eventDetails = await activityService.getById(event.id, selectedOrganization.organizationId);
            console.log("Clicked on show event:", eventDetails)
            /*
            if(eventDetails.repeat) {
                eventDetails.start = event.start;
                eventDetails.end = event.end;
            }
            */
            //eventDetails.start = moment(moment(event.start).format('DDMMYYYY') + ' ' + moment(eventDetails.start).format('HH:mm'), 'DDMMYYYY HH:mm').toDate();
            //eventDetails.end = moment(moment(event.end).format('DDMMYYYY') + ' ' + moment(eventDetails.end).format('HH:mm'), 'DDMMYYYY HH:mm').toDate();
            setSelectedActivity(eventDetails);
            toggleEditEventModal();
        }
        else {
            const eventDetails = await activityService.getLogActivityById(event.id, selectedOrganization.organizationId);
            console.log("Got activity:", eventDetails)
            setSelectedLogActivity(eventDetails);
            toggleLogActivityModal();
        }
    }

    const handleCalendarChangeView = (view) => {		
        console.log("Calendar change view:", view)
        setCalendarView(view);
	}

	const handleCalendarNavigate = (date, view) => {
        console.log("Calendar navigate:", date, view)
        setCalendarDate(date);
	}
  

    return (
        <Container>
            {props && !props.hideHeading && (
                <div className="activities__title">
                    <Responsive displayIn={["laptop"]}>
                        <HeaderMain 
                            title="Activities"
                            className="mb-4 mt-4"
                        />
                    </Responsive>
                </div>
            )}
            <Row>
                <Col lg={ 12 }>
                    {events && (
                        <BigCalendar
                        style={{
                            minHeight: '600px'
                        }}
                        selectable
                        localizer={localizer}
                        events={events}
                        
                        components={{
                            toolbar: (props) => (<CustomCalendarToolbar {...props} onAddNew={() => newEvent({start:moment().toDate(), end: moment().add(30, 'minutes').toDate()})} />)
                        }}
                        
                        onNavigate={(date, view) => handleCalendarNavigate(date, view)}
                        onView={view => handleCalendarChangeView(view)}
                        eventPropGetter={(event, start, end, isSelected) => {
                            return {
                                className: `${event && event.status && event.status.toLowerCase()} ${event && event.priority && "priority-" + event.priority}` || "",
                                style: {}
                            };
                        }}
                        onSelectSlot={newEvent}
                  
                        onSelectEvent={showEvent}
                        defaultView={calendarView}
                        defaultDate={new Date()}
                        />
                    ) || <Loading />
                    }
                    
                </Col>
            </Row>
            <AssignActivity 
                toggle={toggleMeetingsModal} 
                selectedLearner={null}
                isOpen={meetingsModal}
                eventStart={eventStart}
                eventEnd={eventEnd} 
                userPrograms={userPrograms}
                currentProgramId={currentProgramId}
                onSuccess={onCreatedEvent}
            />
            <LogActivity 
                toggle={toggleLogActivityModal} 
                isOpen={showLogActivityModal}
                eventStart={eventStart}
                eventEnd={eventEnd} 
                onSuccess={onCreatedEvent}
                selectedActivity={selectedLogActivity}
            />
           <EditActivity 
                toggle={toggleEditEventModal} 
                selectedActivity={selectedActivity}
                userPrograms={userPrograms}
                isOpen={showEditEventModal}
                onSuccess={onEditedEvent}
            />
        </Container>
    );
    
}
