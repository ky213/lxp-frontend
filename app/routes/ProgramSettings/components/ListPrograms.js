import React from 'react';
import { useIntl } from "react-intl";
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
import { ProgramRow } from "./ProgramRow";
import { Paginations } from "../../components/Paginations";

const ListPrograms = ({
  programs,
  onProgramEdit,
  onProgramCreate,
  onSearch,
  onSelected
}) => {
  const intl = useIntl();

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
                        onKeyUp={e => onSearch(e)}
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
                    {/*
                                        <ButtonGroup className="mr-2">
                                            <Button color="link" className="text-decoration-none align-self-center" id="tooltipRefresh">
                                                <i className="fa fa-fw fa-refresh"></i>
                                            </Button>
                                            <UncontrolledTooltip placement="bottom" target="tooltipRefresh">
                                                Refresh
                                            </UncontrolledTooltip>
                                            <Button color="link" className="text-decoration-none align-self-center" id="tooltipFav">
                                                <i className="fa fa-fw fa-star"></i>
                                            </Button>
                                            <UncontrolledTooltip placement="bottom" target="tooltipFav">
                                                Add to Favorites
                                            </UncontrolledTooltip>
                                            <Button color="link" className="text-decoration-none align-self-center" id="tooltipTag">
                                                <i className="fa fa-fw fa-tag"></i>
                                            </Button>
                                            <UncontrolledTooltip placement="bottom" target="tooltipTag">
                                                Tag
                                            </UncontrolledTooltip>
                                            <Button color="link" className="text-decoration-none align-self-center" id="tooltipBan">
                                                <i className="fa fa-fw fa-ban"></i>
                                            </Button>
                                            <UncontrolledTooltip placement="bottom" target="tooltipBan">
                                                Ban this User
                                            </UncontrolledTooltip>
                                            <Button color="link" className="text-decoration-none align-self-center" id="tooltipDelete">
                                                <i className="fa fa-fw fa-trash"></i>
                                            </Button>
                                            <UncontrolledTooltip placement="bottom" target="tooltipDelete">
                                                Delete
                                            </UncontrolledTooltip>
                                        </ButtonGroup>
                                        */}
                   {/*  <ButtonGroup className="ml-auto ml-lg-0">
                      <Button
                        color="primary"
                        className="align-self-center"
                        onClick={e => onSelected(e)}
                        id="tooltipAddNew"
                      >
                        <i className="fa fa-fw fa-pencil"></i>
                      </Button>
                      <UncontrolledTooltip
                        placement="bottom"
                        target="tooltipAddNew"
                      >
                        Add New Program
                      </UncontrolledTooltip>
                    </ButtonGroup> */}
                  </ButtonToolbar>
                </div>
              </CardBody>

              <Table className="mb-0" hover responsive>
                <thead>
                  <tr>
                    <th className="align-middle bt-0"></th>
                    <th className="align-middle bt-0">Name</th>
                    <th className="align-middle bt-0">Program director/s</th>
                    <th className="align-middle bt-0 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {(programs &&
                    programs.length > 0 &&
                    programs.map(program => (
                      <ProgramRow
                        props={program}
                        onSelected={onSelected}
                        onProgramEdit={onProgramEdit}
                        key={program.programId}
                      />
                    ))) || (
                      <tr>
                        <td colSpan={6}>No programs yet.</td>
                      </tr>
                    )}
                </tbody>
              </Table>

              {/* END Table */}
              <CardFooter className="d-flex justify-content-center pb-0">
                <Paginations />
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
};

export default ListPrograms;
