import React, { useEffect, useState } from 'react'
import { Form, FormGroup } from '@/components'
import { Typeahead } from 'react-bootstrap-typeahead'
import { programService, courseService } from '@/services'
import { useAppState } from '@/components/AppState'
import { hot } from 'react-hot-loader'

export const CourseSelector = ({ onCourseSelect }) => {
  const [{ selectedOrganization }] = useAppState()
  const [programs, setPrograms] = useState([])
  const [selectedProgramId, setSelectedProgramId] = React.useState(null)
  const [coursesData, setCoursesData] = React.useState([])

  useEffect(() => {
    programService
      .getByCurrentUser(selectedOrganization.organizationId)
      .then(data => {
        setPrograms(data)
      })
      .catch(err => console.log('programService.getByCurrentUser', err))
  }, [])

  useEffect(() => {
    courseService
      .getAll(selectedOrganization.organizationId, selectedProgramId)
      .then(data => {
        setCoursesData(data.courses)
      })
      .catch(err => {
        showAlertMessage({
          title: 'Error',
          message: err,
          type: 'danger',
        })
      })
  }, [selectedProgramId])

  return (
    <Form className="form-inline">
      <FormGroup className="course-selector mb-2 mr-sm-2 mb-sm-0">
        <Typeahead
          clearButton
          id="programs"
          labelKey="name"
          options={programs}
          placeholder="Program..."
          onChange={programsList =>
            setSelectedProgramId(programsList[0]?.programId)
          }
        />
      </FormGroup>
      <FormGroup className="course-selector mb-2 mr-sm-2 mb-sm-0">
        <Typeahead
          clearButton
          id="courses"
          labelKey="name"
          options={coursesData}
          placeholder="Courses..."
          onChange={onCourseSelect}
          disabled={!selectedProgramId}
          multiple
        />
      </FormGroup>
    </Form>
  )
}

export default hot(module)(CourseSelector)
