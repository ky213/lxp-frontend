import React, { useState } from 'react';
import { Table, Card } from '@/components';

const LearnersTable = () => {
  const [tablePageId, setTablePageId] = useState(1);
  const [users, setUsers] = useState([]);

  return (
    <Card className="mb-3">
      {
        <Table className={styles.table} hover striped responsive>
          <thead>
            <tr>
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
                Gender
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
                Phone Number
              </th>
              <th className="align-middle bt-0 text-center" width="10%">
                Pager Number
              </th>
              <th className="align-middle bt-0 text-center" width="10%">
                Start Date
              </th>
            </tr>
          </thead>
          <tbody>
            {users &&
              users.map((user) => (
                <tr>
                  <td className="align-middle bt-0">{user.name}</td>
                  <td className="align-middle bt-0">{user.surname}</td>
                  <td className="align-middle bt-0">{user.email}</td>
                  <td className="align-middle bt-0">{user.gender}</td>
                  <td className="align-middle bt-0">{user.answers_count}</td>
                  <td className="align-middle bt-0">
                    {user.response_fail_count}
                  </td>
                  <td className="align-middle bt-0">
                    {user.response_success_count}
                  </td>
                  <td className="align-middle bt-0">{user.scores}</td>
                  <td className="align-middle bt-0">{user.phone_number}</td>
                  <td className="align-middle bt-0">{user.pager_number}</td>
                  <td className="align-middle bt-0">{user.start_date}</td>
                </tr>
              ))}
          </tbody>
        </Table>
      }

      {
        <CardFooter className="d-flex justify-content-center pb-0">
          <Paginations
            pageId={tablePageId}
            setPageId={(pageIdSelected) => {
              setTablePageId(pageIdSelected);
            }}
            totalNumber={10}
            recordsPerPage={10}
          />
        </CardFooter>
      }
    </Card>
  );
};

export default LearnersTable;
