import React from 'react'
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
  UncontrolledTabs,
  Nav,
  NavItem,
  TabPane,
  FileList,
} from '@/components'

import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import DatePicker, { setDefaultLocale } from 'react-datepicker'
import moment from 'moment'
import { AddonInput } from '@/routes/Forms/DatePicker/components'
import {
  activityService,
  learnerService,
  subspecialtiesService,
  courseService,
  programService,
} from '@/services'
import { useAppState } from '@/components/AppState'
import { Typeahead } from 'react-bootstrap-typeahead'
import { Role } from '@/helpers'
import ThemedButton from '@/components/ThemedButton'
import RRuleGenerator from 'react-rrule-generator'
import { hot } from 'react-hot-loader'

const AssignActivity = ({
  toggle,
  isOpen,
  eventStart,
  eventEnd,
  onSuccess,
  currentProgramId,
  userPrograms,
}) => {
  const [{ currentUser, selectedOrganization }, dispatch] = useAppState()
  const currentUserRole =
    currentUser && currentUser.user && currentUser.user.role
  const [users, setUsers] = React.useState([])
  const [activityTypes, setActivityTypes] = React.useState([])
  const [timeDifference, setTimeDifference] = React.useState(30)
  const [courses, setCourses] = React.useState([])
  const [rrule, setRRule] = React.useState([])
  const [showRepeatOptions, setShowRepeatOptions] = React.useState(false)
  //const [userPrograms, setUserPrograms] = React.useState([]);
  const [selectedProgram, setSelectedProgram] = React.useState(null)
  const [selectedActivity, setSelectedActivity] = React.useState(null)
  const [files, setFiles] = React.useState([])
  const [urls, setUrls] = React.useState([])

  React.useEffect(() => {
    if (isOpen) {
      const fetchData = async () => {
        try {
          const response = await activityService.getActivityTypes(
            selectedOrganization.organizationId
          )
          setActivityTypes(response)
        } catch (error) {
          console.log('Error while fetching activity types:', error)
        }

        try {
          const data = await courseService.getAll(
            selectedOrganization.organizationId,
            currentProgramId || selectedProgram[0]?.programId,
            1
          )

          if (data && data.courses) {
            setCourses(data.courses)
          }
        } catch (err) {
          console.log('Error while fetching courses:', err)
        }

        if (currentUser && currentUser.user) {
          try {
            const learners = await learnerService.getAllActive(
              1,
              999,
              null,
              null,
              selectedOrganization.organizationId,
              currentProgramId || selectedProgram[0]?.programId
            )
            setUsers(
              learners.users.map(usr => ({
                employeeId: usr.employeeId,
                name: `${usr.name} ${usr.surname}`,
              }))
            )
          } catch (error) {
            console.log('Error while fetching learners:', error)
          }
        }
      }

      fetchData()
    }

    setRRule(false)
    setShowRepeatOptions(false)
  }, [selectedProgram])

  const eventStartObj = (eventStart && moment(eventStart).toObject()) || null
  const eventEndObj = (eventEnd && moment(eventEnd).toObject()) || null
  const remainder = 30 - (moment().minute() % 30)

  const changePriority = (formikProps, priority) => {
    formikProps.setFieldValue('priority', priority)
    formikProps.setFieldValue('courses', [])
    formikProps.setFieldValue('learners', [])
  }

  const handleUploadFile = async file => {
    file = {
      ...file,
      activityId: selectedActivity,
      status: 'uploaded',
    }

    activityService
      .addActivityFile(file)
      .then(activityFileId => {
        //updateAnnouncementInList(files.length + 1);
        file = { ...file, activityFileId: activityFileId, status: 'uploaded' }
        setFiles(z =>
          z.map(f => {
            if (f.name != file.name) return f

            return file
          })
        )

        alert('The file has been uploaded')
      })
      .catch(error => {
        file = { ...file, status: 'error' }
        setFiles(z =>
          z.map(f => {
            if (f.name != file.name) return f

            return file
          })
        )
        alert(`Error while uploading the file`, error)
      })
  }

  const handleDownloadFile = async file => {
    return await activityService.downloadActivityFile(file.activityFileId)
  }

  const handleRemoveFile = async file => {
    if (file) {
      if (file.activityFileId) {
        await activityService.deleteActivityFile(file.activityFileId)
        //updateAnnouncementInList(files.length - 1);
        setFiles(z => z.filter(f => f.activityFileId != file.activityFileId))

        alert('The file has been deleted')
      } else {
        setFiles(z => z.filter(f => f.name != file.name))
      }
    }
  }

  const handleRemoveLink = async link => {
    if (!confirm('Confirm delete link?')) return

    if (link?.activityLinkId) {
      await activityService.deleteActivityLink(link.activityLinkId)

      setUrls(z => z.filter(f => f.activityLinkId != link.activityLinkId))

      alert('The link has been deleted')
    } else {
      setUrls(z => z.filter(f => f.url != link.url))
    }
  }

  const handleAddLink = async url => {
    let link = { url: url, activityId: selectedActivity }

    if (url)
      activityService
        .addActivityLink(link)
        .then(activityLinkId => {
          link = {
            ...link,
            activityLinkId: activityLinkId,
            status: 'uploaded',
          }

          setUrls([...urls, link])

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

          alert(`Error while adding the link to the activity!`, error)
        })
  }

  const handleClose = () => {
    toggle()
    setUrls([])
    setFiles([])
    setSelectedActivity(null)
  }

  return (
    <Modal
      toggle={handleClose}
      isOpen={isOpen}
      className="modal-outline-primary"
      size="lg"
    >
      <Formik
        enableReinitialize={false}
        initialValues={{
          activityName: '',
          description: '',
          program:
            (currentProgramId &&
              userPrograms?.filter(p => p.programId == currentProgramId)) ||
            [],
          start:
            eventStart ||
            (eventStartObj &&
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
            eventEnd ||
            (eventEndObj &&
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
          learners: [],
          priority: 1,
          activityType: '',
          courses: [],
          totalPoints: 0,
          isPublic: false,
        }}
        validationSchema={Yup.object().shape({
          program: Yup.array().min(1, 'You need to select a program'),
          priority: Yup.string().required('You need to select a priority'),
          activityName: Yup.string().required(
            'You need to enter a name for the activity'
          ),
          start: Yup.date().required(
            'Starting time of the activity is required'
          ),
          activityType: Yup.string().required(
            'You need to select the activity type'
          ),
          repeat: Yup.boolean(),
          end: Yup.date()
            .required('Ending time of the activity is required')
            .when('start', (start, schema) =>
              schema.min(
                start,
                ({ min }) =>
                  `Ending time must be greater than the activity starting time (${moment(
                    min
                  ).format('LLLL')})`
              )
            ),
          courses: Yup.array().when('priority', {
            is: '2',
            then: Yup.array().min(1, 'You need to select a course'),
          }),
          learners: Yup.array().when('priority', {
            is: '3',
            then: Yup.array().min(1, 'You need to select a learner'),
          }),
          totalPoints: Yup.number().required('You need to set total points'),
          isPublic: Yup.boolean(),
        })}
        onSubmit={async (
          {
            activityName,
            description,
            start,
            end,
            priority,
            program,
            learners,
            activityType,
            location,
            courses,
            repeat,
            totalPoints,
            isPublic,
          },
          { setStatus, setSubmitting }
        ) => {
          setStatus()
          setSubmitting(false)

          if (!program || program?.length == 0) {
            alert(`You need to select a program first!`)
            return
          }

          if (priority == 3 && learners?.length == 0) {
            alert(`You need to select some learners first! :)`)
            return
          }

          if (priority == 2 && (!courses || courses?.length == 0)) {
            alert(`You must choose a course!`)
            return
          }

          setSubmitting(true)

          const activity = {
            programId: program[0].programId,
            name: activityName,
            start: start,
            end: end,
            priority: priority,
            activityTypeId: activityType,
            location: location,
            description: description,
            repeat: showRepeatOptions,
            participants: learners,
            courses: courses,
            rrule: (rrule && rrule.toString()) || null,
            organizationId: selectedOrganization.organizationId,
            totalPoints,
            isPublic,
          }
          try {
            const response = await activityService.create(activity)
            alert(`You have successfully assigned an activity!`)
            if (response.warning) {
              alert(response.warning)
            }
            // toggle()
            setSelectedActivity(response.activityId[0])
            if (onSuccess) {
              onSuccess()
            }
          } catch (error) {
            console.log('Error while creating activity:', error)
            setStatus(error)

            alert(
              `We're sorry but something went wrong while trying to assign the activity: ${error}`
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
                  Assign an activity
                </ModalHeader>
                <ModalBody>
                  <UncontrolledTabs initialActiveTabId="details">
                    {/* START Pills Nav */}
                    <Nav
                      pills
                      className="mb-4 flex-column flex-md-row mt-4 mt-lg-0"
                    >
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
                    {/* END Pills Nav */}
                    <UncontrolledTabs.TabContent>
                      <TabPane tabId="details">
                        <Row>
                          <Col lg={12}>
                            <Card className="mb-3">
                              <CardBody>
                                {/* START Form */}

                                {/* START Input */}
                                <FormGroup row>
                                  <Label for="programId" sm={3}>
                                    Program
                                  </Label>
                                  <Col sm={9}>
                                    <Typeahead
                                      clearButton
                                      id="program"
                                      name="program"
                                      labelKey="name"
                                      options={userPrograms}
                                      //selected={formikProps.values.program}
                                      className={
                                        formikProps.errors.program &&
                                        formikProps.touched.program
                                          ? ' is-invalid'
                                          : ''
                                      }
                                      placeholder="Select a program..."
                                      onChange={selectedOptions => {
                                        formikProps.setFieldValue(
                                          'program',
                                          selectedOptions || []
                                        )
                                        setSelectedProgram(selectedOptions)
                                        changePriority(formikProps, 1)
                                      }}
                                      onInputChange={selectedOptions => {
                                        formikProps.setFieldValue(
                                          'program',
                                          selectedOptions || []
                                        )
                                        //setSelectedProgramid(selectedOptions && selectedOptions.length > 0 && selectedOptions[0].programId || null);
                                        changePriority(formikProps, 1)
                                      }}
                                    />
                                    <ErrorMessage
                                      name="program"
                                      component="div"
                                      className="invalid-feedback"
                                    />
                                  </Col>
                                </FormGroup>
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
                                  <Label for="totalPoints" sm={3}>
                                    Total Points
                                  </Label>
                                  <Col sm={9}>
                                    <Field
                                      type="number"
                                      name="totalPoints"
                                      id="totalPoints"
                                      className={
                                        'bg-white form-control' +
                                        (formikProps.errors.totalPoints &&
                                        formikProps.touched.totalPoints
                                          ? ' is-invalid'
                                          : '')
                                      }
                                      placeholder="Total points..."
                                    />
                                    <ErrorMessage
                                      name="totalPoints"
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
                                      autoComplete="off"
                                      showMonthDropdown
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
                                      showMonthDropdown
                                      showYearDropdown
                                      autoComplete="off"
                                      dateFormat="dd/MM/yyyy h:mm aa"
                                      name="end"
                                      id="end"
                                      showTimeSelect
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
                                  <Label for="isPublic" sm={3}>
                                    is public?
                                  </Label>
                                  <Col sm={9}>
                                    <Field
                                      inline
                                      type="checkbox"
                                      id="isPublic"
                                      name="isPublic"
                                      className="form-control"
                                      style={{ width: '25px' }}
                                    />
                                  </Col>
                                </FormGroup>
                                <FormGroup row>
                                  <Label for="description" sm={3}>
                                    Repeat?
                                  </Label>
                                  <Col sm={9}>
                                    <CustomInput
                                      inline
                                      type="radio"
                                      id="repeatYes"
                                      name="repeat"
                                      label="Yes"
                                      value="1"
                                      onChange={event => {
                                        setShowRepeatOptions(true)
                                      }}
                                    />
                                    <CustomInput
                                      inline
                                      type="radio"
                                      id="repeatNo"
                                      name="repeat"
                                      label="No"
                                      value="0"
                                      defaultChecked
                                      onChange={event => {
                                        setShowRepeatOptions(false)
                                      }}
                                    />
                                  </Col>
                                </FormGroup>
                                {showRepeatOptions && (
                                  <FormGroup row>
                                    <Col
                                      sm={12}
                                      style={{ whiteSpace: 'nowrap' }}
                                    >
                                      <RRuleGenerator
                                        onChange={rrule => {
                                          console.log(
                                            `RRule changed, now it's ${rrule}`
                                          )
                                          setRRule(rrule)
                                        }}
                                        config={{
                                          weekStartsOnSunday: true,
                                        }}
                                      />
                                    </Col>
                                  </FormGroup>
                                )}
                                <FormGroup row>
                                  <Label for="type" sm={3}>
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
                                      <option value="">Activity type...</option>
                                      {activityTypes.map(at => {
                                        return (
                                          <option value={at.activityTypeId}>
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
                                  <Label for="description" sm={3}>
                                    Description
                                  </Label>
                                  <Col sm={9}>
                                    <Field
                                      component="textarea"
                                      name="description"
                                      id="description"
                                      className={
                                        'bg-white form-control' +
                                        (formikProps.errors.description &&
                                        formikProps.touched.description
                                          ? ' is-invalid'
                                          : '')
                                      }
                                      placeholder="Enter agenda..."
                                    />
                                    <ErrorMessage
                                      name="description"
                                      component="div"
                                      className="invalid-feedback"
                                    />
                                  </Col>
                                </FormGroup>
                                <FormGroup row>
                                  <Label for="priority" sm={3}>
                                    Assign to
                                  </Label>
                                  <Col sm={9}>
                                    {currentUserRole != Role.Learner && (
                                      <>
                                        <CustomInput
                                          inline
                                          type="radio"
                                          id="priorityProgram"
                                          name="priority"
                                          label="Program"
                                          checked={
                                            formikProps.values.priority == 1
                                          }
                                          value="1"
                                          onChange={event => {
                                            changePriority(
                                              formikProps,
                                              event.target.value
                                            )
                                          }}
                                        />
                                        <CustomInput
                                          inline
                                          type="radio"
                                          id="priorityLevel"
                                          name="priority"
                                          label="Courses"
                                          value="2"
                                          checked={
                                            formikProps.values.priority == 2
                                          }
                                          onChange={event => {
                                            formikProps.setFieldValue(
                                              'priority',
                                              event.target.value
                                            )
                                            changePriority(
                                              formikProps,
                                              event.target.value
                                            )
                                          }}
                                        />
                                      </>
                                    )}

                                    <CustomInput
                                      inline
                                      type="radio"
                                      id="priorityLearners"
                                      name="priority"
                                      label={
                                        currentUserRole != Role.Learner
                                          ? 'Learners'
                                          : 'Learners and supervisors'
                                      }
                                      value="3"
                                      checked={formikProps.values.priority == 3}
                                      onChange={event => {
                                        formikProps.setFieldValue(
                                          'priority',
                                          event.target.value
                                        )
                                        changePriority(
                                          formikProps,
                                          event.target.value
                                        )
                                      }}
                                    />
                                  </Col>
                                </FormGroup>
                                {formikProps.values &&
                                  formikProps.values.priority &&
                                  formikProps.values.priority == 2 && (
                                    <FormGroup row>
                                      <Label for="courses" sm={3}>
                                        Course
                                      </Label>
                                      <Col sm={9}>
                                        <Typeahead
                                          clearButton
                                          id="courses"
                                          labelKey="name"
                                          options={courses || []}
                                          multiple
                                          className={
                                            formikProps.errors.courses &&
                                            formikProps.touched.courses
                                              ? ' is-invalid'
                                              : ''
                                          }
                                          placeholder="Select courses..."
                                          onChange={selectedOptions =>
                                            formikProps.setFieldValue(
                                              'courses',
                                              selectedOptions
                                            )
                                          }
                                          onInputChange={selectedOptions =>
                                            formikProps.setFieldValue(
                                              'courses',
                                              selectedOptions
                                            )
                                          }
                                        />
                                        <ErrorMessage
                                          name="courses"
                                          component="div"
                                          className="invalid-feedback"
                                        />
                                      </Col>
                                    </FormGroup>
                                  )}
                                {formikProps.values &&
                                  formikProps.values.priority &&
                                  formikProps.values.priority == 3 && (
                                    <FormGroup row>
                                      <Label for="learners" sm={3}>
                                        Learners
                                      </Label>
                                      <Col sm={9}>
                                        <Typeahead
                                          clearButton
                                          id="learners"
                                          labelKey="name"
                                          options={users}
                                          multiple
                                          className={
                                            formikProps.errors.learners &&
                                            formikProps.touched.learners
                                              ? ' is-invalid'
                                              : ''
                                          }
                                          placeholder="Select learners..."
                                          onChange={selectedOptions =>
                                            formikProps.setFieldValue(
                                              'learners',
                                              selectedOptions
                                            )
                                          }
                                          onInputChange={selectedOptions =>
                                            formikProps.setFieldValue(
                                              'learners',
                                              selectedOptions
                                            )
                                          }
                                        />

                                        <ErrorMessage
                                          name="learners"
                                          component="div"
                                          className="invalid-feedback"
                                        />
                                      </Col>
                                    </FormGroup>
                                  )}
                                {/* END Form */}
                              </CardBody>
                            </Card>
                          </Col>
                        </Row>
                      </TabPane>
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
                  <ThemedButton type="submit" disabled={selectedActivity}>
                    Save
                  </ThemedButton>
                  <Button type="button" onClick={handleClose} color="light">
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

export default hot(module)(AssignActivity)
