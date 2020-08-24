import React, { useState, useEffect } from 'react';
import { useIntl } from 'react-intl';
import { GroupRow } from './components/GroupRow';
import { Paginations } from '@/routes/components/Paginations';
import { groupsService } from '@/services';
import {
  Container,
  Card,
  CardFooter,
  CardBody,
  Col,
  Row,
  Table,
  Input,
  Button,
  ButtonGroup,
  InputGroup,
  InputGroupAddon,
  UncontrolledTooltip,
  ButtonToolbar,
} from '@/components';

const ListGroups = ({
  showGroupForm,
  onSearch,
  onGroupEdit,
  onDelete,
  pageId,
  setPageId,
  recordsPerPage,
  totalNumberOfRecords,
  isSuperAdmin,
  searchText,
  organizationId,
}) => {
  const intl = useIntl();
  const [groups, setGroups] = useState([]);
  const [selectedGroups, setSelectedGroups] = useState([]);

  const getAllGroups = () => {
    groupsService
      .getAll(organizationId)
      .then((response) => setGroups(response.groups));
  };

  useEffect(() => {
    getAllGroups();
  }, []);

  const handleGroupSelect = (group) => {
    const newGroupList = [...selectedGroups];
    const groupIndex = newGroupList.findIndex(
      ({ groupId }) => groupId === group.groupId
    );

    if (groupIndex == -1) {
      newGroupList.push(group);
      setSelectedGroups(newGroupList);
    } else {
      newGroupList.splice(groupIndex, 1);
      setSelectedGroups(newGroupList);
    }
  };

  const handleDelete = () => {
    if (confirm('Confirm group delete ?'))
      groupsService
        .deleteGroups(selectedGroups.map(({ groupId }) => groupId))
        .then((response) => {
          setSelectedGroups([]);
          getAllGroups();
        });
  };

  return (
    <React.Fragment>
      <Container>
        <Row>
          <Col lg={12}>
            <Card className="mb-3">
              <CardBody>
                <div className="d-lg-flex justify-content-end">
                  <div className="mr-auto d-flex align-items-center mb-3 mb-lg-0">
                    <InputGroup>
                      <Input
                        onKeyUp={(e) => onSearch(e)}
                        defaultValue={searchText}
                        placeholder="Search for..."
                      />
                      <InputGroupAddon addonType="append">
                        <Button color="secondary" outline>
                          <i className="fa fa-search"></i>
                        </Button>
                      </InputGroupAddon>
                    </InputGroup>
                  </div>
                  <ButtonToolbar>
                    {isSuperAdmin &&
                      selectedGroups &&
                      selectedGroups.length > 0 && (
                        <ButtonGroup className="mr-2">
                          <Button
                            color="secondary"
                            onClick={handleDelete}
                            className="text-decoration-none align-self-center"
                            id="tooltipDelete"
                          >
                            <i className="fa fa-fw fa-trash"></i>
                          </Button>
                          <UncontrolledTooltip
                            placement="bottom"
                            target="tooltipDelete"
                          >
                            {intl.formatMessage({ id: 'General.Delete' })}
                          </UncontrolledTooltip>
                        </ButtonGroup>
                      )}

                    {isSuperAdmin && (
                      <ButtonGroup className="ml-auto ml-lg-0">
                        <Button
                          color="primary"
                          className="align-self-center"
                          onClick={() => showGroupForm(true)}
                          id="tooltipAddNew"
                        >
                          <i className="fa fa-fw fa-pencil"></i>
                        </Button>
                        <UncontrolledTooltip
                          placement="bottom"
                          target="tooltipAddNew"
                        >
                          Add New Group
                        </UncontrolledTooltip>
                      </ButtonGroup>
                    )}
                  </ButtonToolbar>
                </div>
              </CardBody>

              <Table className="mb-0" hover responsive>
                <thead>
                  <tr>
                    <th className="align-middle bt-0 text-center">Actions</th>
                    <th className="align-middle bt-0 text-left">Name</th>
                    <th className="align-middle bt-0 text-left">type</th>
                    <th className="align-middle bt-0 text-left">Description</th>
                  </tr>
                </thead>
                <tbody>
                  {(groups &&
                    groups.length > 0 &&
                    groups.map((group) => (
                      <GroupRow
                        props={group}
                        onSelected={() => handleGroupSelect(group)}
                        onGroupEdit={() => onGroupEdit(group)}
                        key={group.groupId}
                        hideDelete={false}
                      />
                    ))) || (
                    <tr>
                      <td colSpan={3}>No groups yet.</td>
                    </tr>
                  )}
                </tbody>
              </Table>

              {totalNumberOfRecords > 0 && (
                <CardFooter className="d-flex justify-content-center pb-0">
                  <Paginations
                    pageId={pageId}
                    setPageId={setPageId}
                    totalNumber={totalNumberOfRecords}
                    recordsPerPage={recordsPerPage}
                  />
                </CardFooter>
              )}
            </Card>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
};

export default ListGroups;
