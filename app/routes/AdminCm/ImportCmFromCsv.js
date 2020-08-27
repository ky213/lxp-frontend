import React from 'react';
import { useHistory } from 'react-router-dom';
import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Row,
  Table,
} from '@/components';
import { HeaderMain } from '@/routes/components/HeaderMain';
import ThemedButton from '@/components/ThemedButton';
import { courseManagerService, groupsService, roleService } from '@/services';
import { Role } from '@/helpers';
import { useAppState } from '@/components/AppState';
import { Loading } from '../../components';
import Papa from 'papaparse';

const ImportCmFromCsv = () => {
  const [{ currentUser, selectedOrganization }, dispatch] = useAppState();
  const loggedInUser = currentUser && currentUser.user;
  let history = useHistory();

  const [users, setUsers] = React.useState(null);
  const [showLoading, setShowLoading] = React.useState(false);
  const [cmRoles, setCmRoles] = React.useState(null);
  const [importDisabled, setImportDisabled] = React.useState(false);
  const [groups, setGroups] = React.useState([]);
  const inputFile = React.useRef(null);

  React.useEffect(() => {
    roleService.getCmRoles().then((data) => {
      setCmRoles(data);
    });

    groupsService
      .getAll(selectedOrganization?.organizationId)
      .then((response) => setGroups(response.groups));
  }, []);

  const goBack = (event) => {
    history.goBack();
  };

  const importClick = () => {
    setShowLoading(true);
    courseManagerService
      .addBulk(users, selectedOrganization.organizationId)
      .then(() => history.goBack())
      .catch((err) => {
        console.log('userService.addBulk', err);
        setShowLoading(false);
      });
  };

  const importFromCsv = (event) => {
    inputFile.current.click();
  };

  const showFile = async (e) => {
    e.preventDefault();
    setShowLoading(true);
    const reader = new FileReader();
    reader.onload = async (e) => {
      let csvUsers = [];
      const text = e.target.result;
      var data = Papa.parse(text, {
        header: true,
        skipEmptyLines: true,
        step: function (row) {
          let user = {
            name: row.data.Name,
            surname: row.data.Surname,
            email: row.data.Email,
            roleId: row.data.Role,
            gender: row.data.Gender,
            groupNames: row.data.Groups.split(','),
            error: '',
          };

          if (loggedInUser && loggedInUser.role == Role.SuperAdmin) {
            user.organizationId = selectedOrganization.organizationId;
          }

          user.groupIds = groups.map(({ name, groupId }) => {
            if (user.groupNames.includes(name)) return groupId;
          });

          csvUsers.push(user);
        },
        complete: function () {
          courseManagerService
            .validateBulk(csvUsers, selectedOrganization.organizationId)
            .then((data) => {
              setUsers(data.data);
              setImportDisabled(data.numOfRecordsInvalid > 0);
              setShowLoading(false);
            });
        },
      });
    };

    reader.readAsText(e.target.files[0]);
    e.target.value = '';
  };

  let usersContent = '';

  if (users != null) {
    usersContent = (
      <Row>
        <Col lg={12}>
          {/* START Table */}
          <div className="table-responsive-xl">
            <Table className="mb-0" hover>
              <thead>
                <tr>
                  {/* <th className="align-middle bt-0"></th> */}
                  <th className="align-middle bt-0">Line</th>
                  <th className="align-middle bt-0">Name</th>
                  <th className="align-middle bt-0">Surname</th>
                  <th className="align-middle bt-0">Email</th>
                  <th className="align-middle bt-0">Gender</th>
                  <th className="align-middle bt-0">Role</th>
                  <th className="align-middle bt-0">Groups</th>
                  <th className="align-middle bt-0">Error</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => {
                  return (
                    <tr key={user.email}>
                      <td>{index + 1}</td>
                      <td>{user.name}</td>
                      <td>{user.surname}</td>
                      <td>{user.email}</td>
                      <td>
                        {(user.gender == 'M' && 'Male') ||
                          (user.gender == 'F' && 'Female') ||
                          user.gender}
                      </td>
                      <td>{user.roleId}</td>
                      <td>
                        {groups
                          .map(({ name, groupId }) => {
                            if (user.groupIds.includes(groupId)) return name;
                          })
                          .join(', ')}
                      </td>
                      <td>
                        <span style={{ color: 'red' }}>{user.error}</span>
                      </td>
                    </tr>
                  );
                })}
                <tr>
                  <td colSpan="7">
                    <ThemedButton
                      type="button"
                      onClick={importClick}
                      disabled={importDisabled}
                    >
                      Import
                    </ThemedButton>
                    <button
                      className="btn btn-link"
                      type="button"
                      onClick={goBack}
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              </tbody>
            </Table>
          </div>
        </Col>
      </Row>
    );
  }

  let fileExample = (
    <React.Fragment>
      <Row>
        <Col lg={12}>
          Please prepare .csv file in this format:
          <br />
          <Table className="mb-0" hover>
            <thead>
              <tr>
                <th className="align-middle bt-0">Name</th>
                <th className="align-middle bt-0">Surname</th>
                <th className="align-middle bt-0">Email</th>
                <th className="align-middle bt-0">Gender</th>
                <th className="align-middle bt-0">Role</th>
                <th className="align-middle bt-0">Groups</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Name</td>
                <td>Surname</td>
                <td>Email</td>
                <td>M or F</td>
                <td>Role name</td>
                <td>Groups names</td>
              </tr>
            </tbody>
          </Table>
          <br />
          Other rules:
          <ul>
            <li>
              First line in the file contains header titles and not user data!
            </li>
            <li>
              Header titles have to match (case sensitive) the titles in the
              table above (Name, Surname, Email, Gender and Role).
            </li>
            <li>Gender options: M (male), F (female)</li>
            <li>
              Valid roles: {cmRoles && cmRoles.map((r) => r.roleId).join(', ')}
            </li>
            <li>
              Valid groups names: {groups.map(({ name }) => name).join(', ')}
            </li>
          </ul>
        </Col>
      </Row>
      <Row>
        <br />
      </Row>
      <Row>
        <Col lg={12}>
          <button className="btn btn-link" type="button" onClick={goBack}>
            Cancel
          </button>
        </Col>
      </Row>
    </React.Fragment>
  );

  return (
    <Container>
      <HeaderMain title="Import course managers from csv" />
      <Card className="mb-3">
        <CardBody>
          <Row>
            <Col lg={12}>
              <ThemedButton onClick={importFromCsv}>
                Select the csv file
              </ThemedButton>
              <input
                type="file"
                id="file"
                ref={inputFile}
                onChange={showFile}
                style={{ display: 'none' }}
              />
            </Col>
          </Row>
          <Row>
            <br />
          </Row>
          {!showLoading && !usersContent && fileExample}
          {!showLoading && usersContent}
          {showLoading && <Loading />}
        </CardBody>
      </Card>
    </Container>
  );
};

export default ImportCmFromCsv;
