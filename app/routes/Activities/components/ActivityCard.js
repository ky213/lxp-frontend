import React from 'react'
import { hot } from 'react-hot-loader'
import moment from 'moment'
import classNames from 'classnames'
import styled from 'styled-components'
import { toast } from 'react-toastify'

import { activityService } from '@/services'
import { Row, Col, Card, CardBody, CardFooter } from '@/components'

const StyledCard = styled(Card)`
  cursor: pointer;
  &:hover {
    background-color: #0000;
  }
`

const ActivityCard = ({ organizationId, activity, setSelectedActivity }) => {
  const getActivity = async () => {
    try {
      const activityDetails = await activityService.getById(
        activity.activityId,
        organizationId
      )
      setSelectedActivity(activityDetails)
    } catch (error) {
      console.log(error)
      toast.error(
        <div>
          <h4 className="text-danger">Error</h4>
          <p>{error.message}</p>
        </div>
      )
    }
  }

  return (
    <StyledCard onClick={getActivity}>
      <CardBody>
        <h2 className="text-primary">{activity.name}</h2>
        <p>Type: {activity.activityTypeName}</p>
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
    </StyledCard>
  )
}

export default hot(module)(ActivityCard)
