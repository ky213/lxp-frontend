import React, { useState, useEffect } from 'react'
import { hot } from 'react-hot-loader'
import { toast } from 'react-toastify'

import { Role } from '@/helpers'
import { useAppState } from '@/components/AppState'
import { libraryService, activityService } from '@/services'
import { HeaderMain } from '@/routes/components/HeaderMain'
import { Paginations } from '@/routes/components/Paginations'
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardFooter,
  InputGroup,
  Button,
  ButtonGroup,
  ButtonToolbar,
  UncontrolledTooltip,
  Table,
  Loading,
} from '@/components'

const Library = () => {
  const [{ selectedOrganization, currentUser }] = useAppState()
  const [files, setFiles] = useState([])
  const [file, setFile] = useState(null)
  const [selectedFiles, setSelectedFiles] = useState([])
  const [pageId, setPageId] = useState(0)
  const [totalNumberOfRecords, setTotalNumberOfRecords] = useState(0)
  const [recordsPerPage, setRecordsPerPage] = useState(10)
  const [loading, setLoading] = useState(false)
  const [loadingFiles, setLoadingFiles] = useState(false)
  const isLearner = currentUser.user.role === Role.Learner

  useEffect(() => {
    getFiles()
  }, [])

  const getFiles = async () => {
    try {
      setLoadingFiles(true)
      const response = await libraryService.getAllFiles(
        selectedOrganization.organizationId
      )
      setLoadingFiles(false)
      setFiles(response)
    } catch (error) {
      setLoadingFiles(false)
      toast.error(
        <div>
          <h4 className="text-danger">Error</h4>
          <p>{error.message}</p>
        </div>
      )
    }
  }

  const handleUpload = async () => {
    try {
      setLoading(true)
      const formData = new FormData()

      formData.append('file', file.name)

      const { url } = await libraryService.addFile(
        selectedOrganization.organizationId,
        formData
      )

      await libraryService.saveFileToGoogleStorage(url, file)

      toast.success(
        <div>
          <h4 className="text-success">Success</h4>
          <p>File has been uploaded</p>
        </div>,
        {
          autoClose: 5000,
        }
      )
      setLoading(false)
      getFiles()
    } catch (error) {
      toast.error(
        <div>
          <h4 className="text-danger">Error</h4>
          <p>{error.message}</p>
        </div>
      )
      setLoading(false)
    }
  }

  const handleDownload = file => {
    console.log(file)
  }

  return (
    <Container>
      <HeaderMain title="The Library" />
      <Row>
        <Col>
          <Card className="mb-3">
            <CardBody>
              <Row>
                {!isLearner && (
                  <>
                    <Col>
                      <InputGroup>
                        <input
                          id="courseFile"
                          className="custom-file-input"
                          type="file"
                          disabled={loading}
                          onChange={event => {
                            setFile(event.target.files[0])
                          }}
                        />
                        <label class="custom-file-label" for="courseFile">
                          {file?.name || 'Choose a fille'}
                        </label>
                      </InputGroup>
                    </Col>
                    <Col>
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
                            onClick={handleUpload}
                            disabled={!file || loading}
                          >
                            {loading ? (
                              <Loading small />
                            ) : (
                              <i className="fa fa-fw fa-upload"></i>
                            )}
                          </Button>
                          <UncontrolledTooltip
                            placement="bottom"
                            target="tooltipAddNew"
                          >
                            Add New File
                          </UncontrolledTooltip>
                        </ButtonGroup>
                      </ButtonToolbar>
                    </Col>
                  </>
                )}
              </Row>
            </CardBody>
            <Table className="mb-0" hover responsive>
              <thead>
                <tr>
                  {/* <th className="align-middle bt-0 text-center">Actions</th> */}
                  <th className="align-middle bt-0 text-left">Name</th>
                </tr>
              </thead>
              <tbody>
                {loadingFiles ? (
                  <Loading />
                ) : (
                  files.map((file, index) => (
                    <tr>
                      {/* <td className="align-middle text-center">
                      <CustomInput
                        type="checkbox"
                        className="p-1"
                        label=""
                        inline
                      />
                    </td> */}
                      <td colSpan={4}>
                        <a
                          href={
                            'https://static.dev.lxpia.com/' +
                            file.url.replace('undefined/', '')
                          }
                          target="_blank"
                        >
                          {file.name}
                        </a>
                      </td>
                    </tr>
                  )) || (
                    <tr>
                      <td colSpan={3}>No File yet.</td>
                    </tr>
                  )
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
