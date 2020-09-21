import React, { useEffect, useState } from 'react';
import { Form, FormGroup } from '@/components';
import { Typeahead } from 'react-bootstrap-typeahead';
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
      .getAll(selectedOrganization.organizationId, selectedProgramId)
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

  const onProgramChange = (program) => {
    setSelectedProgramId(program.id);
  };
  const onCourseChange = (course) => {};

  return (
    <Form className="form-inline">
      <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
        <Typeahead
          clearButton
          id="programs"
          labelKey="name"
          options={programs}
          placeholder="Program..."
          onChange={onProgramChange}
        />
      </FormGroup>
      <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
        <Typeahead
          clearButton
          id="courses"
          labelKey="name"
          options={coursesData}
          placeholder="Courses..."
          onChange={onCourseChange}
          disabled={selectedProgramId}
          multiple
        />
      </FormGroup>
    </Form>
  );
};

export default CourseSelector;
