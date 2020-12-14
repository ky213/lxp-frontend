import React from 'react'
import { hot } from 'react-hot-loader'
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Row,
  Col,
  Card,
  CardBody,
  FormGroup,
  Label,
  CustomInput,
  InvalidFeedback,
  TabPane,
  Nav,
  NavItem,
  UncontrolledTabs,
} from '@/components'

import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import DatePicker, { setDefaultLocale } from 'react-datepicker'
import moment from 'moment'
import { AddonInput } from '@/routes/Forms/DatePicker/components'
import { activityService, courseManagerService } from '@/services'
import { useAppState, AppStateContext } from '@/components/AppState'
import { Typeahead } from 'react-bootstrap-typeahead'
import { Role } from '@/helpers'
import ThemedButton from '@/components/ThemedButton'
import { Loading, FileList } from '@/components'
import ActivityReplies from './components/ActivityReplies'

const LogActivity = ({
  toggle,
  isOpen,
  eventStart,
  eventEnd,
  onSuccess,
  selectedActivity,
  setSelectedActivity,
}) => {
  const [files, setFiles] = React.useState([])
  const [urls, setUrls] = React.useState([])
  const [{ currentUser, selectedOrganization }, dispatch] = useAppState()
  const currentUserRole =
    currentUser && currentUser.user && currentUser.user.role
  const [supervisors, setSupervisors] = React.useState([])
  const [activityTypes, setActivityTypes] = React.useState([])
  const [timeDifference, setTimeDifference] = React.useState(30)

  React.useEffect(() => {
    activityService
      .getActivityTypes(selectedOrganization.organizationId)
      .then(types => {
        setActivityTypes(types)
      })

    courseManagerService
      .getAllActive(1, 999, null, selectedOrganization.organizationId)
      .then(users => {
        setSupervisors(
          users.users.map(usr => {
            if (usr.employeeId != currentUser.user.employeeId) {
              return {
                employeeId: usr.employeeId,
                name: `${usr.name} ${usr.surname}`,
              }
            }
          })
        )
      })

    if (selectedActivity) {
      const calculatedTimeDifference = Math.round(
        moment
          .duration(
            moment(selectedActivity.end).diff(moment(selectedActivity.start))
          )
          .add(remainder, 'minutes')
          .asMinutes()
      )
      setTimeDifference(calculatedTimeDifference)

      setFiles(selectedActivity.files || [])
      setUrls(selectedActivity.links || [])
    }
  }, [selectedActivity])

  const eventStartObj = (eventStart && moment(eventStart).toObject()) || null
  const eventEndObj = (eventStart && moment(eventEnd).toObject()) || null
  const remainder = 30 - (moment().minute() % 30)

  const updateActivityStatus = async status => {
    if (selectedActivity) {
      try {
        await activityService.updateLogActivityStatus(
          selectedActivity.activityId,
          status
        )
        alert(`You have successfully deleted the logged activity!`)
        onSuccess()
      } catch (error) {
        alert(
          "We're sorry but something went wrong while we were changing the status of your logged activity!"
        )
      }

      toggle()
    }
  }

  const handleUploadFile = async file => {
    file = {
      ...file,
      logActivityId: selectedActivity.activityId,
      status: 'uploaded',
    }

    activityService
      .addLogActivityFile(file)
      .then(logActivityFileId => {
        //updateAnnouncementInList(files.length + 1);
        file = {
          ...file,
          logActivityFileId: logActivityFileId,
          status: 'uploaded',
        }
        setFiles(z =>
          z.map(f => {
            if (f.name != file.name) return f

            return file
          })
        )

        alert('The file has been uploaded')
      })
      .catch(error => {
        console.log('Error while uploading the file:', error)
        file = { ...file, status: 'error' }
        setFiles(z =>
          z.map(f => {
            if (f.name != file.name) return f

            return file
          })
        )
        alert(`Error while uploading the file`)
      })
  }

  const handleDownloadFile = async file => {
    return await activityService.downloadLogActivityFile(file.logActivityFileId)
  }

  const handleRemoveFile = async file => {
    if (file) {
      if (file.logActivityFileId) {
        await activityService.deleteLogActivityFile(file.logActivityFileId)
        //updateAnnouncementInList(files.length - 1);
        setFiles(z =>
          z.filter(f => f.logActivityFileId != file.logActivityFileId)
        )

        alert('The file has been deleted')
      } else {
        setFiles(z => z.filter(f => f.name != file.name))
      }
    }
  }

  const handleRemoveLink = async link => {
    if (link) {
      if (link.logActivityLinkId) {
        await activityService.deleteLogActivityLink(link.logActivityLinkId)
        //updateAnnouncementInList(files.length - 1);
        setUrls(z =>
          z.filter(f => f.logActivityLinkId != link.logActivityLinkId)
        )

        alert('The link has been deleted')
      } else {
        setUrls(z => z.filter(f => f.url != link.url))
      }
    }
  }

  const handleAddLink = async url => {
    const linkField = document.querySelector('.tab-pane.active input')
    let link = { url: url, logActivityId: selectedActivity.activityId }
    activityService
      .addLogActivityLink(link)
      .then(logActivityLinkId => {
        link = {
          ...link,
          logActivityLinkId: logActivityLinkId,
          status: 'uploaded',
        }

        setUrls([...urls, link])

        linkField.value = ''

        alert('The link has sucessfully been added!')
        return link
      })
      .catch(error => {
        link = { ...link, status: 'error' }
        setUrls(z =>
          z.map(f => {
            if (f.url != link.url) return f

            return link
          })
        )
        alert(`Error while adding the link to the activity!`)
      })
  }

  return (
    <Modal
      toggle={toggle}
      isOpen={isOpen}
      className="modal-outline-primary"
      size="lg"
    >
      <Formik
        enableReinitialize={false}
        initialValues={{
          activityName: (selectedActivity && selectedActivity.name) || '',
          details: (selectedActivity && selectedActivity.details) || '',
          start:
            (selectedActivity &&
              selectedActivity.start &&
              moment(selectedActivity.start).toDate()) ||
            (eventStart &&
              moment()
                .add(remainder, 'minutes')
                .set({
                  years: eventStartObj.years,
                  months: eventStartObj.months,
                  date: eventStartObj.date,
                })
                .toDate()) ||
            '',
          end:
            (selectedActivity &&
              selectedActivity.end &&
              moment(selectedActivity.end).toDate()) ||
            (eventEnd &&
              moment()
                .add(remainder, 'minutes')
                .add(timeDifference, 'minutes')
                .set({
                  years: eventEndObj.years,
                  months: eventEndObj.months,
                  date: eventEndObj.date,
                })
                .toDate()) ||
            '',
          supervisors: (selectedActivity && selectedActivity.supervisors) || [],
          participationLevel:
            (selectedActivity && selectedActivity.participationLevel) || '',
          activityType:
            (selectedActivity && selectedActivity.activityTypeId) || '',
          location: (selectedActivity && selectedActivity.location) || '',
          isPublic: selectedActivity?.isPublic || false,
        }}
        validationSchema={Yup.object().shape({
          activityName: Yup.string().required(
            'You need to enter a name for the activity'
          ),
          start: Yup.date().required(
            'You need to enter when you have started working on this activity'
          ),
          activityType: Yup.string().required(
            'You need to choose the activity type'
          ),
          end: Yup.date()
            .required(
              'You need to enter when you have finished with this activity'
            )
            .when('start', (start, schema) =>
              schema.min(
                start,
                ({ min }) =>
                  `Ending time must be greater than the activity starting time (${moment(
                    min
                  ).format('LLLL')})`
              )
            ),
          isPublic: Yup.boolean(),
        })}
        onSubmit={async (
          {
            activityName,
            details,
            start,
            end,
            supervisors,
            activityType,
            participationLevel,
            location,
            isPublic,
          },
          { setStatus, setSubmitting }
        ) => {
          setStatus()
          setSubmitting(true)

          try {
            if (selectedActivity) {
              const activity = {
                activityId: selectedActivity.activityId,
                name: activityName,
                start: start,
                end: end,
                activityTypeId: activityType,
                location: location,
                details: details,
                participationLevel: participationLevel,
                supervisors: supervisors,
                isPublic,
              }

              await activityService.updateLogActivity(activity)
              alert(`You have successfully updated the logged activity!`)
            } else {
              const activity = {
                programId:
                  (currentUser &&
                    currentUser.user &&
                    currentUser.user.programId) ||
                  null,
                name: activityName,
                start,
                end,
                activityTypeId: activityType,
                location,
                details,
                participationLevel,
                supervisors,
                isPublic,
              }

              const response = await activityService.logActivity(activity)
              response.activityId = response?.activityId[0]
              setSelectedActivity(response)
              alert(`You have successfully logged an activity!`)
            }

            // toggle()
            if (onSuccess) {
              onSuccess()
            }
          } catch (error) {
            console.log(error)
            setStatus(error)
            alert(
              `We're sorry but something went wrong while trying to assign the activity.`
            )
          }

          setSubmitting(false)
        }}
      >
        {formikProps => {
          return (
            <React.Fragment>
              <Form onSubmit={formikProps.handleSubmit}>
                <ModalHeader tag="h6" toggle={toggle}>
                  {(selectedActivity && 'Edit logged activity') ||
                    'Log an activity'}
                </ModalHeader>
                <ModalBody>
                  <UncontrolledTabs
                    initialActiveTabId={
                      (selectedActivity && 'replies') || 'details'
                    }
                  >
                    <Nav
                      pills
                      className="mb-4 flex-column flex-md-row mt-4 mt-lg-0"
                    >
                      {selectedActivity && (
                        <NavItem>
                          <UncontrolledTabs.NavLink tabId="replies">
                            Replies
                          </UncontrolledTabs.NavLink>
                        </NavItem>
                      )}
                      <NavItem>
                        <UncontrolledTabs.NavLink tabId="details">
                          Details
                        </UncontrolledTabs.NavLink>
                      </NavItem>
                      <NavItem>
                        <UncontrolledTabs.NavLink
                          tabId="files"
                          disabled={!selectedActivity}
                        >
                          Links & Files
                        </UncontrolledTabs.NavLink>
                      </NavItem>
                    </Nav>
                    <UncontrolledTabs.TabContent>
                      <TabPane tabId="details">
                        <Row>
                          <Col lg={12}>
                            <Card className="mb-3">
                              <CardBody>
                                {/* START Form */}

                                {/* START Input */}

                                <FormGroup row>
                                  <Label for="name" sm={3}>
                                    Activity name
                                  </Label>
                                  <Col sm={9}>
                                    <Field
                                      type="text"
                                      name="activityName"
                                      id="activityName"
                                      className={
                                        'bg-white form-control' +
                                        (formikProps.errors.activityName &&
                                        formikProps.touched.activityName
                                          ? ' is-invalid'
                                          : '')
                                      }
                                      placeholder="Activity name..."
                                    />
                                    <ErrorMessage
                                      name="activityName"
                                      component="div"
                                      className="invalid-feedback"
                                    />
                                  </Col>
                                </FormGroup>
                                <FormGroup row>
                                  <Label for="start" sm={3}>
                                    From
                                  </Label>
                                  <Col sm={9}>
                                    <DatePicker
                                      customInput={<AddonInput />}
                                      dateFormat="dd/MM/yyyy h:mm aa"
                                      showTimeSelect
                                      showMonthDropdown
                                      autoComplete="off"
                                      showYearDropdown
                                      name="start"
                                      id="start"
                                      className={
                                        formikProps.errors.start &&
                                        formikProps.touched.start
                                          ? ' is-invalid'
                                          : ''
                                      }
                                      selected={formikProps.values.start}
                                      onChange={e => {
                                        formikProps.setFieldValue('start', e)
                                        formikProps.setFieldValue(
                                          'end',
                                          moment(e)
                                            .add(timeDifference, 'minutes')
                                            .toDate()
                                        )
                                      }}
                                    />
                                    {formikProps.errors.start &&
                                      formikProps.touched.start && (
                                        <InvalidFeedback>
                                          {formikProps.errors.start}
                                        </InvalidFeedback>
                                      )}
                                  </Col>
                                </FormGroup>
                                <FormGroup row>
                                  <Label for="end" sm={3}>
                                    To
                                  </Label>
                                  <Col sm={9}>
                                    <DatePicker
                                      customInput={<AddonInput />}
                                      dateFormat="dd/MM/yyyy h:mm aa"
                                      name="end"
                                      id="end"
                                      showTimeSelect
                                      autoComplete="off"
                                      showMonthDropdown
                                      showYearDropdown
                                      className={
                                        formikProps.errors.end &&
                                        formikProps.touched.end
                                          ? ' is-invalid'
                                          : ''
                                      }
                                      selected={formikProps.values.end}
                                      onChange={e => {
                                        formikProps.setFieldValue('end', e)
                                        const calculatedTimeDifference = moment
                                          .duration(
                                            moment(e).diff(
                                              moment(formikProps.values.start)
                                            )
                                          )
                                          .asMinutes()
                                        setTimeDifference(
                                          calculatedTimeDifference
                                        )
                                      }}
                                    />
                                    {formikProps.errors.end &&
                                      formikProps.touched.end && (
                                        <InvalidFeedback>
                                          {formikProps.errors.end}
                                        </InvalidFeedback>
                                      )}
                                  </Col>
                                </FormGroup>
                                <FormGroup row>
                                  <Label for="location" sm={3}>
                                    Location
                                  </Label>
                                  <Col sm={9}>
                                    <Field
                                      type="text"
                                      name="location"
                                      id="location"
                                      className={
                                        'bg-white form-control' +
                                        (formikProps.errors.location &&
                                        formikProps.touched.location
                                          ? ' is-invalid'
                                          : '')
                                      }
                                      placeholder="Location..."
                                    />
                                    <ErrorMessage
                                      name="location"
                                      component="div"
                                      className="invalid-feedback"
                                    />
                                  </Col>
                                </FormGroup>
                                <FormGroup row>
                                  <Label for="supervisors" sm={3}>
                                    Supervisor
                                  </Label>
                                  <Col sm={9}>
                                    <Typeahead
                                      clearButton
                                      id="supervisors"
                                      labelKey="name"
                                      options={supervisors}
                                      selected={selectedActivity?.supervisors}
                                      className={
                                        formikProps.errors.supervisor &&
                                        formikProps.touched.supervisor
                                          ? ' is-invalid'
                                          : ''
                                      }
                                      placeholder="Select a supervisor..."
                                      onChange={selectedOptions =>
                                        formikProps.setFieldValue(
                                          'supervisors',
                                          selectedOptions
                                        )
                                      }
                                      onInputChange={selectedOptions =>
                                        formikProps.setFieldValue(
                                          'supervisors',
                                          selectedOptions
                                        )
                                      }
                                    />

                                    <ErrorMessage
                                      name="supervisors"
                                      className="invalid-feedback"
                                    />
                                  </Col>
                                </FormGroup>
                                <FormGroup row>
                                  <Label for="activityType" sm={3}>
                                    Activity type
                                  </Label>
                                  <Col sm={9}>
                                    <Field
                                      component="select"
                                      name="activityType"
                                      id="activityType"
                                      className={
                                        'bg-white form-control' +
                                        (formikProps.errors.activityType &&
                                        formikProps.touched.activityType
                                          ? ' is-invalid'
                                          : '')
                                      }
                                      placeholder="Activity type..."
                                    >
                                      <option key={9999} value="">
                                        Activity type...
                                      </option>
                                      {activityTypes.map(at => {
                                        //console.log("Map each at:", at)
                                        return (
                                          <option
                                            key={at.activityTypeId}
                                            value={at.activityTypeId}
                                          >
                                            {at.activityTypeName}
                                          </option>
                                        )
                                      })}
                                    </Field>
                                    <ErrorMessage
                                      name="activityType"
                                      component="div"
                                      className="invalid-feedback"
                                    />
                                  </Col>
                                </FormGroup>
                                <FormGroup row>
                                  <Label for="isPublic" sm={3}>
                                    is public?
                                  </Label>
                                  <Col sm={9}>
                                    <Field
                                      type="checkbox"
                                      name="isPublic"
                                      id="isPublic"
                                      className="form-control"
                                      style={{ width: '25px' }}
                                    />
                                  </Col>
                                </FormGroup>
                                <FormGroup row>
                                  <Label for="details" sm={3}>
                                    Details
                                  </Label>
                                  <Col sm={9}>
                                    <Field
                                      component="textarea"
                                      name="details"
                                      id="details"
                                      className={
                                        'bg-white form-control' +
                                        (formikProps.errors.details &&
                                        formikProps.touched.details
                                          ? ' is-invalid'
                                          : '')
                                      }
                                      placeholder="Enter activity details..."
                                    />
                                    <ErrorMessage
                                      name="details"
                                      component="div"
                                      className="invalid-feedback"
                                    />
                                  </Col>
                                </FormGroup>
                                {selectedActivity && (
                                  <FormGroup row>
                                    <Label for="createdBy" sm={3}>
                                      Created by
                                    </Label>
                                    <Col sm={9}>
                                      <Label className="col-form-label">
                                        <strong>
                                          {`${selectedActivity.loggedByFirstName} ${selectedActivity.loggedByLastName}`}
                                          {currentUser &&
                                            currentUser.user &&
                                            selectedActivity.loggedBy ==
                                              currentUser.user.employeeId &&
                                            ' (You)'}
                                        </strong>
                                      </Label>
                                    </Col>
                                  </FormGroup>
                                )}
                                {/* END Form */}
                              </CardBody>
                            </Card>
                          </Col>
                        </Row>
                      </TabPane>
                      {selectedActivity && (
                        <TabPane tabId="replies">
                          <ActivityReplies
                            destination="log-activity"
                            selectedActivity={selectedActivity}
                            currentUser={currentUser && currentUser.user}
                          />
                        </TabPane>
                      )}
                      <TabPane tabId="files">
                        <FileList
                          files={files}
                          urls={urls}
                          setFiles={setFiles}
                          setUrls={setUrls}
                          onUploadFile={handleUploadFile}
                          onDownloadFile={handleDownloadFile}
                          onRemoveFile={handleRemoveFile}
                          onAddLink={handleAddLink}
                          onRemoveLink={handleRemoveLink}
                        />
                      </TabPane>
                    </UncontrolledTabs.TabContent>
                  </UncontrolledTabs>
                </ModalBody>
                <ModalFooter>
                  {!selectedActivity && (
                    <>
                      <ThemedButton type="submit">Log Activity</ThemedButton>{' '}
                    </>
                  )}
                  {selectedActivity?.loggedBy ==
                    currentUser.user.employeeId && (
                    <>
                      <ThemedButton type="submit">Update activity</ThemedButton>{' '}
                      <Button
                        type="button"
                        color="danger"
                        onClick={() => updateActivityStatus(3)}
                      >
                        Delete
                      </Button>{' '}
                    </>
                  )}
                  <Button type="button" onClick={toggle} color="light">
                    Close
                  </Button>
                </ModalFooter>
              </Form>
            </React.Fragment>
          )
        }}
      </Formik>
    </Modal>
  )
}

export default hot(module)(LogActivity)
