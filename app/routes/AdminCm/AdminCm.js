import React from 'react';
import { Link } from 'react-router-dom';
import {
  Button,
  ButtonToolbar,
  Col,
  Container,
  Card,
  CardFooter,
  Row,
  Table,
} from '@/components';
import { HeaderMain } from '@/routes/components/HeaderMain';
import ListUsers from './ListUsers';
import { userService, courseManagerService } from '@/services';
import CmEdit from './CmEdit';
import { useAppState } from '@/components/AppState';

const AdminCm = () => {
  const [{ selectedOrganization }] = useAppState();
  const [showEditForm, setShowEditForm] = React.useState(false);
  const [searchText, setSearchText] = React.useState(null);
  const [employeeId, setEmployeeId] = React.useState(null);
  const [user, setUser] = React.useState(null);
  const [users, setUsers] = React.useState(null);
  const [pageId, setPageId] = React.useState(1);
  const [recordsPerPage, setRecordsPerPage] = React.useState(15);
  const [totalNumberOfRecords, setTotalNumberOfRecords] = React.useState(0);
  const [filterOrganizationId, setFilterOrganizationId] = React.useState(null);

  React.useEffect(() => {
    getUsers();
  }, [searchText, pageId, selectedOrganization]);

  React.useEffect(() => {}, [showEditForm]);

  React.useEffect(() => {
    if (employeeId != null) {
      userService
        .getByEmployeeId(employeeId)
        .then((data) => {
          setUser(data);
        })
        .catch((error) => console.log(error));
    } else {
      setUser(null);
    }
  }, [employeeId]);

  const handleSearch = (e) => {
    const searchTerm = e.target.value;
    setSearchText(searchTerm);
  };

  const getUsers = () => {
    courseManagerService
      .getAll(
        pageId,
        recordsPerPage,
        searchText,
        selectedOrganization.organizationId
      )
      .then((data) => {
        setUsers(data.users);
        setTotalNumberOfRecords(data.totalNumberOfRecords);
      })
      .catch((err) => console.log('getAll', err));
  };

  const handleUserEdit = (employeeId) => {
    setShowEditForm(true);
    setEmployeeId(employeeId);
  };

  const handleEdited = () => {
    setEmployeeId(null);
    setShowEditForm(false);
    getUsers();
  };

  const handleCanceled = () => {
    setEmployeeId(null);
    setShowEditForm(false);
  };

  const handleAddNew = () => {
    setEmployeeId(null);
    setShowEditForm(true);
  };

  const handleFilterOrganization = (organization) => {
    //console.log("Selected Organization:", Organization)
    setFilterOrganizationId(
      (organization && organization.organizationId) || null
    );
  };

  return (
    <React.Fragment>
      <Container>
        <HeaderMain title="Managers" />
        {showEditForm && (
          <Row>
            <CmEdit
              user={user}
              // setEmployeeId={setEmployeeId}
              onEdited={handleEdited}
              onCancel={handleCanceled}
            />
          </Row>
        )}

        {!showEditForm && (
          <ListUsers
            users={users}
            pageId={pageId}
            setPageId={setPageId}
            onSearch={handleSearch}
            onUserEdit={handleUserEdit}
            recordsPerPage={recordsPerPage}
            totalNumberOfRecords={totalNumberOfRecords}
            searchText={searchText}
            onAddNew={handleAddNew}
            getUsers={getUsers}
          />
        )}
      </Container>
    </React.Fragment>
  );
};

export default AdminCm;
