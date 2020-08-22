import React, { useState } from 'react';
import { Container, Card, CardFooter, Col, Row, Table } from '@/components';
import { HeaderMain } from '@/routes/components/HeaderMain';
import { HeaderDemo } from '@/routes/components/HeaderDemo';
import ListGroups from './ListGroups';
import AddEditGroup from './AddEditGroups';

const Groups = (props) => {
  const [showGroupForm, setShowGroupForm] = useState(false);

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
          <AddEditGroup showGroupForm={setShowGroupForm} />
        ) : (
          <ListGroups groupId={1} showGroupForm={setShowGroupForm} />
        )}
      </Row>
    </Container>
  );
};

export default Groups;
