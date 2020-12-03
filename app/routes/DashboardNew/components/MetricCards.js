import React, { useEffect, useState } from 'react'
import { hot } from 'react-hot-loader'
import { toast } from 'react-toastify'

import { Row, Col, Card, CardBody, Loading } from '@/components'
import {
  learnerService,
  programService,
  courseService,
  courseManagerService,
} from '@/services'

const MetricCards = ({ organizationId }) => {
  const [learners, setLearners] = useState(null)
  const [managers, setManagers] = useState(null)
  const [programs, setPrograms] = useState(null)
  const [courses, setCourses] = useState(null)

  useEffect(() => {
    getLearners()
    getManagers()
    getPrograms()
    getCourses()
  }, [])

  const getLearners = () => {
    learnerService
      .getAll(0, 10, '',  '' ,  organizationId)
      .then(data => {
        setLearners(data.totalNumberOfRecords)
      })
      .catch(err =>
        toast.error(
          <div>
            <h4 className="text-danger">Error in Metrics</h4>
            <p>{err.message}</p>
          </div>
        )
      )
  }

  const getManagers = () => {
    courseManagerService
      .getAll(0, 10, '', organizationId)
      .then(data => {
        setManagers(data.totalNumberOfRecords)
      })
      .catch(err =>
        toast.error(
          <div>
            <h4 className="text-danger">Error in Metrics</h4>
            <p>{err.message}</p>
          </div>
        )
      )
  }

  const getPrograms = () => {
    programService
      .getAll(organizationId)
      .then(data => {
        setPrograms(data.totalNumberOfRecords)
      })
      .catch(err =>
        toast.error(
          <div>
            <h4 className="text-danger">Error in Metrics</h4>
            <p>{err.message}</p>
          </div>
        )
      )
  }
  const getCourses = () => {
    courseService
      .getAll(organizationId)
      .then(data => {
        setCourses(data.totalNumberOfRecords)
      })
      .catch(err =>
        toast.error(
          <div>
            <h4 className="text-danger">Error in Metrics</h4>
            <p>{err.message}</p>
          </div>
        )
      )
  }

  return (
    <>
      <Col>
        <Card className="position-relative">
          <CardBody>
            <Row>
              <Col>
                <Card
                  className="bg-success position-absolute"
                  style={{ top: '-30px', left: '5px' }}
                >
                  <CardBody>
                    <i
                      className="fa fa-graduation-cap fa-fw"
                      style={{ fontSize: '30px', color: '#555' }}
                    ></i>
                  </CardBody>
                </Card>
              </Col>
              <Col>
                <p className="my-0 py-0 text-right">Learners</p>
                <p className="display-4 text-right">
                  {learners ? learners : <Loading small />}
                </p>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </Col>
      <Col>
        <Card className="position-relative">
          <CardBody>
            <Row>
              <Col>
                <Card
                  className="position-absolute"
                  style={{
                    top: '-30px',
                    left: '5px',
                    backgroundColor: '#eb6356',
                  }}
                >
                  <CardBody>
                    <i
                      className="fa fa-users fa-fw"
                      style={{ fontSize: '30px', color: '#555' }}
                    ></i>
                  </CardBody>
                </Card>
              </Col>
              <Col>
                <p className="my-0 py-0 text-right">Managers</p>
                <p className="display-4 text-right">
                  {managers ? managers : <Loading small />}
                </p>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </Col>
      <Col>
        <Card className="position-relative">
          <CardBody>
            <Row>
              <Col>
                <Card
                  className="position-absolute"
                  style={{
                    top: '-30px',
                    left: '5px',
                    backgroundColor: '#1eb7ff',
                  }}
                >
                  <CardBody>
                    <i
                      className="fa fa-list fa-fw"
                      style={{
                        fontSize: '30px',
                        color: '#555',
                      }}
                    ></i>
                  </CardBody>
                </Card>
              </Col>
              <Col>
                <p className="my-0 py-0 text-right">Programs</p>
                <p className="display-4 text-right">
                  {programs ? programs : <Loading small />}
                </p>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </Col>
      <Col>
        <Card className="position-relative">
          <CardBody>
            <Row>
              <Col>
                <Card
                  className="position-absolute"
                  style={{
                    top: '-30px',
                    left: '5px',
                    backgroundColor: '#5e95b0',
                  }}
                >
                  <CardBody>
                    <i
                      className="fa fa-book fa-fw"
                      style={{ fontSize: '30px', color: '#555' }}
                    ></i>
                  </CardBody>
                </Card>
              </Col>
              <Col>
                <p className="my-0 py-0 text-right">Courses</p>
                <p className="display-4 text-right">
                  {courses ? courses : <Loading small />}
                </p>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </Col>
    </>
  )
}

export default hot(module)(MetricCards)
