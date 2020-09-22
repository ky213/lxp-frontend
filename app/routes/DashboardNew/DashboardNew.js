import React, { useState } from 'react';
import { courseService } from '@/services';
import { Container, Row, Col } from '@/components';

import { HeaderMain } from '@/routes/components/HeaderMain';
import { HeaderDemo } from '@/routes/components/HeaderDemo';
import CourseSelector from './components/CourseSelector';
import LearnersTable from './components/LearnersTable';
import PieChart from './components/PieChart';
import { useAppState } from '@/components/AppState';

const DashboardNew = (props) => {
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [{ selectedOrganization }] = useAppState();

  const fetchAttemptedUsersData = async (course, Offset = 0) => {
    setLoading(true);
    try {
      const data = await courseService.attemptedUsers(
        course.programId,
        course.courseId,
        Offset,
        10
      );
      setUsers(data);
      console.log(data);
    } catch (error) {
      console.log('Error while fetching learners:', error);
    }

    setLoading(false);
  };

  const fetchNotAttemptedUsersData = async (course, Offset = 0) => {
    setLoading(true);
    try {
      const data = await courseService.notAttemptedUsers(
        selectedOrganization.organizationId,
        course.programId,
        course.courseId,
        Offset,
        10
      );
      setUsers(data);
      console.log(data);
    } catch (error) {
      console.log('Error while fetching learners:', error);
    }

    setLoading(false);
  };

  const fetchCompletedUsersData = async (course, Offset = 0) => {
    setLoading(true);
    try {
      const data = await courseService.completedUsers(
        course.programId,
        course.courseId,
        Offset,
        10
      );
      setUsers(data);
      console.log(data);
    } catch (error) {
      console.log('Error while fetching learners:', error);
    }

    // setLoading(false);
  };

  const handleCourseSelect = (courses) => {
    setSelectedCourses(courses);
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
          <CourseSelector onCourseSelect={handleCourseSelect} />
        </Col>
      </Row>
      <Row style={{ minHeight: 200 }} className="py-4">
        {selectedCourses.map((course) => (
          <Col className="text-center">
            <PieChart
              course={course}
              fetchCompleted={fetchCompletedUsersData}
              fetchInProgress={fetchAttemptedUsersData}
              fetchNotStarted={fetchNotAttemptedUsersData}
            />
          </Col>
        ))}

        {selectedCourses.length == 0 && (
          <Col className="d-flex align-items-center justify-content-center">
            <h3 className="text-center">Please select some courses...</h3>
          </Col>
        )}
      </Row>
      <Row>
        <Col lg={12}>
          <LearnersTable users={users} />
        </Col>
      </Row>
    </Container>
  );
};

export default DashboardNew;
