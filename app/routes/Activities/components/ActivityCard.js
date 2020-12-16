import React from 'react'
import moment from 'moment'

import { Card, CardHeader, CardBody, CardFooter } from '@/components'
import { hot } from 'react-hot-loader'

const ActivityCard = ({ activity }) => {
  return (
    <Card>
      <CardBody>
        <h4>{activity.name}</h4>
        <h4>Start: {moment(activity.start).format('L')}</h4>
        <h4>End: {moment(activity.end).format('L')}</h4>
        <h4>Status: {activity.status}</h4>
        <h4>Total points: {activity.totalPoints}</h4>
      </CardBody>
    </Card>
  )
}

export default hot(module)(ActivityCard)
