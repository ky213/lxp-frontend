import React from 'react'
import moment from 'moment'
import { hot } from 'react-hot-loader'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { Typeahead } from 'react-bootstrap-typeahead'

import {
  Card,
  CardBody,
  CardColumns,
  Col,
  Container,
  Row,
  Form,
  FormGroup,
} from '@/components'
import { useAppState } from '@/components/AppState'
import { TinCanLaunch } from '@/helpers'
import { HeaderMain } from '@/routes/components/HeaderMain'
import { Profile } from '@/routes/components/Profile'
import { CourseCard } from '@/routes/Courses/components/CourseCard'
import { userService, programService } from '@/services'
import { Responsive } from 'responsive-react'
import { Role } from '@/helpers'

const TodayEventHeader = styled.div`
  padding: 1rem;
  background: ${props => props.bgColor || '#FFF'};
  color: #404e73;
  align-items: center;
`

const TodayEvent = styled.div`
  padding: 1rem;
  background: ${props => props.bgColor || '#EFF0F4'};
  color: #404e73;
  align-items: center;
`

const UpcomingEventHeader = styled.div`
  padding: 0.5rem 1rem;
  border-bottom: 2px solid ${props => props.borderColor || '#38456C'};
  color: #404e73;
`

const UpcomingEvent = styled.div`
  padding: 1rem;
  padding-right: 0;
  border-bottom: 1px solid ${props => props.borderColor || '#D4D7DF'};
  color: #404e73;
  align-items: center;
`

const UpcomingBadge = styled.span`
  background: ${props => props.borderColor || '#F66E60'};
  padding: 0.5rem;
  border-radius: 0.15rem;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: #f4f4f4;
  display: inline-block;
  white-space: nowrap;
  font-size: 0.8rem;
  font-weight: bold;
`
const EventStatusIcon = styled.i`
  height: 10px;
  width: 10px;
  display: inline-block;
  border-radius: 50%;
  background: ${props => props.color || '#096BF2'};
`

const LearnerHome = () => {
  const [{ currentUser }] = useAppState()
  const user = currentUser && currentUser.user
  const [todayEvents, setTodayEvents] = React.useState(null)
  const [upcomingEvents, setUpcomingEvents] = React.useState(null)
  const [joinedCourses, setJoinedCourses] = React.useState([])
  const [programs, setPrograms] = React.useState([])
  const isLearner = user.role === Role.Learner

  React.useEffect(() => {
    getJoinedCourses()

    programService
      .getByCurrentUser(user.organizationId)
      .then(data => {
        setPrograms(data)
      })
      .catch(error => {
        console.log('Error:::', error)
        toast.error(
          <div>
            <h4 className="text-danger">Error</h4>
            <p>{JSON.stringify(error)}</p>
          </div>
        )
      })
  }, [])

  const getJoinedCourses = () => {
    userService
      .getByEmployeeId(user.employeeId)
      .then(employee => setJoinedCourses(employee.joinedCourses))
      .catch(error => {
        toast.error(
          <div>
            <h4 className="text-danger">Error</h4>
            <p>{JSON.stringify(error)}</p>
          </div>
        )
      })
  }

  const handleLaunch = course => {
    TinCanLaunch.launchContent(user, course?.programId, course, launchLink => {
      window.open(launchLink)
    })
  }

  const filterCourses = programsList => {
    const programId = programsList[0]?.programId

    if (programsList.length > 0)
      setJoinedCourses(
        joinedCourses.filter(course => course.programId === programId)
      )
    else getJoinedCourses()
  }

  return (
    (user && (
      <React.Fragment>
        <Container className="learners-home">
          <Row className="flex-column">
            <Responsive displayIn={['laptop']}>
              <HeaderMain title={`Hello, ${user.fullName}`} className=" mt-4" />
            </Responsive>
            <Responsive displayIn={['mobile']}>
              <h5 className="mb-4 mt-4">{`Hello, ${user.fullName}`}</h5>
            </Responsive>
            <br />
            <HeaderMain title="My Courses" className="my-4" />
            <Row className="mb-4">
              <Col className="col-3">
                <Typeahead
                  clearButton
                  id="programs"
                  labelKey="name"
                  options={programs}
                  placeholder="Program..."
                  onChange={filterCourses}
                />
              </Col>
            </Row>
            <CardColumns>
              {joinedCourses
                .sort((a, b) => a.name < b.name)
                .map(course => (
                  <CourseCard
                    key={course.courseId}
                    course={course}
                    onLaunch={handleLaunch}
                    joinedCourses={joinedCourses.map(
                      ({ courseId }) => courseId
                    )}
                    isLearner={isLearner}
                  />
                ))}
            </CardColumns>
          </Row>
          <br />
          <Row>
            <Col lg={4}>
              {todayEvents && (
                <div className="mt-4">
                  <TodayEventHeader className="d-flex">
                    <Col sm={6} className="pl-0">
                      <span
                        className="text-left pl-0"
                        style={{ fontWeight: 600 }}
                      >
                        Today
                      </span>
                    </Col>
                    <Col sm={6} className="pr-0">
                      <span className="text-right" style={{ color: '#A7AEBE' }}>
                        {moment().format('LL')}
                      </span>
                    </Col>
                  </TodayEventHeader>
                  {todayEvents.map((te, i) => {
                    return (
                      <TodayEvent bgColor={i % 2 != 0 ? '#FBFBFC' : '#EFF0F4'}>
                        <p className="mb-0">
                          <EventStatusIcon
                            className="mr-1"
                            color={
                              (te.priority == 1 && '#CC74F3') ||
                              (te.priority == 3 && '#1eb7ff') ||
                              '#78CB7B'
                            }
                          />{' '}
                          {te.name}
                        </p>
                        <p className="mb-0">
                          <small>{`${moment(te.start).format('LT')} ${
                            (te.end && '- ' + moment(te.end).format('LT')) || ''
                          }`}</small>
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
                  {upcomingEvents.map((te, i) => {
                    return (
                      <UpcomingEvent className="d-flex">
                        <Col sm={8} className="pl-0">
                          <p className="mb-0">
                            <EventStatusIcon
                              className="mr-1"
                              color={
                                (te.priority == 1 && '#CC74F3') ||
                                (te.priority == 3 && '#1eb7ff') ||
                                '#78CB7B'
                              }
                            />{' '}
                            {te.name}
                          </p>
                          <p className="mb-0">
                            <small>{`${moment(te.start).format('LL')} ${
                              (te.end &&
                                !moment(te.end)
                                  .clone()
                                  .startOf('day')
                                  .isSame(
                                    moment(te.start).clone().startOf('day')
                                  ) &&
                                '- ' + moment(te.end).format('LL')) ||
                              ''
                            }`}</small>
                          </p>
                          <p className="mb-0">
                            <small>{`${moment(te.start).format('LT')} ${
                              (te.end && '- ' + moment(te.end).format('LT')) ||
                              ''
                            }`}</small>
                          </p>
                        </Col>
                        <Col className="pr-0">
                          {moment(te.start).clone().diff(moment(), 'days') <
                            5 && (
                            <UpcomingBadge>
                              {`In ${moment(te.start)
                                .clone()
                                .diff(moment(), 'days')} days`}
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
                  <span className="mr-2">
                    <EventStatusIcon color="#78CB7B" /> Personal
                  </span>
                  <span className="mr-2">
                    <EventStatusIcon color="#CC74F3" /> Program-wide
                  </span>
                </div>
              )}
            </Col>
          </Row>
          {/* END Content */}
        </Container>
      </React.Fragment>
    )) ||
    null
  )
}

export default hot(module)(LearnerHome)
