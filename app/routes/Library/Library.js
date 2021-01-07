import React, { useState } from 'react'
import { hot } from 'react-hot-loader'

import { HeaderMain } from '@/routes/components/HeaderMain'
import { Paginations } from '@/routes/components/Paginations'
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardFooter,
  Input,
  InputGroup,
  InputGroupAddon,
  Button,
  ButtonGroup,
  ButtonToolbar,
  UncontrolledTooltip,
  Table,
} from '@/components'

const Library = () => {
  const [files, setFiles] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9])
  const [selectedFiles, setSelectedFiles] = useState([])
  const [pageId, setPageId] = useState(0)
  const [totalNumberOfRecords, setTotalNumberOfRecords] = useState(0)
  const [recordsPerPage, setRecordsPerPage] = useState(10)

  const handleSearch = event => {}

  const handleDelete = event => {}

  return (
    <Container>
      <HeaderMain title="The Library" />
      <Row></Row>
      <Row>
        <Col lg={12}>
          <Card className="mb-3">
            <CardBody>
              <div className="d-lg-flex justify-content-end">
                <div className="mr-auto d-flex align-items-center mb-3 mb-lg-0">
                  <InputGroup>
                    <Input onKeyUp={handleSearch} placeholder="Search for..." />
                    <InputGroupAddon addonType="append">
                      <Button color="secondary" outline>
                        <i className="fa fa-search"></i>
                      </Button>
                    </InputGroupAddon>
                  </InputGroup>
                </div>
                <ButtonToolbar>
                  {selectedFiles?.length > 0 && (
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
                        Delete
                      </UncontrolledTooltip>
                    </ButtonGroup>
                  )}
                  <ButtonGroup className="ml-auto ml-lg-0">
                    <Button
                      color="primary"
                      className="align-self-center"
                      id="tooltipAddNew"
                    >
                      <i className="fa fa-fw fa-plus"></i>
                    </Button>
                    <UncontrolledTooltip
                      placement="bottom"
                      target="tooltipAddNew"
                    >
                      Add New File
                    </UncontrolledTooltip>
                  </ButtonGroup>
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
                  <th className="align-middle bt-0 text-left">Date</th>
                </tr>
              </thead>
              <tbody>
                {files.map((file, index) => (
                  <tr>
                    <td colSpan={3}>File {index}</td>
                  </tr>
                )) || (
                  <tr>
                    <td colSpan={3}>No File yet.</td>
                  </tr>
                )}
              </tbody>
            </Table>
            <CardFooter className="d-flex justify-content-center pb-0">
              <Paginations
                pageId={pageId}
                setPageId={setPageId}
                totalNumber={totalNumberOfRecords}
                recordsPerPage={recordsPerPage}
              />
            </CardFooter>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default hot(module)(Library)
