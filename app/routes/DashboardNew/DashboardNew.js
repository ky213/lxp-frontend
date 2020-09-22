import React, { useState } from 'react';
import { courseService } from '@/services';
import { Container, Row, Col } from '@/components';

import { HeaderMain } from '@/routes/components/HeaderMain';
import { HeaderDemo } from '@/routes/components/HeaderDemo';
import CourseSelector from './components/CourseSelector';
import LearnersTable from './components/LearnersTable';
import PieChart from './components/PieChart';

const DashboardNew = (props) => {
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchAttemptedUsersData = async (Offset = 0) => {
    setLoading(true);
    try {
      const data = await courseService.attemptedUsers(
        selectedProgramId,
        selectedCourseId,
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

  const fetchNotAttemptedUsersData = async (Offset = 0) => {
    setLoading(true);
    try {
      const data = await courseService.notAttemptedUsers(
        selectedOrganization.organizationId,
        selectedProgramId,
        selectedCourseId,
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

  const fetchCompletedUsersData = async (Offset = 0) => {
    setLoading(true);
    try {
      const data = await courseService.completedUsers(
        selectedProgramId,
        selectedCourseId,
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
      <Row className="py-5">
        {selectedCourses.map((course) => (
          <Col>
            <PieChart course={course} />
          </Col>
        ))}
      </Row>
      <Row>
        <Col lg={12}>
          <LearnersTable />
        </Col>
      </Row>
    </Container>
  );
};

export default DashboardNew;
