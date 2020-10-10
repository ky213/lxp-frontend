import React, { useEffect, useState } from 'react'
import { hot } from 'react-hot-loader'
import { toast } from 'react-toastify'

import { Row, Col, Card, CardBody, Loading } from '@/Components'
import { learnerService } from '@/services'

const Metrics = ({ organizationId }) => {
  const [users, setUsers] = useState(null)

  useEffect(() => {
    getUsers()
  }, [])

  const getUsers = () => {
    learnerService
      .getAll(0, 10, '', organizationId)
      .then(data => {
        setUsers(data.totalNumberOfRecords)
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
                  className="fa fa-users fa-fw"
                  style={{ fontSize: '30px', color: '#555' }}
                ></i>
              </CardBody>
            </Card>
          </Col>
          <Col className="ml-5 pl-5">
            <p className="my-0 py-0 text-right">Users</p>
            <p className="display-4">{users ? users : <Loading small />}</p>
          </Col>
        </Row>
      </CardBody>
    </Card>
  )
}

export default hot(module)(Metrics)
