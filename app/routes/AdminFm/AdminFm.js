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
  facultyMemberService  
} from "@/services";
import FmEdit from "./FmEdit";
import { useAppState } from '@/components/AppState';

const AdminFm = () => {
  const [{selectedInstitute}] = useAppState();
  const [showEditForm, setShowEditForm] = React.useState(false);
  const [searchText, setSearchText] = React.useState(null);
  const [employeeId, setEmployeeId] = React.useState(null);
  const [user, setUser] = React.useState(null);
  const [users, setUsers] = React.useState(null);
  const [pageId, setPageId] = React.useState(1);
  const [recordsPerPage, setRecordsPerPage] = React.useState(15);
  const [totalNumberOfRecords, setTotalNumberOfRecords] = React.useState(0);
  const [filterInstituteId, setFilterInstituteId] = React.useState(null);


  React.useEffect(() => {
    getUsers();
  }, [searchText, pageId, selectedInstitute]);

  React.useEffect(() => {}, [showEditForm]);

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

  const handleSearch = e => {
    const searchTerm = e.target.value;
    setSearchText(searchTerm);
  };

  const getUsers = () => {
    facultyMemberService
      .getAll(pageId, recordsPerPage, searchText, selectedInstitute.instituteId)
      .then(data => {
        // console.log('getUsers', data);
        setUsers(data.users);
        setTotalNumberOfRecords(data.totalNumberOfRecords);
      })
      .catch(err => console.log("getAll", err));
  };

  const handleUserEdit = employeeId => {
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

  const handleFilterInstitute = (institute) => {
    //console.log("Selected institute:", institute)
    setFilterInstituteId(institute && institute.instituteId || null)
  }

  return (
    <React.Fragment>
      <Container>
        <HeaderMain title="Faculty members" />
        {showEditForm && (
          <Row>
            <FmEdit
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

export default AdminFm;
