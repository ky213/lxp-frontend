import React, { useEffect, useState } from 'react';
import { Form, FormGroup, UncontrolledTooltip } from '@/components';
import { Typeahead } from 'react-bootstrap-typeahead';
import ThemedButton from '@/components/ThemedButton';
import { programService, courseService } from '@/services';
import { useAppState } from '@/components/AppState';

export const CourseSelector = () => {
  const [{ currentUser, selectedOrganization }] = useAppState();
  const [programs, setPrograms] = useState([]);
  const [selectedProgramId, setSelectedProgramId] = React.useState(null);
  const [coursesData, setCoursesData] = React.useState([]);

  useEffect(() => {
    programService
      .getByCurrentUser(selectedOrganization.organizationId)
      .then((data) => {
        console.log('Programs data:', data);
        setPrograms(data);
        setSelectedProgramId(data[0]?.programId || null);
      })
      .catch((err) => console.log('programService.getByCurrentUser', err));
  }, []);

  useEffect(() => {
    courseService
      .getAll(selectedOrganization.organizationId, selectedProgramId, 1, 10, '')
      .then((data) => {
        setCoursesData(data.courses);
      })
      .catch((err) => {
        showAlertMessage({
          title: 'Error',
          message: err,
          type: 'danger',
        });
      });
  }, [programs]);

  const onProgramChange = () => {};
  const onCourseChange = () => {};

  return (
    <Form className="form-inline">
      <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
        <Typeahead
          clearButton
          id="programs"
          labelKey="name"
          //   selected={
          //     (selectedProgramId &&
          //       programs && [
          //         programs.find((p) => p.programId == selectedProgramId),
          //       ]) ||
          //     (programs && programs.length == 1 && [programs[0]]) ||
          //     []
          //   }
          options={programs}
          placeholder="Program..."
          onChange={(e) => onProgramChange(e)}
        />
      </FormGroup>
      <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
        <Typeahead
          clearButton
          id="cources"
          labelKey="name"
          //   selected={
          //       (selectedCourseId &&
          //         coursesData.courses && [
          //           coursesData.courses.find(
          //             (p) => p.courseId == selectedCourseId
          //           ),
          //         ]) ||
          //       (coursesData.courses &&
          //         coursesData.courses.length == 1 && [coursesData.courses[0]]) ||
          //       []
          //   }
          options={coursesData}
          placeholder="Courses..."
          onChange={(e) => onCourseChange(e)}
        />
      </FormGroup>
    </Form>
  );
};

export default CourseSelector;
