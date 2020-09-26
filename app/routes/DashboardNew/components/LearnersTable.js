import React, { useState } from 'react';
import {
  Table,
  Card,
  CardFooter,
  Button,
  Collapse,
  CardBody,
} from '@/components';
import { Paginations } from '@/routes/components/Paginations';
import moment from 'moment';

const Expand = ({ user }) => {
  return (
    <td colSpan="9">
      <Collapse isOpen={true}>
        <Card className="border-0">
          <CardBody>
            Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus
            terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer
            labore wes anderson cred nesciunt sapiente ea proident.
          </CardBody>
        </Card>
      </Collapse>
    </td>
  );
};

const LearnersTable = ({ users, onPagination, pageId }) => {
  const [openUser, setOpenUser] = useState('');

  const toggle = (user) =>
    openUser ? setOpenUser('') : setOpenUser(user.email);

  return (
    <Card className="mb-3">
      {
        <Table hover striped responsive>
          <thead>
            <tr>
              <th></th>
              <th className="align-middle bt-0 text-center" width="20%">
                Name
              </th>
              <th className="align-middle bt-0 text-left" width="15%">
                surname
              </th>
              <th className="align-middle bt-0 text-left" width="15%">
                Email
              </th>
              <th className="align-middle bt-0 text-left" width="20%">
                total number of answers (correct and wrong)
              </th>
              <th className="align-middle bt-0 text-center" width="10%">
                Number of incorrect answers
              </th>
              <th className="align-middle bt-0 text-right" width="5%">
                Number of correct answers
              </th>
              <th className="align-middle bt-0 text-center" width="10%">
                Number of points collected by user in course
              </th>
              <th className="align-middle bt-0 text-center" width="10%">
                Start Date
              </th>
            </tr>
          </thead>
          <tbody>
            {users &&
              users.map((user) => (
                <>
                  <tr>
                    <td className="align-middle bt-0">
                      <i
                        className={`fa fa-chevron-${
                          user.email === openUser ? 'down' : 'right'
                        } fa-fw`}
                        onClick={() => toggle(user)}
                        style={{ marginBottom: '1rem' }}
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
                    <td className="align-middle bt-0">
                      {moment(user.start_date).format('DD-MM-YYYY')}
                    </td>
                  </tr>
                  <tr>{user.email === openUser && <Expand user={user} />}</tr>
                </>
              ))}
          </tbody>
        </Table>
      }

      <CardFooter className="d-flex justify-content-center pb-0">
        <Paginations
          pageId={pageId}
          setPageId={(pageIdSelected) => {
            onPagination(pageIdSelected);
          }}
          totalNumber={30}
          recordsPerPage={10}
        />
      </CardFooter>
    </Card>
  );
};

export default LearnersTable;
