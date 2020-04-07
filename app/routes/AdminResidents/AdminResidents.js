import React from "react";
import { Link } from "react-router-dom";
import {
  Button,
  ButtonToolbar,
  Col,
  Container,
  Card,
  CardFooter,
  Row,
  Table
} from "@/components";
import { HeaderMain } from "@/routes/components/HeaderMain";
import ListUsers from "./ListUsers";
import {
  userService,
  residentService
} from "@/services";
import ResidentEdit from "./ResidentEdit";
import { useAppState } from '@/components/AppState';

const AdminResidents = () => {
  const [{currentUser, selectedInstitute}, dispatch] = useAppState();
  const loggedInUser = currentUser && currentUser.user;

  const recordsPerPage = 15;
  const [showEditForm, setShowEditForm] = React.useState(false);
  const [searchText, setSearchText] = React.useState(null);
  const [employeeId, setEmployeeId] = React.useState(null);
  const [user, setUser] = React.useState(null);
  const [users, setUsers] = React.useState(null);
  const [pageId, setPageId] = React.useState(1);
  const [totalNumberOfRecords, setTotalNumberOfRecords] = React.useState(0);  

  React.useEffect(() => {
    getUsers();
  }, [searchText, pageId]);

  React.useEffect(() => {
    if (employeeId != null) {
      userService
        .getByEmployeeId(employeeId)
        .then(data => {
          setUser(data);
        })
        .catch(error => console.log(error));
    } else {
      setUser(null);
    }
  }, [employeeId]);

  React.useEffect(() => {
    if (user) {
      setShowEditForm(true);
    }
  }, [user]);

  const handleSearch = e => {
    const searchTerm = e.target.value;
    setSearchText(searchTerm);
  };

  const getUsers = () => {
    residentService
      .getAll(pageId, recordsPerPage, searchText, selectedInstitute.instituteId)
      .then(data => {
        // console.log('data', data);
        setUsers(data.users);
        setTotalNumberOfRecords(data.totalNumberOfRecords);
      })
      .catch(err => console.log("getAll", err));
  };

  const handleUserEdit = employeeId => {
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

  return (
    <React.Fragment>
      <Container>
        <HeaderMain title="Residents" />
        {showEditForm && (
          <Row>
            <ResidentEdit
              user={user}
              setEmployeeId={setEmployeeId}
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

export default AdminResidents;
