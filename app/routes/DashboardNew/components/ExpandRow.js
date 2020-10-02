import React from 'react';
import { hot } from 'react-hot-loader';

import { reportingService } from '@/services';
import { CardBody, Collapse, Row, Col } from '@/components';

const ExpandRow = ({ user, course, experience }) => {
  return (
    <td colSpan="9">
      <Collapse isOpen={true}>
        <Card className="border-0">
          <CardBody>
            <Row>
              <Col>
                <Row>
                  <Col>
                    <h5 className="text-right text-nowrap">Screen #:</h5>
                  </Col>
                  <Col>12</Col>
                </Row>
                <Row>
                  <Col>
                    <h5 className="text-right">Activity: </h5>
                  </Col>
                  <Col>{course.name}</Col>
                </Row>
              </Col>
              <Col>
                <Row className="pt-2">
                  <Col>
                    <Link
                      to={`/reporting/?programId=${course.programId}&userId=${user.userId}&experience=${experience}`}
                      className="stretched-link text-nowrap"
                      style={{
                        color: '#007bff !important',
                      }}
                    >
                      More details on {user.name} {user.surname}...
                    </Link>
                  </Col>
                </Row>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </Collapse>
    </td>
  );
};

export default hot(module)(ExpandRow);
