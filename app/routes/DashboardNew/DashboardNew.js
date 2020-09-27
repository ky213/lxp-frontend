import React, { useState, useEffect } from 'react';
import { courseService } from '@/services';
import { Container, Row, Col } from '@/components';
import { useAppState } from '@/components/AppState';

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
  const [offset, setOffset] = useState(1);
  const experienceEnum = ['Not started', 'Completed', 'In progress'];

  useEffect(() => {
    if (experience === experienceEnum[0]) fetchNotAttemptedUsersData();
    if (experience === experienceEnum[1]) fetchCompletedUsersData();
    if (experience === experienceEnum[2]) fetchAttemptedUsersData();
  }, [experience, offset]);

  const fetchAttemptedUsersData = async () => {
    setLoading(true);
    try {
      const data = await courseService.attemptedUsers(
        selectedCourse.programId,
        selectedCourse.courseId,
        offset - 1,
        10
      );
      setUsers(data);
      console.log(data);
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
        offset - 1,
        10
      );
      setUsers(data);
      console.log(data);
    } catch (error) {
      console.log('Error while fetching learners:', error);
    }

    setLoading(false);
  };

  const fetchCompletedUsersData = async () => {
    setLoading(true);
    try {
      const data = await courseService.completedUsers(
        selectedCourse.programId,
        selectedCourse.courseId,
        offset - 1,
        10
      );
      setUsers(data);
      console.log(data);
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
      <Row>
        <Col>
          {experience && (
            <LearnersTable
              users={users}
              course={selectedCourse}
              experience={experience}
              onPagination={setOffset}
              pageId={offset}
            />
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default DashboardNew;
