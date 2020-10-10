import React from 'react'
import { hot } from 'react-hot-loader'
import { Row, Col, Card, CardBody } from '@/Components'

const Metrics = () => {
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
                  style={{ fontSize: '30px', color: '#232729' }}
                ></i>
              </CardBody>
            </Card>
          </Col>
          <Col className="ml-5 pl-5">
            <p className="my-0 py-0 text-right">Users</p>
            <p className="display-4">1,788</p>
          </Col>
        </Row>
      </CardBody>
    </Card>
  )
}

export default hot(module)(Metrics)
