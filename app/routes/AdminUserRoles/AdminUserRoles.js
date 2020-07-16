import React from "react";
import {
  Avatar,
  Button,
  Col,
  Container,
  Card,
  CardBody,
  Row,
  Table
} from "@/components";
import { HeaderMain } from "@/routes/components/HeaderMain";
import { Typeahead } from "react-bootstrap-typeahead";
import { roleService, employeeRoleService } from "@/services";
import { useAppState } from '@/components/AppState';

const AdminUserRoles = () => {
  const [{selectedOrganization}] = useAppState();
  const [roles, setRoles] = React.useState([]);
  const [selectedRoleId, setSelectedRoleId] = React.useState();
  const [employeeRoles, setEmployeeRoles] = React.useState(null);
  const [pageContent, setPageContent] = React.useState("");

  React.useEffect(() => {
    roleService.getAll().then(data => {
      setRoles(data)});
  }, []);

  React.useEffect(() => {
    if (selectedRoleId) {
      employeeRoleService
        .getByRoleId(selectedRoleId, selectedOrganization.organizationId)
        .then(data => {console.log(data);setEmployeeRoles(data)});
    } else {
      setEmployeeRoles(null);
    }
  }, [selectedRoleId]);

  React.useEffect(() => {
    if (
      employeeRoles &&
      employeeRoles.employee_roles &&
      employeeRoles.employee_roles.length > 0
    ) {
      let pc = (
        <Table className="mb-0" hover responsive>
          <thead>
            <tr>
              <th className="align-middle bt-0"></th>
              <th className="align-middle bt-0">Last name</th>
              <th className="align-middle bt-0">First name</th>
              <th className="align-middle bt-0">Email</th>              
            </tr>
          </thead>
          <tbody>
            {employeeRoles.employee_roles.map(er => (
              <tr key={er.employeeId}>
                <td className="align-middle">
                  <Avatar.Image
                    src={er.profilePhoto}
                    className="align-self-center"
                  />
                </td>
                <td className="align-middle">{er.surname}</td>
                <td className="align-middle">{er.name}</td>
                <td className="align-middle">{er.email}</td>                
              </tr>
            ))}
          </tbody>
        </Table>
      );

      setPageContent(pc);
    } else {
      if (selectedRoleId)
        setPageContent("There are no users assigned with the role");
      else setPageContent("");
    }
  }, [employeeRoles]);

  const onChange = e => {
    if (e && e.length > 0) {
      let roleId = e[0].role_id;
      setSelectedRoleId(roleId);
    } else {
      setSelectedRoleId(null);
    }
  };

  return (
    <React.Fragment>
      <Container>
        <HeaderMain title="User roles" />
        <Card className="mb-3">
          <CardBody>
            <Row>
              <Col lg={4}>
                <Typeahead
                  clearButton
                  id="roles"
                  labelKey="name"
                  options={roles}
                  placeholder="Select role..."
                  onChange={e => onChange(e)}
                />
              </Col>
            </Row>
            <Row>
              <br />
            </Row>
            <Row>{pageContent}</Row>
          </CardBody>
        </Card>
      </Container>
    </React.Fragment>
  );
};

export default AdminUserRoles;
