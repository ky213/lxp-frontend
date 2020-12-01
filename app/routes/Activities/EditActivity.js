import React from 'react';
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
  InputGroup,
  InputGroupAddon,
  InvalidFeedback,
  Table,
  TabPane,
  Badge,
  Nav,
  NavItem,
  UncontrolledTabs,
} from '@/components';

import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import DatePicker, { setDefaultLocale } from 'react-datepicker';
import moment from 'moment';
import { AddonInput } from '@/routes/Forms/DatePicker/components';
import {
  activityService,
  learnerService,
  courseService,
  expLevelService,
  programService,
} from '@/services';
import { useAppState } from '@/components/AppState';
import { Typeahead } from 'react-bootstrap-typeahead';
import { Role } from '@/helpers';
import ThemedButton from '@/components/ThemedButton';
import ActivityReplies from './components/ActivityReplies';
import RRuleGenerator from 'react-rrule-generator';
import { RRule, RRuleSet, rrulestr } from 'rrule';
import { Loading, FileList } from '@/components';

export const EditActivity = ({
  toggle,
  isOpen,
  selectedActivity,
  userPrograms,
  currentProgramId,
  onSuccess,
}) => {
  //console.log("Selected learner for calendar:", selectedLearner)
  //const minDate = moment().toDate();
  if (!selectedActivity) {
    return (isOpen && <Loading />) || null;
  }

  const [files, setFiles] = React.useState([]);
  const [urls, setUrls] = React.useState([]);
  const [{ currentUser, selectedOrganization }, dispatch] = useAppState();
  const currentUserRole =
    currentUser && currentUser.user && currentUser.user.role;
  const [users, setUsers] = React.useState([]);
  const [activityTypes, setActivityTypes] = React.useState([]);
  const [selectedPriority, setSelectedPriority] = React.useState(1);
  const [timeDifference, setTimeDifference] = React.useState(30);
  const [remainder, setRemainder] = React.useState(
    (selectedActivity && 30 - (moment(selectedActivity.start).minute() % 30)) ||
      0
  );
  const [courses, setCourses] = React.useState([]);
  const [experienceLevels, setExperienceLevels] = React.useState([]);
  const [rrule, setRRule] = React.useState(selectedActivity.rrule);
  const [showRepeatOptions, setShowRepeatOptions] = React.useState(
    selectedActivity.repeat
  );
  const [selectedProgram, setSelectedProgram] = React.useState(null);
  const currentProgram =
    (selectedActivity &&
      selectedActivity.programId &&
      userPrograms &&
      userPrograms.filter((p) => p.programId == selectedActivity.programId)) ||
    [];

  const updateActivityStatus = async (status) => {
    try {
      await activityService.updateStatus(selectedActivity.activityId, status);
      alert(
        `You have successfully ${
          (status == 4 && 'accepted') ||
          (status == '5' && 'declined') ||
          'deleted'
        } the activity!`
      );
      onSuccess();
    } catch (error) {
      console.log('Error while updating status of the activity:', error);
      alert(
        "We're sorry but something went wrong while we were updating the activity!"
      );
    }

    toggle();
  };

  React.useEffect(() => {
    if (selectedActivity) {
      const fetchData = async () => {
        try {
          const activityTypes = await activityService.getActivityTypes(
            selectedOrganization.organizationId
          );
          setActivityTypes(activityTypes);
        } catch (error) {
          console.log('Error while fetching activity types:', error);
        }

        if (currentUser && currentUser.user) {
          try {
            const learners = await learnerService.getAllActive(
              1,
              999,
              null,
              null,
              selectedOrganization.organizationId,
              selectedActivity.programId
            );
            setUsers(
              learners.users.map((usr) => ({
                employeeId: usr.employeeId,
                name: `${usr.name} ${usr.surname}`,
              }))
            );
          } catch (error) {
            console.log('Error while fetching learners:', error);
          }

          try {
            const data = await courseService.getAll(
              selectedOrganization.organizationId,
              currentProgramId,
              1
            );

            if (data && data.courses) {
              setCourses(data.courses);
            }
          } catch (err) {
            console.log('Error while fetching courses:', err);
          }
        }
      };

      fetchData();

      const calculatedTimeDifference = Math.round(
        moment
          .duration(
            moment(selectedActivity.end).diff(moment(selectedActivity.start))
          )
          .add(remainder, 'minutes')
          .asMinutes()
      );
      //console.log("Initial time diff:", calculatedTimeDifference)
      setTimeDifference(calculatedTimeDifference);
      setSelectedPriority(selectedActivity.priority);
      setShowRepeatOptions(selectedActivity.repeat);
      setRRule(selectedActivity.rrule);
      setFiles(selectedActivity.files);
      setUrls(selectedActivity.links.filter((l) => l?.url?.length > 0));
    }
  }, [selectedActivity]);

  const changePriority = (formikProps, priority) => {
    formikProps.setFieldValue('priority', priority);
    formikProps.setFieldValue('levels', []);
    formikProps.setFieldValue('learners', []);
    formikProps.setFieldValue('courses', []);
  };

  const handleUploadFile = async (file) => {
    file = {
      ...file,
      activityId: selectedActivity.activityId,
      status: 'uploaded',
    };

    activityService
      .addActivityFile(file)
      .then((activityFileId) => {
        //updateAnnouncementInList(files.length + 1);
        file = { ...file, activityFileId: activityFileId, status: 'uploaded' };
        setFiles((z) =>
          z.map((f) => {
            if (f.name != file.name) return f;

            return file;
          })
        );

        alert('The file has been uploaded');
      })
      .catch((error) => {
        file = { ...file, status: 'error' };
        setFiles((z) =>
          z.map((f) => {
            if (f.name != file.name) return f;

            return file;
          })
        );
        alert(`Error while uploading the file`, error);
      });
  };

  const handleDownloadFile = async (file) => {
    return await activityService.downloadActivityFile(file.activityFileId);
  };

  const handleRemoveFile = async (file) => {
    if (file) {
      if (file.activityFileId) {
        await activityService.deleteActivityFile(file.activityFileId);
        //updateAnnouncementInList(files.length - 1);
        setFiles((z) =>
          z.filter((f) => f.activityFileId != file.activityFileId)
        );

        alert('The file has been deleted');
      } else {
        setFiles((z) => z.filter((f) => f.name != file.name));
      }
    }
  };

  const handleRemoveLink = async (link) => {
    if (!confirm('Confirm delete link?')) return;

    if (link?.activityLinkId) {
      await activityService.deleteActivityLink(link.activityLinkId);

      setUrls((z) => z.filter((f) => f.activityLinkId != link.activityLinkId));

      alert('The link has been deleted');
    } else {
      setUrls((z) => z.filter((f) => f.url != link.url));
    }
  };

  const handleAddLink = async (url) => {
    let link = { url: url, activityId: selectedActivity.activityId };

    if (url)
      activityService
        .addActivityLink(link)
        .then((activityLinkId) => {
          link = {
            ...link,
            activityLinkId: activityLinkId,
            status: 'uploaded',
          };

          setUrls([...urls, link]);

          alert('The link has sucessfully been added!');
          return link;
        })
        .catch((error) => {
          link = { ...link, status: 'error' };
          setUrls((z) =>
            z.map((f) => {
              if (f.url != link.url) return f;

              return link;
            })
          );

          alert(`Error while adding the link to the activity!`, error);
        });
  };

  //console.log("Selected activity:", selectedActivity, userPrograms, userPrograms.filter(up => up.programId == selectedActivity.programId))

  return (
    <>
      {selectedActivity && (
        <Modal
          toggle={toggle}
          isOpen={isOpen}
          className="modal-outline-primary"
          size="lg"
        >
          <Formik
            enableReinitialize={false}
            initialValues={{
              activityName: selectedActivity.name || '',
              program: currentProgram || [],
              description: selectedActivity.description || '',
              location: selectedActivity.location || '',
              start:
                (selectedActivity.start &&
                  moment(selectedActivity.start).toDate()) ||
                '',
              end:
                (selectedActivity.end &&
                  moment(selectedActivity.end).toDate()) ||
                '',
              learners: selectedActivity.participants || [],
              priority: selectedActivity.priority || 1,
              activityType: selectedActivity.activityTypeId || '',
              courses: selectedActivity.courses || [],
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
              },
              { setStatus, setSubmitting }
            ) => {
              setStatus();
              setSubmitting(false);
              if (
                selectedActivity.repeat &&
                !confirm(
                  'This is a repeating activity. By changing the values here you are changing the original starting activity and changing all the repeating events. Are you sure you want to continue?'
                )
              ) {
                return;
              }

              if (!program || (program && program.length == 0)) {
                alert(`You need to select a program first!`);
                return;
              }

              if (priority == 3 && learners && learners.length == 0) {
                alert(`You need to select some learners first! :)`);
                return;
              }

              if (
                priority == 2 &&
                (!courses || (courses && courses.length == 0))
              ) {
                alert(`You must choose a level!`);
                return;
              }

              setSubmitting(true);

              const activity = {
                programId: program[0].programId,
                activityId: selectedActivity.activityId,
                name: activityName,
                start: start,
                end: end,
                priority: priority,
                activityTypeId: activityType,
                location: location,
                repeat: showRepeatOptions,
                description: description,
                participants: learners || null,
                courses: courses || null,
                rrule: (rrule && rrule.toString()) || null,
                organizationId: selectedOrganization.organizationId,
              };

              try {
                await activityService.update(activity);
                alert(`You have successfully updated an activity!`);
                toggle();
                if (onSuccess) {
                  onSuccess();
                }
              } catch (error) {
                console.log(error);
                setStatus(error);

                alert(
                  `We're sorry but something went wrong while trying to update the activity.`
                );
              }

              setSubmitting(false);
            }}
          >
            {(formikProps) => {
              //console.log("Selected priority:", selectedPriority)
              return (
                <React.Fragment>
                  <Form onSubmit={formikProps.handleSubmit}>
                    <ModalHeader tag="h6" toggle={toggle}>{`View ${
                      (selectedActivity.repeat && 'repeating') || ''
                    } activity details`}</ModalHeader>
                    <ModalBody>
                      <UncontrolledTabs initialActiveTabId="replies">
                        {/* START Pills Nav */}
                        <Nav
                          pills
                          className="mb-4 flex-column flex-md-row mt-4 mt-lg-0"
                        >
                          <NavItem>
                            <UncontrolledTabs.NavLink tabId="replies">
                              Replies
                            </UncontrolledTabs.NavLink>
                          </NavItem>
                          <NavItem>
                            <UncontrolledTabs.NavLink tabId="details">
                              Details
                            </UncontrolledTabs.NavLink>
                          </NavItem>
                          <NavItem>
                            <UncontrolledTabs.NavLink tabId="files">
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
                                      <Label for="program" sm={3}>
                                        Program
                                      </Label>
                                      <Col sm={9}>
                                        <Typeahead
                                          clearButton
                                          id="program"
                                          name="program"
                                          labelKey="name"
                                          disabled
                                          options={userPrograms || []}
                                          selected={formikProps.values.program}
                                          className={
                                            formikProps.errors.program &&
                                            formikProps.touched.program
                                              ? ' is-invalid'
                                              : ''
                                          }
                                          placeholder="Select a program..."
                                          onChange={(selectedOptions) => {
                                            formikProps.setFieldValue(
                                              'program',
                                              selectedOptions || []
                                            );
                                            //setSelectedProgramid(selectedOptions && selectedOptions.length > 0 && selectedOptions[0].programId || null)
                                            changePriority(formikProps, 1);
                                          }}
                                          onInputChange={(selectedOptions) => {
                                            formikProps.setFieldValue(
                                              'program',
                                              selectedOptions || []
                                            );
                                            //setSelectedProgramid(selectedOptions && selectedOptions.length > 0 && selectedOptions[0].programId || null);
                                            changePriority(formikProps, 1);
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
                                          disabled={
                                            currentUserRole == Role.Learner &&
                                            selectedActivity.activityTypeId !=
                                              11
                                          }
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
                                        {`${
                                          (selectedActivity.repeat &&
                                            'Activity started') ||
                                          'From'
                                        }`}
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
                                          onChange={(e) => {
                                            formikProps.setFieldValue(
                                              'start',
                                              e
                                            );
                                            formikProps.setFieldValue(
                                              'end',
                                              moment(e)
                                                .add(timeDifference, 'minutes')
                                                .toDate()
                                            );
                                          }}
                                          disabled={
                                            currentUserRole == Role.Learner &&
                                            selectedActivity.activityTypeId !=
                                              11
                                          }
                                        />
                                        {formikProps.errors.start &&
                                          formikProps.touched.start && (
                                            <InvalidFeedback>
                                              {formikProps.errors.start}
                                            </InvalidFeedback>
                                          )}
                                      </Col>
                                    </FormGroup>

                                    {!selectedActivity.repeat && (
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
                                            onChange={(e) => {
                                              formikProps.setFieldValue(
                                                'end',
                                                e
                                              );
                                              const end = moment(e);
                                              const start = moment(
                                                formikProps.values.start
                                              );

                                              const calculatedTimeDifference = Math.round(
                                                moment
                                                  .duration(end.diff(start))
                                                  .add(remainder, 'minutes')
                                                  .asMinutes()
                                              );
                                              setTimeDifference(
                                                calculatedTimeDifference
                                              );
                                            }}
                                            disabled={
                                              currentUserRole == Role.Learner &&
                                              selectedActivity.activityTypeId !=
                                                11
                                            }
                                          />
                                          {formikProps.errors.end &&
                                            formikProps.touched.end && (
                                              <InvalidFeedback>
                                                {formikProps.errors.end}
                                              </InvalidFeedback>
                                            )}
                                        </Col>
                                      </FormGroup>
                                    )}
                                    <FormGroup row>
                                      <Label for="description" sm={3}>
                                        Repeat?
                                      </Label>
                                      <Col sm={9}>
                                        <CustomInput
                                          inline
                                          disabled={
                                            currentUserRole == Role.Learner
                                          }
                                          type="radio"
                                          id="repeatYes"
                                          name="repeat"
                                          label="Yes"
                                          value="1"
                                          defaultChecked={showRepeatOptions}
                                          onChange={(event) => {
                                            setShowRepeatOptions(true);
                                          }}
                                        />
                                        <CustomInput
                                          inline
                                          type="radio"
                                          id="repeatNo"
                                          name="repeat"
                                          label="No"
                                          value="0"
                                          disabled={
                                            currentUserRole == Role.Learner
                                          }
                                          defaultChecked={!showRepeatOptions}
                                          onChange={(event) => {
                                            setShowRepeatOptions(false);
                                          }}
                                        />
                                      </Col>
                                    </FormGroup>
                                    {showRepeatOptions &&
                                      currentUserRole != Role.Learner && (
                                        <FormGroup row>
                                          <Col
                                            sm={12}
                                            style={{ whiteSpace: 'nowrap' }}
                                          >
                                            <RRuleGenerator
                                              value={selectedActivity.rrule}
                                              onChange={(rrule) => {
                                                setRRule(rrule);
                                              }}
                                              //config={{end: ['Never', 'After']}}
                                            />
                                          </Col>
                                        </FormGroup>
                                      )}
                                    {showRepeatOptions &&
                                      currentUserRole == Role.Learner && (
                                        <FormGroup row>
                                          <Label sm={3}>Repeating</Label>
                                          <Col
                                            sm={9}
                                            style={{ whiteSpace: 'nowrap' }}
                                          >
                                            <Label className="col-form-label">
                                              <strong>
                                                {selectedActivity.rrule &&
                                                  rrulestr(
                                                    selectedActivity.rrule
                                                  ).toText()}
                                              </strong>
                                            </Label>
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
                                          disabled={
                                            currentUserRole == Role.Learner &&
                                            selectedActivity.activityTypeId !=
                                              11
                                          }
                                        >
                                          <option value="">
                                            - choose activity type -
                                          </option>
                                          {activityTypes.map((at) => {
                                            //console.log("Map each at:", at)
                                            return (
                                              <option value={at.activityTypeId}>
                                                {at.activityTypeName}
                                              </option>
                                            );
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
                                          disabled={
                                            currentUserRole == Role.Learner &&
                                            selectedActivity.activityTypeId !=
                                              11
                                          }
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
                                          disabled={
                                            currentUserRole == Role.Learner &&
                                            selectedActivity.priority != 3
                                          }
                                          className={
                                            'bg-white form-control' +
                                            (formikProps.errors.description &&
                                            formikProps.touched.description
                                              ? ' is-invalid'
                                              : '')
                                          }
                                          placeholder="Enter description..."
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
                                              defaultChecked={
                                                selectedActivity.priority == 1
                                              }
                                              value="1"
                                              onChange={(event) => {
                                                changePriority(
                                                  formikProps,
                                                  event.target.value
                                                );
                                              }}
                                            />
                                            <CustomInput
                                              inline
                                              type="radio"
                                              id="priorityLevel"
                                              name="priority"
                                              label="Courses"
                                              value="2"
                                              defaultChecked={
                                                selectedActivity.priority == 2
                                              }
                                              onChange={(event) => {
                                                changePriority(
                                                  formikProps,
                                                  event.target.value
                                                );
                                              }}
                                            />
                                            <CustomInput
                                              inline
                                              type="radio"
                                              id="priorityLearners"
                                              name="priority"
                                              label="Learners"
                                              value="3"
                                              defaultChecked={
                                                selectedActivity.priority == 3
                                              }
                                              onChange={(event) => {
                                                changePriority(
                                                  formikProps,
                                                  event.target.value
                                                );
                                              }}
                                            />
                                          </>
                                        )}
                                        {currentUserRole == Role.Learner && (
                                          <Label className="col-form-label">
                                            <strong>
                                              {(selectedActivity.priority ==
                                                1 &&
                                                'Program') ||
                                                (selectedActivity.priority ==
                                                  2 &&
                                                  `Levels`) ||
                                                (selectedActivity.priority ==
                                                  3 &&
                                                  `Learners`)}
                                            </strong>
                                          </Label>
                                        )}
                                      </Col>
                                    </FormGroup>
                                    {formikProps.values &&
                                      formikProps.values.priority &&
                                      formikProps.values.priority == 2 && (
                                        <FormGroup row>
                                          <Label for="level" sm={3}>
                                            Courses
                                          </Label>
                                          <Col sm={9}>
                                            <Typeahead
                                              clearButton
                                              id="courses"
                                              labelKey="name"
                                              options={courses || []}
                                              selected={
                                                formikProps.values.courses
                                              }
                                              multiple
                                              className={
                                                formikProps.errors.courses &&
                                                formikProps.touched.courses
                                                  ? ' is-invalid'
                                                  : ''
                                              }
                                              placeholder="Select courses..."
                                              onChange={(selectedOptions) =>
                                                formikProps.setFieldValue(
                                                  'courses',
                                                  selectedOptions
                                                )
                                              }
                                              onInputChange={(
                                                selectedOptions
                                              ) =>
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
                                              selected={
                                                formikProps.values.learners
                                              }
                                              className={
                                                formikProps.errors.learners &&
                                                formikProps.touched.learners
                                                  ? ' is-invalid'
                                                  : ''
                                              }
                                              placeholder="Select learners..."
                                              onChange={(selectedOptions) =>
                                                formikProps.setFieldValue(
                                                  'learners',
                                                  selectedOptions
                                                )
                                              }
                                              onInputChange={(
                                                selectedOptions
                                              ) =>
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
                                    <FormGroup row>
                                      <Label for="learners" sm={3}>
                                        Created by
                                      </Label>
                                      <Col sm={9}>
                                        <Label className="col-form-label">
                                          <strong>
                                            {`${selectedActivity.assignedByFirstName} ${selectedActivity.assignedByLastName}`}
                                            {currentUser &&
                                              currentUser.user &&
                                              (selectedActivity.assignedBy ==
                                                currentUser.user.employeeId ||
                                                selectedActivity.assignedBy ==
                                                  currentUser.user.userId) &&
                                              ' (You)'}
                                          </strong>
                                        </Label>
                                      </Col>
                                    </FormGroup>
                                    {/* END Form */}
                                  </CardBody>
                                </Card>
                              </Col>
                            </Row>
                          </TabPane>
                          <TabPane tabId="replies">
                            <ActivityReplies
                              selectedActivity={selectedActivity}
                              currentUser={currentUser && currentUser.user}
                            />
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
                      {selectedActivity.activityTypeId == 11 &&
                        selectedActivity.assignedBy !=
                          currentUser.user.employeeId && (
                          <>
                            <Button
                              type="button"
                              color="success"
                              onClick={() => updateActivityStatus(4)}
                            >
                              Accept
                            </Button>{' '}
                            <Button
                              type="button"
                              color="danger"
                              onClick={() => updateActivityStatus(5)}
                            >
                              Decline
                            </Button>{' '}
                          </>
                        )}

                      {(currentUserRole == Role.SuperAdmin ||
                        currentUserRole == Role.Admin ||
                        currentUserRole == Role.LearningManager ||
                        selectedActivity.assignedBy ==
                          currentUser.user.employeeId) && (
                        <>
                          <ThemedButton type="submit" color="primary">
                            Edit
                          </ThemedButton>
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
              );
            }}
          </Formik>
        </Modal>
      )}
    </>
  );
};
