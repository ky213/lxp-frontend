import React from "react";
import { Link } from "react-router-dom";
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
  ButtonToolbar
} from "@/components";
import { UserRowResident } from "./UserRowResident";
import { Paginations } from "@/routes/components/Paginations";
import ThemedButton from "@/components/ThemedButton";
import { useAppState } from '@/components/AppState';
import { userService } from "../../services/user.service";

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
  getUsers
}) => {
  const [{selectedInstitute}] = useAppState();
  const [selectedEmployees, setSelectedEmployees] = React.useState([]);

  let paginationContent = "";
  if (totalNumberOfRecords > 0) {
    paginationContent = (
      <CardFooter className="d-flex justify-content-center pb-0">
        <Paginations
          pageId={pageId}
          setPageId={setPageId}
          totalNumber={totalNumberOfRecords}
          recordsPerPage={recordsPerPage}
        />
      </CardFooter>
    );
  }

  const onSelected = (employeeId, e) => {
    if(e.target.checked) {
      setSelectedEmployees([...selectedEmployees, employeeId]);
    }
    else {
      setSelectedEmployees(selectedEmployees.filter(e => e != employeeId));
    }
  }

  const onDelete = async () => {
    const message = selectedEmployees.length == 1 ? "this resident" : "these residents";
    if(confirm(`Are you sure you want to delete ${message}?`)) {
        try {
            await userService.deleteEmployees(selectedInstitute.instituteId, selectedEmployees);
            getUsers();
            setSelectedEmployees([]);
        }
        catch(error) {
            console.log("Error while deleting residents:", error);
            alert(`Something went wrong while deleting ${message}!`)
        }
    }
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
                      <Button color="secondary" outline>
                        <i className="fa fa-search"></i>
                      </Button>
                    </InputGroupAddon>
                  </InputGroup>
                </div>
                <ButtonToolbar>
                  {selectedEmployees && selectedEmployees.length > 0 && (
                    <ButtonGroup className="mr-2">
                        <Button color="link" onClick={onDelete} className="text-decoration-none align-self-center" id="tooltipDelete">
                            <i className="fa fa-fw fa-trash"></i>
                        </Button>
                        <UncontrolledTooltip placement="bottom" target="tooltipDelete">
                            Delete
                        </UncontrolledTooltip>
                    </ButtonGroup>
                  )}
                  <ThemedButton
                    className="align-self-center"
                    tag={Link}
                    to="/admin/users/csv/residents"
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
                    Add New Resident
                  </UncontrolledTooltip>
                </ButtonToolbar>
              </div>
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
                    <th className="align-middle bt-0">Exp. level</th>
                    <th className="align-middle bt-0">Program</th>
                    <th className="align-middle bt-0">Status</th>                   
                  </tr>
                </thead>
                <tbody>
                  {(users && users.length > 0 &&
                    users.map(user => (
                      <UserRowResident
                        props={user}
                        onUserEdit={onUserEdit}
                        key={user.userId}
                        onSelected={onSelected}
                      />
                    ))) || (
                    <tr>
                      <td colSpan={8}>There's no residents yet.</td>
                    </tr>
                  )}
                </tbody>
              </Table>

              {/* END Table */}
              {paginationContent}
            </Col>
          </Row>
        </CardBody>
      </Card>
    </React.Fragment>
  );
};

export default ListUsers;
