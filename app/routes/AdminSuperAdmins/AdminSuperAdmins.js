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
import ListUsers from './UserList';
import { superAdminService } from '@/services';
import UserEdit from './UserEdit';
import { useAppState } from '@/components/AppState';

const AdminSuperAdmins = () => {
  const [showEditForm, setShowEditForm] = React.useState(false);
  const [userId, setUserId] = React.useState(null);
  const [user, setUser] = React.useState(null);
  const [users, setUsers] = React.useState(null);

  React.useEffect(() => {
    getUsers();
  }, []);

  React.useEffect(() => {}, [showEditForm]);

  React.useEffect(() => {
    if (userId) {
      superAdminService
        .getByUserId(userId)
        .then((data) => {
          setUser(data);
        })
        .catch((error) => console.log(error));
    } else {
      setUser(null);
    }
  }, [userId]);

  const getUsers = () => {
    superAdminService
      .getAll()
      .then((data) => {
        setUsers(data);
      })
      .catch((err) => console.log('getAll', err));
  };

  const handleUserEdit = (userId) => {
    setShowEditForm(true);
    setUserId(userId);
  };

  const handleEdited = () => {
    setUserId(null);
    setShowEditForm(false);
    getUsers();
  };

  const handleCanceled = () => {
    setUserId(null);
    setShowEditForm(false);
  };

  const handleAddNew = () => {
    setUserId(null);
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
        <HeaderMain title="Super admins" />
        {showEditForm && (
          <Row>
            <UserEdit
              user={user}
              onEdited={handleEdited}
              onCancel={handleCanceled}
            />
          </Row>
        )}

        {!showEditForm && (
          <ListUsers
            users={users}
            onUserEdit={handleUserEdit}
            onAddNew={handleAddNew}
          />
        )}
      </Container>
    </React.Fragment>
  );
};

export default AdminSuperAdmins;
