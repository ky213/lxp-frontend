import React, { useState } from 'react'
import { hot } from 'react-hot-loader'
import { Typeahead } from 'react-bootstrap-typeahead'

import { useAppState } from '@/components/AppState'
import { Paginations } from '@/routes/components/Paginations'
import { courseService } from '@/services'
import {
  ButtonGroup,
  Button,
  Row,
  Col,
  Label,
  Table,
  UncontrolledTooltip,
} from '@/components'

const CourseLearners = () => {
  const [learners, setLearners] = useState([])
  const [pageId, setPageId] = useState(1)
  const [totalNumberOfRecords, setTotlalNuberOfRecords] = useState(5)
  const [recordsPerPage, setRecordsPerPage] = useState(0)
  const [{ selectedOrganization }] = useAppState()

  const onDelete = () => {}

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
            <Button onClick={onDelete} id="tooltipDelete">
              <i className="fa fa-fw fa-trash"></i>
            </Button>
            <UncontrolledTooltip placement="bottom" target="tooltipDelete">
              Delete
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
      <Row>
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
