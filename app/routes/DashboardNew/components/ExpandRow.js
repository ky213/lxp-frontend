import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { hot } from 'react-hot-loader'
import { toast } from 'react-toastify'

import { reportingService } from '@/services'
import { Card, CardBody, Collapse, Row, Col, Loading } from '@/components'
import { useAppState } from '@/components/AppState'

const ExpandRow = ({ user, course, experience }) => {
  const [{ selectedOrganization }] = useAppState()
  const [activity, setActivity] = useState(null)
  const [loading, setLoading] = useState(false)

  const experienceMap = {
    'In progress': [{ name: 'attempted', value: 'attempted' }],
    'Not started': [{ name: '', value: '' }],
    Completed: [{ name: 'completed', value: 'completed' }],
  }

  useEffect(() => {
    getActivities()
  }, [])

  const getActivities = async () => {
    try {
      setLoading(true)
      const response = await reportingService.getAll({
        registration: course.programId,
        agent: JSON.stringify([{ email: user.email }]),
        courseId: course.courseId,
        experiences: JSON.stringify(experienceMap[experience]),
      })

      if (response) {
        setLoading(false)
        setActivity(response.statements.pop()?.object?.definition?.name?.und)
      }
    } catch (error) {
      setLoading(false)
      toast.error(
        <div>
          <h4 className="text-danger">Error</h4>
          <p>{JSON.stringify(error)}</p>
        </div>
      )
    }
  }

  return (
    <td colSpan="9">
      <Collapse isOpen={true}>
        <Card className="border-0">
          {!loading ? (
            <CardBody>
              <Row>
                <Col>
                  <Row>
                    <Col>
                      <h5 className="text-right">Activity: </h5>
                    </Col>
                    <Col>{activity || 'No Activity'}</Col>
                  </Row>
                </Col>
                <Col>
                  <Row className="pt-2">
                    <Col>
                      {experience !== 'Not started' && (
                        <Link
                          to={`/reporting/?programId=${course.programId}&userId=${user.userId}&experience=${experience}`}
                          className="stretched-link text-nowrap"
                          style={{
                            color: '#007bff !important',
                          }}
                        >
                          More details on {user.name} {user.surname}...
                        </Link>
                      )}{' '}
                    </Col>
                  </Row>
                </Col>
              </Row>
            </CardBody>
          ) : (
            <Loading />
          )}
        </Card>
      </Collapse>
    </td>
  )
}

export default hot(module)(ExpandRow)
