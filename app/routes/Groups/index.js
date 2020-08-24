import React, { useState } from 'react';
import { useAppState } from '@/components/AppState';
import { Container, Col, Row } from '@/components';
import { HeaderMain } from '@/routes/components/HeaderMain';
import { HeaderDemo } from '@/routes/components/HeaderDemo';
import ListGroups from './ListGroups';
import AddEditGroup from './AddEditGroups';
import { Role } from '@/helpers';

const Groups = (props) => {
  const [showGroupForm, setShowGroupForm] = useState(false);
  const [group, setGroup] = useState({});
  const [
    {
      currentUser,
      selectedOrganization: { organizationId },
    },
  ] = useAppState();
  const isSuperAdmin =
    currentUser && currentUser.user && currentUser.user.role == Role.SuperAdmin;

  const handleGroupEdit = (groupData) => {
    setGroup(groupData);
    setShowGroupForm(true);
  };

  const hideGroupForm = () => {
    setShowGroupForm(false);
    setGroup({});
  };

  return (
    <Container>
      <HeaderMain title={'Groups'} />
      <Row>
        <Col lg={12}>
          <HeaderDemo
            title="Create/Edit Groups"
            subTitle="You can create a new group or change existing group settings."
          />
        </Col>
      </Row>
      <Row>
        {showGroupForm ? (
          <AddEditGroup
            hideGroupForm={hideGroupForm}
            group={group}
            onGroupEdit={handleGroupEdit}
            organizationId={organizationId}
          />
        ) : (
          <ListGroups
            showGroupForm={setShowGroupForm}
            onGroupEdit={handleGroupEdit}
            organizationId={organizationId}
            isSuperAdmin={isSuperAdmin}
          />
        )}
      </Row>
    </Container>
  );
};

export default Groups;
