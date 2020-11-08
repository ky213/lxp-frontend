import React, { useState, useEffect } from 'react'
import { hot } from 'react-hot-loader'
import { Typeahead } from 'react-bootstrap-typeahead'
import { toast } from 'react-toastify'
import moment from 'moment'

import { useAppState } from '@/components/AppState'
import { Paginations } from '@/routes/components/Paginations'
import { courseService } from '@/services'
import {
  ButtonGroup,
  Button,
  Row,
  Col,
  Table,
  CustomInput,
  UncontrolledTooltip,
  Loading,
} from '@/components'

const CourseLearners = ({ course }) => {
  const [learners, setLearners] = useState([])
  const [selectedLearners, setSelectedLearners] = useState([])
  const [status, setStatus] = useState('')
  const [pageId, setPageId] = useState(1)
  const [totalNumberOfRecords, setTotlalNuberOfRecords] = useState(5)
  const [recordsPerPage, setRecordsPerPage] = useState(10)
  const [{ selectedOrganization }] = useAppState()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    getLearners()
  }, [])

  useEffect(() => {
    getLearners()
  }, [pageId, status])

  const getLearners = async () => {
    try {
      setLoading(true)
      const response = await courseService.getLearners(
        course.programId,
        course.courseId,
        selectedOrganization.organizationId,
        status,
        pageId,
        recordsPerPage
      )

      setLearners(
        response.courseUsers.map(user => {
          user.selected = false
          return user
        })
      )
      setTotlalNuberOfRecords(response.totalNumberOfRecords)
      setLoading(false)
    } catch (error) {
      setLoading(false)
      toast.error(
        <div>
          <h4 className="text-danger">Error getting learners</h4>
          <p>{JSON.stringify(error.message)}</p>
        </div>
      )
    }
  }

  const onSelected = (learnerId, e) => {
    setLearners(
      learners.map(learner => {
        if (learner.userId === learnerId) learner.selected = e.target.checked

        return learner
      })
    )
  }

  const onSelectAll = e =>
    setLearners(
      learners.map(learner => {
        learner.selected = e.target.checked
        return learner
      })
    )

  const onUnjoin = async () => {
    if (!confirm('Are you sure you want to unjoin learners?')) return

    const learnersList = learners
      .filter(learner => learner.selected)
      .map(learner => learner.userId)

    try {
      await courseService.unjoinLearners(course.courseId, learnersList)

      getLearners()
    } catch (error) {
      toast.error(
        <div>
          <h4 className="text-danger">Error unjoining learners</h4>
          <p>{JSON.stringify(error)}</p>
        </div>
      )
    }
  }

  return (
    <>
      <Row className="mb-3">
        <Col sm={4}>
          Status:
          <Typeahead
            id="status"
            name="status"
            className="mt-1"
            options={['Completed', 'Not Started', 'In Progress']}
            onChange={setStatus}
            clearButton
          />
        </Col>
        <Col>
          <ButtonGroup className="mr-2 pull-right">
            <Button
              onClick={onUnjoin}
              id="tooltipDelete"
              disabled={!learners.filter(l => l.selected).length > 0}
            >
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
                <th className="bt-0">
                  <CustomInput
                    id="select-all"
                    type="checkbox"
                    onClick={onSelectAll}
                  />
                </th>
                <th className="bt-0">First Name</th>
                <th className="bt-0">Laste Name</th>
                <th className="bt-0">Email</th>
                <th className="bt-0">Joining date</th>
                <th className="bt-0 text-center">Status</th>
              </tr>
            </thead>
            <tbody>
              {!loading ? (
                learners.map(learner => (
                  <tr>
                    <td>
                      <CustomInput
                        id={learner.userId}
                        type="checkbox"
                        onClick={e => onSelected(learner.userId, e)}
                        checked={learner.selected}
                      />
                    </td>
                    <td>{learner.firstName}</td>
                    <td>{learner.lastName}</td>
                    <td>{learner.email}</td>
                    <td>{moment(learner.joininDate).format('L')}</td>
                    <td>{learner.status}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6}>
                    <Loading />
                  </td>
                </tr>
              )}
            </tbody>
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
            'no learners...'
          )}
        </Col>
      </Row>
    </>
  )
}
export default hot(module)(CourseLearners)
