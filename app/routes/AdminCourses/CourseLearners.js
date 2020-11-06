import React, { useState, useEffect } from 'react'
import { hot } from 'react-hot-loader'
import { Typeahead } from 'react-bootstrap-typeahead'
import { toast } from 'react-toastify'

import { useAppState } from '@/components/AppState'
import { Paginations } from '@/routes/components/Paginations'
import { courseService } from '@/services'
import {
  ButtonGroup,
  Button,
  Row,
  Col,
  Table,
  UncontrolledTooltip,
} from '@/components'

const CourseLearners = ({ course }) => {
  const [learners, setLearners] = useState([])
  const [pageId, setPageId] = useState(1)
  const [totalNumberOfRecords, setTotlalNuberOfRecords] = useState(5)
  const [recordsPerPage, setRecordsPerPage] = useState(10)
  const [{ selectedOrganization }] = useAppState()

  useEffect(() => {
    getLearners()
  }, [])

  const getLearners = async () => {
    try {
      const response = await courseService.getLearners(
        course.programId,
        course.courseId,
        selectedOrganization.organizationId,
        pageId,
        recordsPerPage
      )

      setLearners(response.courseUsers)
      setTotlalNuberOfRecords(response.totalNumberOfRecords)
    } catch (error) {
      toast.error(
        <div>
          <h4 className="text-danger">Error getting learners</h4>
          <p>{JSON.stringify(error.message)}</p>
        </div>
      )
    }
  }

  const onUnjoin = () => {}

  return (
    <>
      <Row className="mb-3">
        <Col sm={4}>
          Status:
          <Typeahead
            id="status"
            name="status"
            className="mt-1"
            options={['All', 'Not Started', 'In Progress']}
            onChange={selectedOptions => selectedOptions}
          />
        </Col>
        <Col>
          <ButtonGroup className="mr-2 pull-right">
            <Button onClick={onUnjoin} id="tooltipDelete">
              <i className="fa fa-fw fa-trash"></i>
            </Button>
            <UncontrolledTooltip placement="bottom" target="tooltipDelete">
              Unjoin
            </UncontrolledTooltip>
          </ButtonGroup>
        </Col>
      </Row>
      <Row>
        <Col>
          <Table className="mb-0" hover responsive>
            <thead>
              <tr>
                <th className="bt-0"></th>
                <th className="bt-0">First Name</th>
                <th className="bt-0">Laste Name</th>
                <th className="bt-0">Email</th>
                <th className="bt-0">Joining date</th>
                <th className="bt-0 text-center">Status</th>
              </tr>
            </thead>
            <tbody></tbody>
          </Table>
        </Col>
      </Row>
      <Row className="mt-2">
        <Col className="d-flex justify-content-center pb-0">
          {learners.length > 0 ? (
            <Paginations
              pageId={pageId}
              setPageId={setPageId}
              totalNumber={totalNumberOfRecords}
              recordsPerPage={recordsPerPage}
            />
          ) : (
            'No learners...'
          )}
        </Col>
      </Row>
    </>
  )
}
export default hot(module)(CourseLearners)
