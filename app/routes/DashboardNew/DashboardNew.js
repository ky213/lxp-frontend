import React from 'react';
import { Alert, Col, Container, Row } from '@/components';
import { Button } from 'reactstrap';

import { HeaderMain } from '@/routes/components/HeaderMain';
import { HeaderDemo } from '@/routes/components/HeaderDemo';
import CourseSelector from './components/CourseSelector';
import LearnersTable from './components/LearnersTable';

const DashboardNew = (props) => {
  // const fetchAttemptedUsersData = async (Offset = 0) => {
  //   setLoading(true);
  //   try {
  //     const data = await courseService.attemptedUsers(
  //       selectedProgramId,
  //       selectedCourseId,
  //       Offset,
  //       10
  //     );
  //     setUsers(data);
  //     console.log(data);
  //   } catch (error) {
  //     console.log('Error while fetching learners:', error);
  //   }

  //   setLoading(false);
  // };

  // const fetchNotAttemptedUsersData = async (Offset = 0) => {
  //   setLoading(true);
  //   try {
  //     const data = await courseService.notAttemptedUsers(
  //       selectedOrganization.organizationId,
  //       selectedProgramId,
  //       selectedCourseId,
  //       Offset,
  //       10
  //     );
  //     setUsers(data);
  //     console.log(data);
  //   } catch (error) {
  //     console.log('Error while fetching learners:', error);
  //   }

  //   setLoading(false);
  // };

  // const fetchCompletedUsersData = async (Offset = 0) => {
  //   setLoading(true);
  //   try {
  //     const data = await courseService.completedUsers(
  //       selectedProgramId,
  //       selectedCourseId,
  //       Offset,
  //       10
  //     );
  //     setUsers(data);
  //     console.log(data);
  //   } catch (error) {
  //     console.log('Error while fetching learners:', error);
  //   }

  //   setLoading(false);
  // };

  return (
    <Container className="courses-home">
      <HeaderMain title="Courses" subTitles="" />
      {/* 
      {showAlert && alertMessage && (
        <Alert color={alertMessage.type}>
          <h6 className="mb-1 alert-heading">{alertMessage.title}</h6>
          {alertMessage.message}
          <div className="mt-2">
            <Button color={alertMessage.type} onClick={dismissAlert}>
              Dismiss
            </Button>
          </div>
        </Alert>
      )} */}

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
          <CourseSelector />
        </Col>
      </Row>
      <Row className="mb-3">
        <Col lg={12}></Col>
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
