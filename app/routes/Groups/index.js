import React, { useState, useEffect } from 'react';
import { useAppState } from '@/components/AppState';
import { Container, Card, CardFooter, Col, Row, Table } from '@/components';
import { HeaderMain } from '@/routes/components/HeaderMain';
import { HeaderDemo } from '@/routes/components/HeaderDemo';
import ListGroups from './ListGroups';
import AddEditGroup from './AddEditGroups';
import { groupsService } from '@/services';

const Groups = (props) => {
  const [showGroupForm, setShowGroupForm] = useState(false);
  const [groups, setGroups] = useState([]);
  const [group, setGroup] = useState({});
  const [
    {
      currentUser,
      selectedOrganization: { organizationId },
    },
    dispatch,
  ] = useAppState();

  useEffect(() => {
    groupsService
      .getAll(organizationId)
      .then((response) => setGroups(response.groups));
  }, []);

  const handleGroupEdit = (groupData) => {
    setGroup(groupData);
    setShowGroupForm(true);
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
            showGroupForm={(e) => setShowGroupForm(e)}
            group={group}
            onGroupEdit={handleGroupEdit}
            organizationId={organizationId}
          />
        ) : (
          <ListGroups
            groups={groups}
            showGroupForm={setShowGroupForm}
            onGroupEdit={handleGroupEdit}
          />
        )}
      </Row>
    </Container>
  );
};

export default Groups;
