import React from 'react'
import { useIntl } from 'react-intl'
import { Link } from 'react-router-dom'
import { uniq } from 'lodash'
import { Typeahead } from 'react-bootstrap-typeahead'
import { toast } from 'react-toastify'
import {
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
} from '@/components'
import { UserRowCm } from './UserRowCm'
import { Paginations } from '@/routes/components/Paginations'
import ThemedButton from '@/components/ThemedButton'
import { useAppState } from '@/components/AppState'
import { userService, groupsService } from '@/services'
import { hot } from 'react-hot-loader'

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
  const intl = useIntl()

  const [{ currentUser, selectedOrganization }, dispatch] = useAppState()
  const [selectedEmployees, setSelectedEmployees] = React.useState([])
  const [groups, setGroups] = React.useState([])
  let selectedGroupNames = []

  React.useEffect(() => {
    groupsService
      .getAll(selectedOrganization?.organizationId)
      .then(response => setGroups(response.groups))
      .catch(error => {
        console.log('groups error:', error)
      })
  }, [])

  const onSelected = (employeeId, e) => {
    if (e.target.checked) {
      setSelectedEmployees([...selectedEmployees, employeeId])
    } else {
      setSelectedEmployees(selectedEmployees.filter(e => e != employeeId))
    }
  }

  const onDelete = async () => {
    const message =
      selectedEmployees.length == 1
        ? 'this course manager'
        : 'these course managers'
    if (confirm(`Are you sure you want to delete ${message}?`)) {
      try {
        await userService.deleteEmployees(
          selectedOrganization.organizationId,
          selectedEmployees
        )
        toast.success(
          <div>
            <h4 className="text-success">Success</h4>
            <p>User has been deleted</p>
          </div>,
          { autoClose: 5000 }
        )
        getUsers()
        setSelectedEmployees([])
      } catch (error) {
        toast.error(
          <div>
            <h4 className="text-danger">Error</h4>
            <p>{error}</p>
          </div>
        )
      }
    }
  }

  const onUpdateBulk = () => {
    const selectedUsers = users.filter(({ employeeId }) =>
      selectedEmployees.includes(employeeId)
    )
    const payload = selectedUsers.map(
      ({ userId, employeeId, groupIds, joinedCourses }) => {
        const userGroupIds = groupIds.map(({ groupId }) => groupId)
        const selectedGroups = groups
          .filter(group => selectedGroupNames.includes(group.name))
          .map(({ groupId }) => groupId)
          .filter(groupId => !userGroupIds.includes(groupId))

        return {
          userId,
          employeeId,
          groupIds: selectedGroups,
        }
      }
    )

    userService
      .updateBulk(payload, selectedOrganization.organizationId)
      .then(() => {
        toast.success(
          <div>
            <h4 className="text-success">Success</h4>
            <p>Users have been updated</p>
          </div>,
          { autoClose: 5000 }
        )
      })
      .catch(error => {
        toast.error(
          <div>
            <h4 className="text-danger">Error</h4>
            <p>{JSON.stringify(error)}</p>
          </div>
        )
      })
  }

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
                      onKeyUp={e => onSearch(e)}
                      placeholder="Search for name..."
                      defaultValue={searchText}
                    />
                    <InputGroupAddon addonType="append">
                      <Button color="secondary" outline loading>
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
                    to="/admin/users/csv/coursemanagers"
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
                    key="createNew"
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
                    Add New Course Manager
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
                      onChange={selectedOptions =>
                        (selectedGroupNames = selectedOptions)
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
          <Col>&nbsp;</Col>
          <Row>
            <Col>
              <Row>
                <Col className="d-flex">
                  <p className="mr-3 ml-auto">Total: {totalNumberOfRecords}</p>
                </Col>
              </Row>
              <Table className="mb-0" hover responsive>
                <thead>
                  <tr>
                    <th className="align-middle bt-0"></th>
                    <th className="align-middle bt-0"></th>
                    <th className="align-middle bt-0 text-center"></th>
                    <th className="align-middle bt-0">Last name</th>
                    <th className="align-middle bt-0">First name</th>
                    <th className="align-middle bt-0">Email</th>
                    <th className="align-middle bt-0">Role</th>
                    <th className="align-middle bt-0">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {(users &&
                    users.length > 0 &&
                    users.map(user => (
                      <UserRowCm
                        props={user}
                        onUserEdit={onUserEdit}
                        key={user.userId}
                        onSelected={onSelected}
                      />
                    ))) || (
                    <tr>
                      <td colSpan={7}>There's no course managers yet.</td>
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
  )
}

export default hot(module)(ListUsers)
