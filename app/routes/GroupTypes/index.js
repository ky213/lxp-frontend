import React from 'react';
import { Container, Card, CardFooter, Col, Row, Table } from '@/components';

import { HeaderMain } from '@/routes/components/HeaderMain';
import AddEditGroupType from './AddEditGroupType';
import ListGroupTypes from './ListGroupTypes';
import { groupTypesService } from '@/services';
import { Role } from '@/helpers';

import { HeaderDemo } from '@/routes/components/HeaderDemo';
import { useAppState } from '@/components/AppState';

const GroupTypes = () => {
  const [{ currentUser, selectedOrganization }, dispatch] = useAppState();
  const isSuperAdmin =
    currentUser && currentUser.user && currentUser.user.role == Role.SuperAdmin;
  const [groupId, setGroupId] = React.useState(null);
  const [groupTypes, setGroupTypes] = React.useState([]);
  const [selectedGroupType, setSelectedGroupType] = React.useState({});

  const [showGroupTypeForm, setShowGroupTypeForm] = React.useState(false);
  const [searchText, setSearchText] = React.useState(null);
  const [pageId, setPageId] = React.useState(1);
  const [recordsPerPage, setRecordsPerPage] = React.useState(15);
  const [totalNumberOfRecords, setTotalNumberOfRecords] = React.useState(0);
  const [selectedGroupTypes, setSelectedGroupTypes] = React.useState([]);

  const getGroupTypes = () => {
    groupTypesService
      .getAll(
        selectedOrganization && selectedOrganization.organizationId,
        pageId,
        recordsPerPage,
        searchText
      )
      .then((data) => {
        //console.log("Got GroupTypes: ", data)
        setGroupTypes(data.groupTypes);
        setTotalNumberOfRecords(data.totalNumberOfRecords);
      });
  };

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  const handleGroupTypeCreate = () => {
    setSelectedGroupType(null);
    setShowGroupTypeForm(true);
  };

  const handleCancelCreate = () => {
    /* console.log("Handle cancel create"); */
    setSelectedGroupType(null);
    setShowGroupTypeForm(false);
  };

  const handleGroupTypeEdit = (groupType) => {
    //console.log("handleGroupTypeEdit ====>   ", groupTypeId)
    setSelectedGroupType(groupType);
    setShowGroupTypeForm(true);
  };

  const handleEdited = () => {
    getGroupTypes();
    setSelectedGroupType(null);
    setShowGroupTypeForm(false);
  };

  const handleSelected = (groupTypeId, e) => {
    //console.log("Selected Group Types ====>   ", groupTypeId)

    if (e.target.checked) {
      setSelectedGroupTypes([...selectedGroupTypes, groupTypeId]);
    } else {
      setSelectedGroupTypes(selectedGroupTypes.filter((p) => p != groupTypeId));
    }

    /* console.log("Selected Group Types", selectedGroupTypes) */
  };

  React.useEffect(() => {
    getGroupTypes();
  }, [pageId, searchText]);

  return (
    <React.Fragment>
      <Container>
        <HeaderMain
          title={`${(showGroupTypeForm && 'Group Types') || 'Group Types'}`}
        />

        {showGroupTypeForm && (
          <>
            <Row>
              <Col lg={12}>
                <HeaderDemo
                  title="Create/Edit group type"
                  subTitle="You can create a new group type or change existing group type settings like the name, etc. here"
                />
              </Col>
            </Row>
            <Row>
              <AddEditGroupType
                groupType={selectedGroupType}
                onEdited={handleEdited}
                onCancelCreate={handleCancelCreate}
              />
            </Row>
          </>
        )}

        {!showGroupTypeForm && (
          <>
            <Row>
              <Col lg={12}>
                <HeaderDemo
                  no={1}
                  title="Group Types"
                  subTitle="You can search, edit and create new group types from here"
                />
              </Col>
            </Row>
            <Row>
              <ListGroupTypes
                groupTypes={groupTypes}
                onSearch={handleSearch}
                onSelected={handleSelected}
                onGroupTypeCreate={handleGroupTypeCreate}
                onGroupTypeEdit={handleGroupTypeEdit}
                pageId={pageId}
                setPageId={setPageId}
                onSearch={handleSearch}
                recordsPerPage={recordsPerPage}
                totalNumberOfRecords={totalNumberOfRecords}
                searchText={searchText}
                selectedGroupTypes={selectedGroupTypes}
              />
            </Row>
          </>
        )}
      </Container>
    </React.Fragment>
  );
};

export default GroupTypes;
