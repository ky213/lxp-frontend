import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Table,
  Card,
  CardFooter,
  CardBody,
  Collapse,
  Row,
  Col,
} from '@/components';
import moment from 'moment';

import { Paginations } from '@/routes/components/Paginations';
import { reportingService } from '../../../services';
import { useAppState } from '@/components/AppState';

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
                    <h5 className="text-right text-nowrap">Screen #12:</h5>
                  </Col>
                  <Col> Phishing attacks</Col>
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
                    <a
                      href="/reporting"
                      className="stretched-link text-nowrap"
                      style={{ color: '#007bff !important' }}
                    >
                      More details on {user.name} {user.surname}
                    </a>
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

const LearnersTable = ({
  users,
  totalNumberOfRecords,
  course,
  experience,
  onPagination,
  pageId,
}) => {
  const [{ selectedOrganization }] = useAppState();
  const [openUser, setOpenUser] = useState('');

  useEffect(() => {}, [pageId, experience]);

  const toggle = (user) =>
    openUser ? setOpenUser('') : setOpenUser(user.email);

  return (
    <Card className="mb-3">
      {
        <Table hover striped responsive>
          <thead>
            <tr>
              <th></th>
              <th className="align-middle bt-0 ">Name</th>
              <th className="align-middle bt-0 ">surname</th>
              <th className="align-middle bt-0 ">Email</th>
              <th className="align-middle bt-0 ">
                total number of answers (correct and wrong)
              </th>
              <th className="align-middle bt-0 ">
                Number of incorrect answers
              </th>
              <th className="align-middle bt-0 ">Number of correct answers</th>
              <th className="align-middle bt-0 ">
                Number of points collected by user in course
              </th>
              <th className="align-middle bt-0 ">Start Date</th>
            </tr>
          </thead>
          <tbody>
            {users &&
              users.map((user) => (
                <React.Fragment key={user.email}>
                  <tr>
                    <td className="align-middle bt-0">
                      <i
                        className={`fa fa-chevron-${
                          user.email === openUser ? 'down' : 'right'
                        } fa-fw`}
                        onClick={() => toggle(user)}
                        style={{ marginBottom: '1rem', cursor: 'pointer' }}
                      ></i>
                    </td>
                    <td className="align-middle bt-0">{user.name}</td>
                    <td className="align-middle bt-0">{user.surname}</td>
                    <td className="align-middle bt-0">{user.email}</td>
                    <td className="align-middle bt-0">{user.answers_count}</td>
                    <td className="align-middle bt-0">
                      {user.response_fail_count}
                    </td>
                    <td className="align-middle bt-0">
                      {user.response_success_count}
                    </td>
                    <td className="align-middle bt-0">{user.scores}</td>
                    <td className="align-middle bt-0 text-nowrap">
                      {moment(user.start_date).format('DD-MM-YYYY')}
                    </td>
                  </tr>
                  <tr>
                    {user.email === openUser && (
                      <ExpandRow
                        user={user}
                        course={course}
                        experience={experience}
                      />
                    )}
                  </tr>
                </React.Fragment>
              ))}
          </tbody>
        </Table>
      }

      <CardFooter className="d-flex justify-content-center pb-0">
        <Paginations
          pageId={pageId}
          setPageId={onPagination}
          totalNumber={totalNumberOfRecords}
          recordsPerPage={10}
        />
      </CardFooter>
    </Card>
  );
};

export default LearnersTable;
