import React, { useState, useEffect } from 'react';
import { courseService } from '@/services';
import { Container, Row, Col } from '@/components';
import { useAppState } from '@/components/AppState';
import { hot } from 'react-hot-loader';

import { HeaderMain } from '@/routes/components/HeaderMain';
import { HeaderDemo } from '@/routes/components/HeaderDemo';
import CourseSelector from './components/CourseSelector';
import LearnersTable from './components/LearnersTable';
import PieChart from './components/PieChart';

import './DashboardNew.scss';

const DashboardNew = (props) => {
  const [{ selectedOrganization }] = useAppState();
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [experience, setExperience] = useState('');
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const experienceEnum = ['Not started', 'Completed', 'In progress'];
  const statusColors = {
    'Not started': 'btn-notStarted',
    'In progress': 'btn-inProgress',
    Completed: 'btn-completed',
  };

  useEffect(() => {
    if (experience === experienceEnum[0]) fetchNotAttemptedUsersData();
    if (experience === experienceEnum[1]) fetchCompletedUsersData();
    if (experience === experienceEnum[2]) fetchAttemptedUsersData();
  }, [experience, pageNumber, selectedCourse]);

  const fetchAttemptedUsersData = async () => {
    setLoading(true);
    try {
      const data = await courseService.attemptedUsers(
        selectedOrganization.organizationId,
        selectedCourse.programId,
        selectedCourse.courseId,
        (pageNumber - 1) * 10, //offset
        10 // records per page
      );
      setUsers(data);
    } catch (error) {
      console.log('Error while fetching learners:', error);
    }

    setLoading(false);
  };

  const fetchNotAttemptedUsersData = async () => {
    setLoading(true);
    try {
      const data = await courseService.notAttemptedUsers(
        selectedOrganization.organizationId,
        selectedCourse.programId,
        selectedCourse.courseId,
        (pageNumber - 1) * 10, //offset
        10 // records per page
      );
      setUsers(data);
    } catch (error) {
      console.log('Error while fetching learners:', error);
    }

    setLoading(false);
  };

  const fetchCompletedUsersData = async () => {
    setLoading(true);
    try {
      const data = await courseService.completedUsers(
        selectedOrganization.organizationId,
        selectedCourse.programId,
        selectedCourse.courseId,
        (pageNumber - 1) * 10, //offset
        10 // records per page
      );
      setUsers(data);
    } catch (error) {
      console.log('Error while fetching learners:', error);
    }

    // setLoading(false);
  };

  const handleSelectExperience = (course, index) => {
    setSelectedCourse(course);
    setExperience(experienceEnum[index]);
  };

  return (
    <Container className="courses-home">
      <HeaderMain title="Courses" subTitles="" />
      <Row>
        <Col lg={12}>
          <HeaderDemo
            title="View courses"
            subTitle="You can view and take courses from here."
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <CourseSelector onCourseSelect={setSelectedCourses} />
        </Col>
      </Row>
      <Row style={{ minHeight: 200 }} className="py-4">
        {selectedCourses.map((course) => (
          <Col className="text-center" key={course.courseId}>
            <PieChart
              course={course}
              experiences={experienceEnum}
              onSetExperience={handleSelectExperience}
            />
          </Col>
        ))}

        {selectedCourses.length == 0 && (
          <Col className="d-flex align-items-center justify-content-center">
            <h3 className="text-center">Please select some courses...</h3>
          </Col>
        )}
      </Row>
      <Row className="mb-2">
        {experience && selectedCourses.length > 0 && (
          <Col>
            <button className="btn btn-primary mr-2 rounded-pill">
              {selectedCourse.name}
              <span className="badge badge-light ml-2"></span>
            </button>
            <button className={`btn ${statusColors[experience]} rounded-pill`}>
              {experience} <span className="badge badge-light ml-2"></span>
            </button>
          </Col>
        )}
      </Row>
      <Row>
        <Col>
          {experience && (
            <LearnersTable
              users={users.users}
              totalNumberOfRecords={users.numOfUsers}
              course={selectedCourse}
              experience={experience}
              onPagination={setPageNumber}
              pageId={pageNumber}
            />
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default hot(module)(DashboardNew);
