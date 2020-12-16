import React from 'react'
import moment from 'moment'
import classNames from 'classnames'

import { Row, Col, Card, CardHeader, CardBody, CardFooter } from '@/components'
import { hot } from 'react-hot-loader'

const ActivityCard = ({ activity }) => {
  return (
    <Card>
      <CardBody>
        <h2 className="text-primary">{activity.name}</h2>
        <h6>From: {moment(activity.start).format('L')}</h6>
        <h6>To: {moment(activity.end).format('L')}</h6>
        <p className="mt-4">{activity.description || 'no description'}</p>
      </CardBody>
      <CardFooter>
        <Row>
          <Col>
            <h3
              className={classNames([
                'badge',
                { 'badge-success': activity.status === 'Active' },
                { 'badge-danger': activity.status !== 'Active' },
              ])}
            >
              {activity.status}
            </h3>
          </Col>
          <Col>
            <h5 className="text-right"> Points: {activity.totalPoints}</h5>
          </Col>
        </Row>
      </CardFooter>
    </Card>
  )
}

export default hot(module)(ActivityCard)
