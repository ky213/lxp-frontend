import React from 'react';

import { 
    Container,
    Row,
    Col
} from '@/components';
import { HeaderMain } from "@/routes/components/HeaderMain";

import { useAppState } from '@/components/AppState';
import styled from "styled-components";
import { activityService } from "@/services";
import moment from "moment";
import Loading from '@/components/Loading';
import {
    Responsive, 
    isMobileDevice, 
    isTabletDevice,
    isLaptopDevice,
    isBiggerThanLaptop
  } from "responsive-react";

const TodayEventHeader = styled.div`
    padding: 1rem;
    background: ${props => props.bgColor || '#FFF'};
    color: #404E73;
    align-items: center;
`;

const TodayEvent = styled.div`
    padding: 1rem;
    background: ${props => props.bgColor || '#EFF0F4'};
    color: #404E73;
    align-items: center;
`;

const UpcomingEventHeader = styled.div`
    padding: 0.5rem 1rem;
    border-bottom: 2px solid ${props => props.borderColor || '#38456C'};
    color: #404E73;
`;

const UpcomingEvent = styled.div`
    padding: 1rem;
    padding-right:0;
    border-bottom: 1px solid ${props => props.borderColor || '#D4D7DF'};
    color: #404E73;
    align-items: center;
`;

const UpcomingBadge = styled.span`
    background: ${props => props.borderColor || '#F66E60'};
    padding:0.5rem;
    border-radius:0.15rem;
    letter-spacing: 1px;
    text-transform: uppercase;
    color:#f4f4f4;
    display:inline-block;
    white-space:nowrap;
    font-size:0.8rem;
    font-weight:bold;
`;
const EventStatusIcon = styled.i`
    height:10px;
    width:10px;
    display:inline-block;
    border-radius:50%;
    background: ${props => props.color || '#096BF2'};
`;

const LearnerHome = () => {
    const [{currentUser, selectedOrganization}, dispatch] = useAppState();
    const user = currentUser && currentUser.user;
    const [todayEvents, setTodayEvents] = React.useState(null);
    const [upcomingEvents, setUpcomingEvents] = React.useState(null);

    React.useEffect(() => {
        fetchData();
    }, [])
    
    return user && (<React.Fragment>
        <Container className="learners-home">
            <Responsive displayIn={["laptop"]}>
            <HeaderMain 
                title={`Hello, ${user.fullName}`}
                className="mb-5 mt-4"
            />
            </Responsive>
            <Responsive displayIn={["mobile"]}>
                <h5 className="mb-4 mt-4">{`Hello, ${user.fullName}`}</h5>
            </Responsive>

            { /* START Content */}
            <Row>
                <Col lg={ 4 }>
                    {todayEvents && (
                        <div className="mt-4">
                            <TodayEventHeader className="d-flex">
                               
                                <Col sm={6} className="pl-0">
                                    <span className="text-left pl-0" style={{fontWeight:600}}>Today</span>
                                </Col>
                                <Col sm={6} className="pr-0">
                                    <span className="text-right"  style={{color:'#A7AEBE'}}>{moment().format('LL')}</span>
                                </Col>
                             
                            </TodayEventHeader>
                            {
                                todayEvents.map((te, i) => {
                                
                                return (
                                    <TodayEvent bgColor={i % 2 != 0 ? '#FBFBFC': '#EFF0F4'}>
                                        <p className='mb-0'>
                                            <EventStatusIcon className="mr-1" color={te.priority == 1 && '#CC74F3' || te.priority == 3 && '#1eb7ff' || '#78CB7B' } /> {te.name}
                                        </p>
                                        <p className='mb-0'>
                                            <small>{`${moment(te.start).format('LT')} ${te.end && "- " + moment(te.end).format('LT') || ''}`}</small>
                                        </p>
                                    </TodayEvent>
                                )
                            })}
                        </div>
                    )}

                    {upcomingEvents && (
                        <>
                            <UpcomingEventHeader className="mt-4">
                                Upcoming Events
                            </UpcomingEventHeader>
                            {
                                upcomingEvents.map((te, i) => {
                                
                                return (
                                    <UpcomingEvent className="d-flex">
                                        <Col sm={8} className="pl-0">
                                        <p className='mb-0'><EventStatusIcon className="mr-1" color={te.priority == 1 && '#CC74F3' || te.priority == 3 && '#1eb7ff' || '#78CB7B' } /> {te.name}</p>
                                        <p className='mb-0'><small>{`${moment(te.start).format('LL')} ${te.end && !(moment(te.end).clone().startOf('day').isSame(moment(te.start).clone().startOf('day'))) && "- " + moment(te.end).format('LL') || ''}`}</small></p>
                                        <p className='mb-0'><small>{`${moment(te.start).format('LT')} ${te.end && "- " + moment(te.end).format('LT') || ''}`}</small></p>
                                        </Col>
                                        <Col className="pr-0">
                                            {moment(te.start).clone().diff(moment(), 'days') < 5 && (
                                                <UpcomingBadge>
                                                    {`In ${moment(te.start).clone().diff(moment(), 'days')} days`}
                                                </UpcomingBadge>
                                            )}
                                        </Col>
                                    </UpcomingEvent>
                                )
                            })}
                        </>
                    )}
                    {(todayEvents || upcomingEvents) && (
                        <div className="mt-4 text-left small">
                            <span className="mr-2"><EventStatusIcon color='#78CB7B' /> Personal</span>
                            <span className="mr-2"><EventStatusIcon color='#CC74F3' /> Program-wide</span>                            
                        </div>
                    )}
                   
                </Col>               
            </Row>
            { /* END Content */}
        </Container>
    </React.Fragment>
    ) || null;
}

export default LearnerHome;