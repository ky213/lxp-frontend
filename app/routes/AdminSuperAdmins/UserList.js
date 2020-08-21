import React from 'react';
import { Link } from 'react-router-dom';
import {
  Container,
  Card,
  CardFooter,
  CardBody,
  Col,
  Row,
  Table,
  Input,
  Button,
  ButtonGroup,
  InputGroup,
  InputGroupAddon,
  UncontrolledTooltip,
  ButtonToolbar,
} from '@/components';
import { UserRow } from './UserRow';
import ThemedButton from '@/components/ThemedButton';

const UserList = ({ users, onUserEdit, onAddNew }) => {
  return (
    <React.Fragment>
      <Card className="mb-3">
        <CardBody>
          <Row>
            <Col lg={12}>
              <div className="d-lg-flex justify-content-end">
                <ButtonToolbar>
                  <ThemedButton
                    key="createNew"
                    className="align-self-center"
                    onClick={() => onAddNew()}
                    id="tooltipAddNew"
                  >
                    <i className="fa fa-fw fa-pencil"></i>
                  </ThemedButton>
                  <UncontrolledTooltip
                    placement="bottom"
                    target="tooltipAddNew"
                  >
                    Add new Super admin
                  </UncontrolledTooltip>
                </ButtonToolbar>
              </div>
            </Col>
          </Row>
          <Row className="mt-3">
            <Col>
              <Table className="mb-0" hover responsive>
                <thead>
                  <tr>
                    <th className="align-middle bt-0"></th>
                    <th className="align-middle bt-0 text-center"></th>
                    <th className="align-middle bt-0">Last name</th>
                    <th className="align-middle bt-0">First name</th>
                    <th className="align-middle bt-0">Email</th>
                    <th className="align-middle bt-0">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {(users &&
                    users.length > 0 &&
                    users.map((user) => (
                      <UserRow
                        props={user}
                        onUserEdit={onUserEdit}
                        key={user.userId}
                      />
                    ))) || (
                    <tr>
                      <td colSpan={7}>There's no other super admins.</td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </Col>
          </Row>
        </CardBody>
      </Card>
    </React.Fragment>
  );
};

export default UserList;
