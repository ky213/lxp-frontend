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
import { NotificationRow } from "./NotificationRow";
import { Paginations } from "@/routes/components/Paginations";
import ThemedButton from "@/components/ThemedButton";

const ListNotifications = ({
  notifications,
  pageId,
  setPageId,
  recordsPerPage,
  onShowNotification,
  totalNumberOfRecords,
  searchText,
  onChangeIsRead
}) => {
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
                      placeholder="Search for..."
                      defaultValue={searchText || ''}
                    />
                    <InputGroupAddon addonType="append">
                      <Button color="secondary" outline>
                        <i className="fa fa-search"></i>
                      </Button>
                    </InputGroupAddon>
                  </InputGroup>
                </div>

              </div>
            </Col>
          </Row>

          <Row>
            <Col>
              <Table className="mb-0" hover responsive>
                <thead>
                  <tr>
                    <th></th>
                    <th className="align-middle bt-0">Type</th>
                    <th className="align-middle bt-0">Text</th>
                    <th className="align-middle bt-0">Read?</th>
                    <th className="align-middle bt-0 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {(notifications && notifications.length > 0 &&
                    notifications.map(not => (
                      <NotificationRow
                        notification={not}
                        onShowNotification={onShowNotification}
                        onChangeIsRead={onChangeIsRead}
                      />
                    ))) || (
                    <tr>
                      <td colSpan={4}>No notifications yet.</td>
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

export default ListNotifications;
