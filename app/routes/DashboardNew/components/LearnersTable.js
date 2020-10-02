import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { hot } from 'react-hot-loader';

import { Table, Card, CardFooter } from '@/components';
import { Paginations } from '@/routes/components/Paginations';
import ExpandRow from './ExpandRow';

const LearnersTable = ({
  users,
  totalNumberOfRecords,
  course,
  experience,
  onPagination,
  pageId,
}) => {
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
              <th className="align-middle bt-0 ">Full Name</th>
              <th className="align-middle bt-0 ">Email</th>
              <th className="align-middle bt-0 ">Start Date</th>
              <th className="align-middle bt-0 ">Correct answers</th>
              <th className="align-middle bt-0 ">Incorrect answers</th>
              <th className="align-middle bt-0 ">Total Answers</th>
              <th className="align-middle bt-0 ">Points collected</th>
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
                    <td className="align-middle bt-0">
                      {user.name} {user.surname}
                    </td>
                    <td className="align-middle bt-0 ">{user.email}</td>
                    <td className="align-middle bt-0 text-nowrap text-center">
                      {moment(user.start_date).format('DD-MM-YYYY')}
                    </td>
                    <td className="align-middle bt-0 text-center">
                      {user.response_success_count}
                    </td>
                    <td className="align-middle bt-0 text-center">
                      {user.response_fail_count}
                    </td>
                    <td className="align-middle bt-0 text-center">
                      {user.answers_count}
                    </td>
                    <td className="align-middle bt-0 text-center">
                      {user.scores}
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

export default hot(module)(LearnersTable);
