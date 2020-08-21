import React from 'react';
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';

import { Container, Row, Col } from '@/components';

import { HeaderMain } from '@/routes/components/HeaderMain';
import { HeaderDemo } from '@/routes/components/HeaderDemo';
import { calendarService } from '@/services';
import { AddCalendarEvent } from './AddCalendarEvent';
import { EditCalendarEvent } from './EditCalendarEvent';

//const Calendar = BigCalendar
const localizer = momentLocalizer(moment);

export const Calendar = (props) => {
  const [events, setEvents] = React.useState([]);
  const [eventStart, setEventStart] = React.useState(null);
  const [eventEnd, setEventEnd] = React.useState(null);
  const [meetingsModal, setMeetingsModal] = React.useState(false);
  const [showEditEventModal, setShowEditEventModal] = React.useState(false);
  const [selectedEvent, setSelectedEvent] = React.useState(null);

  const getCalendarEvents = async (dateFrom, dateTo) => {
    const events = await calendarService.getAll();

    const calendarEvents = events.map((ev) => {
      return {
        id: ev.eventId,
        title: ev.title,
        start: moment(ev.start).toDate(),
        end: moment(ev.end).toDate(),
        desc: ev.description,
        //referencesEmployeeId: ev.referencesEmployeeId,
        status: ev.status,
      };
    });
    setEvents(calendarEvents);
  };

  React.useEffect(() => {
    getCalendarEvents();
  }, []);

  const onCreatedEvent = async () => {
    await getCalendarEvents();
  };

  const onEditedEvent = async () => {
    await getCalendarEvents();
  };

  const newEvent = (event) => {
    if (
      moment(event.start)
        .clone()
        .startOf('day')
        .isSameOrAfter(moment().startOf('day'))
    ) {
      const start = moment(event.start).clone().toDate() || null;
      const end = moment(event.end).clone().toDate() || null;
      toggleMeetingsModal();
      setEventStart(start);
      setEventEnd(end);
    }
  };

  const toggleMeetingsModal = () => {
    setMeetingsModal(!meetingsModal);
  };

  const toggleEditEventModal = () => {
    setShowEditEventModal(!showEditEventModal);
  };

  const showEvent = async (event) => {
    const eventDetails = await calendarService.getById(event.id);
    setSelectedEvent(eventDetails);
    toggleEditEventModal();
  };

  return (
    <Container>
      {props && !props.hideHeading && (
        <>
          <HeaderMain title="Calendar" className="mb-5 mt-4" />
          <Row>
            <Col lg={12}>
              <HeaderDemo
                no={1}
                title="Meetings"
                subTitle="You can view your meetings schedule from here"
              />
            </Col>
          </Row>
        </>
      )}
      <Row>
        <Col lg={12}>
          <BigCalendar
            style={{
              minHeight: '720px',
            }}
            selectable
            localizer={localizer}
            events={events}
            //onEventDrop={this.moveEvent}
            //resizable
            //onEventResize={this.resizeEvent}
            eventPropGetter={(event, start, end, isSelected) => {
              return {
                className:
                  (event && event.status && event.status.toLowerCase()) || '',
                style: {},
              };
            }}
            onSelectSlot={newEvent}
            onSelectEvent={showEvent}
            defaultView={'month'}
            defaultDate={new Date()}
          />
        </Col>
      </Row>
      <AddCalendarEvent
        toggle={toggleMeetingsModal}
        selectedLearner={null}
        isOpen={meetingsModal}
        eventStart={eventStart}
        eventEnd={eventEnd}
        onSuccess={onCreatedEvent}
      />
      <EditCalendarEvent
        toggle={toggleEditEventModal}
        selectedEvent={selectedEvent}
        isOpen={showEditEventModal}
        onSuccess={onEditedEvent}
      />
    </Container>
  );
};
