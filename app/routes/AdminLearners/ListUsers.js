import React from 'react';
import { useIntl } from 'react-intl';
import { Link } from 'react-router-dom';
import { Typeahead } from 'react-bootstrap-typeahead';
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
import { UserRowLearner } from './UserRowLearner';
import { Paginations } from '@/routes/components/Paginations';
import ThemedButton from '@/components/ThemedButton';
import { useAppState } from '@/components/AppState';
import { userService, groupsService, courseService } from '@/services';
import { uniq } from 'lodash';
import { toast } from 'react-toastify';

const ListUsers = ({
  users,
  pageId,
  setPageId,
  recordsPerPage,
  onUserEdit,
  onSearch,
  totalNumberOfRecords,
  searchText,
  onAddNew,
  getUsers,
}) => {
  const intl = useIntl();

  const [{ selectedOrganization }] = useAppState();
  const [selectedEmployees, setSelectedEmployees] = React.useState([]);
  const [groups, setGroups] = React.useState([]);
  const [courses, setCourses] = React.useState([]);

  let selectedGroupNames = [];
  let selectedCourseNames = [];

  React.useEffect(() => {
    groupsService
      .getAll(selectedOrganization?.organizationId)
      .then((response) => setGroups(response.groups))
      .catch((error) => {
        console.log('groups error:', error);
      });

    courseService
      .getAll(selectedOrganization.organizationId)
      .then((response) => {
        setCourses(response.courses);
      })
      .catch((error) => {
        console.log('courses error:', error);
      });
  }, []);

  const onSelected = (employeeId, e) => {
    if (e.target.checked) {
      setSelectedEmployees([...selectedEmployees, employeeId]);
    } else {
      setSelectedEmployees(selectedEmployees.filter((e) => e != employeeId));
    }
  };

  const onDelete = async () => {
    const message =
      selectedEmployees.length == 1 ? 'this learner' : 'these learners';
    if (confirm(`Are you sure you want to delete ${message}?`)) {
      try {
        await userService.deleteEmployees(
          selectedOrganization.organizationId,
          selectedEmployees
        );
        toast.success(
          <div>
            <h4 className="text-success">Success</h4>
            <p>User has been deleted</p>
          </div>,
          { autoClose: 5000 }
        );
        getUsers();
        setSelectedEmployees([]);
      } catch (error) {
        console.log('Error while deleting learners:', error);
        toast.error(
          <div>
            <h4 className="text-danger">Error</h4>
            <p>{JSON.stringify(error)}</p>
          </div>
        );
      }
    }
  };

  const onUpdateBulk = () => {
    const selectedUsers = users.filter(({ employeeId }) =>
      selectedEmployees.includes(employeeId)
    );
    const payload = selectedUsers.map(
      ({ employeeId, groupIds, joinedCourses }) => {
        const selectedGroups = groups
          .filter((group) => selectedGroupNames.includes(group.name))
          .map(({ groupId }) => groupId);

        const selectedCourses = courses
          .filter((course) => selectedCourseNames.includes(course.name))
          .map(({ courseId }) => courseId);

        return {
          employeeId,
          groupIds: uniq([
            ...groupIds.map(({ groupId }) => groupId),
            ...selectedGroups,
          ]),
          joinedCourses: uniq([
            ...joinedCourses.map(({ courseId }) => courseId),
            ...selectedCourses,
          ]),
        };
      }
    );

    userService
      .updateBulk(payload, selectedOrganization.organizationId)
      .then(() => {
        toast.success(
          <div>
            <h4 className="text-success">Success</h4>
            <p>Users have been updated</p>
          </div>,
          { autoClose: 5000 }
        );
      })
      .catch((error) => {
        toast.error(
          <div>
            <h4 className="text-danger">Error</h4>
            <p>{JSON.stringify(error)}</p>
          </div>
        );
      });
  };

  return (
    <React.Fragment>
      <Card className="mb-3">
        <CardBody>
          <Row>
            <Col lg={12}>
              <div className="d-lg-flex justify-content-end">
                <div className="mr-auto d-flex align-items-center mb-3 mb-lg-0">
                  <InputGroup>
                    <Input
                      onKeyUp={(e) => onSearch(e)}
                      placeholder="Search for name..."
                      defaultValue={searchText}
                    />
                    <InputGroupAddon addonType="append">
                      <Button color="secondary" outline>
                        <i className="fa fa-search"></i>
                      </Button>
                    </InputGroupAddon>
                  </InputGroup>
                </div>
                <ButtonToolbar>
                  {selectedEmployees && selectedEmployees.length > 0 && (
                    <ButtonGroup className="mr-2">
                      <Button
                        color="link"
                        onClick={onDelete}
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
                  <ThemedButton
                    className="align-self-center"
                    tag={Link}
                    to="/admin/users/csv/learners"
                    id="tooltipImportFromCsv"
                  >
                    <i className="fa fa-fw fa-file-excel-o"></i>
                  </ThemedButton>
                  <UncontrolledTooltip
                    placement="bottom"
                    target="tooltipImportFromCsv"
                  >
                    Import from CSV
                  </UncontrolledTooltip>
                  &nbsp;
                  <ThemedButton
                    className="align-self-center"
                    onClick={() => onAddNew()}
                    id="tooltipAddNew"
                  >
                    <i className="fa fa-fw fa-pencil"></i>
                  </ThemedButton>
                  <UncontrolledTooltip
                    placement="bottom"
                    target="tooltipAddNew"
                  >
                    Add New Learner
                  </UncontrolledTooltip>
                </ButtonToolbar>
              </div>
            </Col>
          </Row>
          <Row className="mt-3">
            <Col lg={12}>
              {selectedEmployees.length > 0 && (
                <div className="mr-auto d-flex align-items-center mb-3 mb-lg-0">
                  <div className="mr-1">
                    <Typeahead
                      id="groupNames"
                      name="groupNames"
                      placeholder="select groups..."
                      options={groups.map(({ name }) => name)}
                      selected={selectedGroupNames}
                      onChange={(selectedOptions) =>
                        (selectedGroupNames = selectedOptions)
                      }
                      multiple
                    />
                  </div>
                  <div className="">
                    <Typeahead
                      id="courseNames"
                      name="courseNames"
                      placeholder="select courses..."
                      options={courses.map(({ name }) => name)}
                      selected={selectedCourseNames}
                      onChange={(selectedOptions) =>
                        (selectedCourseNames = selectedOptions)
                      }
                      multiple
                    />
                  </div>
                  <ButtonGroup className="mr-2">
                    <Button
                      color="primary"
                      onClick={onUpdateBulk}
                      className="ml-1 align-self-center"
                      id="addBulkUsers"
                    >
                      Add
                    </Button>
                    <UncontrolledTooltip
                      placement="bottom"
                      target="addBulkUsers"
                    >
                      Add bulk users to groups
                    </UncontrolledTooltip>
                  </ButtonGroup>
                </div>
              )}
            </Col>
          </Row>
          <Row>
            <Col>&nbsp;</Col>
          </Row>
          <Row>
            <Col>
              <Table className="mb-0" hover responsive>
                <thead>
                  <tr>
                    <th className="align-middle bt-0"></th>
                    <th className="align-middle bt-0"></th>
                    <th className="align-middle bt-0 text-center"></th>
                    <th className="align-middle bt-0">Last name</th>
                    <th className="align-middle bt-0">First name</th>
                    <th className="align-middle bt-0">Email</th>
                    <th className="align-middle bt-0">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {(users &&
                    users.length > 0 &&
                    users.map((user) => (
                      <UserRowLearner
                        props={user}
                        onUserEdit={onUserEdit}
                        rowKey={user.userId}
                        onSelected={onSelected}
                      />
                    ))) || (
                    <tr>
                      <td colSpan={8}>There's no learners yet.</td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </Col>
          </Row>
        </CardBody>
        <CardFooter className="d-flex justify-content-center pb-0">
          <Paginations
            pageId={pageId}
            setPageId={setPageId}
            totalNumber={totalNumberOfRecords}
            recordsPerPage={recordsPerPage}
          />
        </CardFooter>
      </Card>
    </React.Fragment>
  );
};

export default ListUsers;
