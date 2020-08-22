import React from 'react';
import { Container, Card, CardFooter, Col, Row, Table } from '@/components';
import { HeaderMain } from '@/routes/components/HeaderMain';
import { HeaderDemo } from '@/routes/components/HeaderDemo';
import ListGroups from './ListGroups';
import AddEditGroup from './AddEditGroups';

const Groups = (props) => {
  const [selectedGroupId, setSelectedGroupId] = React.useState(null);
  const [showGroupForm, setShowGroupForm] = React.useState(false);

  const handleGroupCreate = () => {
    setSelectedGroupId(null);
    setShowGroupForm(true);
  };

  return (
    <Container>
      <HeaderMain title={'Groups'} />
      <Row>
        <Col lg={12}>
          <HeaderDemo
            title="Create/Edit Groups"
            subTitle="You can create a new group or change existing group settings like the name, group director, etc. here"
          />
        </Col>
      </Row>
      <Row>
        {/* <ListGroups groupId={1} onEdited={() => {}} onCancelCreate={() => {}} /> */}
        <AddEditGroup />
      </Row>
    </Container>
  );
};

export default Groups;
