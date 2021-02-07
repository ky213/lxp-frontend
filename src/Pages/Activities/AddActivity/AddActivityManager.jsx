import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import { TextField, Select } from 'formik-material-ui';
import { Autocomplete } from 'formik-material-ui-lab';
import { DateTimePicker } from 'formik-material-ui-pickers';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import moment from 'moment';
import * as Yup from 'yup';

import { getPrograms } from 'Store/Reducers/programs';
import { getActiveLearners } from 'Store/Reducers/users';
import { getCourses } from 'Store/Reducers/courses';
import { getActivityTypes, createActivity, updateActivity } from 'Store/Reducers/activities';
import {
  Grid,
  PageLayout,
  Button,
  Label,
  FormControlLabel,
  Radio,
  RadioGroup,
  MenuItem,
  FormControl,
  CircularProgress,
  RRuleGenerator,
  Preloader,
  TextField as BaseTextField,
} from 'Components';

export const AddEditActivity = props => {
  const [programSearch, setProgramSearch] = useState(false);
  const [courseSearch, setCourseSearch] = useState(false);
  const [learnerSearch, setLearnerSearch] = useState(false);

  const { activities, programs, courses, learners, profile } = props;

  const handleSubmit = (values, { setSubmitting }) => {
    if (activities.currentActivity)
      props.updateActivity({
        ...values,
        activityId: activities.currentActivity.activityId[0],
        programId: values.programId.programId,
      });
    else props.createActivity({ ...values, programId: values.programId.programId });

    setSubmitting(false);
  };

  const initialValues = {
    programId: [],
    name: 'xxxxx',
    start: '2021-02-09T23:00:00.000Z',
    end: '2021-02-09T23:00:00.000Z',
    activityTypeId: '2',
    location: 'xxxx',
    description: 'xxxxxxx',
    repeat: false,
    participants: [],
    courses: [],
    rrule: null,
    organizationId: 'b5cc3af9-334a-48dc-abbf-05a966bc648d',
    totalPoints: 7,
    isPublic: true,
    priority: 1,
  };

  const validationSchema = Yup.object().shape({
    programId: Yup.array().min(1, 'You need to select a program'),
    name: Yup.string().required('You need to enter a name for the activity'),
    start: Yup.date().required('Starting time of the activity is required'),
    activityType: Yup.string().required('You need to select the activity type'),
    repeat: Yup.boolean(),
    end: Yup.date()
      .required('Ending time of the activity is required')
      .when('start', (start, schema) =>
        schema.min(
          start,
          ({ min }) => `Ending time must be greater than the activity starting time (${moment(min).format('LLLL')})`
        )
      ),
    courses: Yup.array(),
    participants: Yup.array(),
    totalPoints: Yup.number().min(0).required('You need to set total points').default(0),
    isPublic: Yup.boolean(),
    priority: Yup.number(),
  });

  // if (activities.loading && activities.activityTypes.length > 0) return <Preloader />;

  return (
    <PageLayout title="Add activity" fullWidth>
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          {({ errors, touched, values, handleChange, setFieldValue, isSubmitting }) => (
            <Form style={{ width: '75%', margin: 'auto' }}>
              <Field
                id="programId"
                name="programId"
                component={Autocomplete}
                open={programSearch}
                getOptionSelected={(option, value) => option.programId === value.programId}
                getOptionLabel={option => `${option?.name || ''}`}
                options={programs.programs}
                loading={programs.loading}
                error={touched.programId && Boolean(errors.programId)}
                helperText={touched.programId && errors.programId}
                onOpen={() => {
                  setProgramSearch(true);
                  props.getPrograms(profile.organizationId);
                }}
                onClose={() => {
                  setProgramSearch(false);
                }}
                renderInput={params => (
                  <BaseTextField
                    {...params}
                    label="Program"
                    required
                    InputProps={{
                      ...params.InputProps,
                      endAdornment: (
                        <>
                          {programs.loading ? <CircularProgress color="primary" size={20} /> : null}
                          {params.InputProps.endAdornment}
                        </>
                      ),
                    }}
                  />
                )}
              />
              <Field
                id="name"
                name="name"
                label="Activty name"
                placeholder="e.g: brainstorm new ideas "
                component={TextField}
                error={touched.name && Boolean(errors.name)}
                helperText={touched.name && errors.name}
                fullWidth
                required
              />
              <FormControl style={{ margin: '10px 0 25px 0' }} required fullWidth>
                <Label>Activity type</Label>
                <Field
                  component={Select}
                  name="activityTypeId"
                  onOpen={() => props.getActivityTypes(profile.organizationId)}
                >
                  {activities.activityTypes.map(({ activityTypeName, activityTypeId }) => (
                    <MenuItem value={activityTypeId} key={activityTypeId}>
                      {activityTypeName}
                    </MenuItem>
                  ))}
                </Field>
              </FormControl>

              <Field
                id="totalPoints"
                name="totalPoints"
                label="Total points"
                type="number"
                component={TextField}
                error={touched.totalPoints && Boolean(errors.totalPoints)}
                helperText={touched.totalPoints && errors.totalPoints}
                fullWidth
                required
              />
              <Field
                id="description"
                name="description"
                label="Short description"
                component={TextField}
                error={touched.description && Boolean(errors.description)}
                helperText={touched.description && errors.description}
                fullWidth
                multiline
                rows={4}
                rowsMax={4}
              />
              <Grid container spacing={1}>
                <Grid item xs={6}>
                  <Field id="start" name="start" label="From" component={DateTimePicker} fullWidth />
                </Grid>
                <Grid item xs={6}>
                  <Field id="end" name="end" label="To" component={DateTimePicker} fullWidth />
                </Grid>
              </Grid>
              <Label style={{ marginBottom: '8px' }}>Repeat?</Label>
              <RadioGroup
                defaultValue={'no'}
                onChange={({ target }) => setFieldValue('repeat', target.value === 'yes')}
                row
              >
                <FormControlLabel
                  label="Yes"
                  labelPlacement="end"
                  value="yes"
                  control={<Radio disabled={isSubmitting} />}
                  disabled={isSubmitting}
                />
                <FormControlLabel
                  label="No"
                  labelPlacement="end"
                  value="no"
                  control={<Radio disabled={isSubmitting} />}
                  disabled={isSubmitting}
                />
              </RadioGroup>
              {values.repeat && (
                <RRuleGenerator
                  onChange={rrule => setFieldValue('rrule', rrule)}
                  rrule={activities.currentActivity?.rrule}
                />
              )}
              <Label style={{ margin: '25px 0 10px 0' }}>Visibility</Label>
              <RadioGroup label="position" name="position" defaultValue={'true'} row>
                <FormControlLabel
                  label="Public"
                  labelPlacement="end"
                  value={'true'}
                  control={<Radio disabled={isSubmitting} />}
                  disabled={isSubmitting}
                />
                <FormControlLabel
                  label="Private"
                  labelPlacement="end"
                  value={'false'}
                  control={<Radio disabled={isSubmitting} />}
                  disabled={isSubmitting}
                />
              </RadioGroup>
              <Field
                id="courses"
                name="courses"
                component={Autocomplete}
                open={courseSearch}
                getOptionSelected={(option, value) => option.courseId === value.courseId}
                getOptionLabel={option => `${option.name}`}
                options={courses.courses}
                loading={courses.loading}
                error={touched.courses && Boolean(errors.courses)}
                required
                multiple
                disabled={values.programId.length === 0}
                style={{ marginTop: '15px' }}
                onOpen={() => {
                  setCourseSearch(true);
                  props.getCourses(profile.organizationId);
                }}
                onClose={() => {
                  setCourseSearch(false);
                }}
                renderInput={params => (
                  <BaseTextField
                    {...params}
                    label="Courses"
                    InputProps={{
                      ...params.InputProps,
                      endAdornment: (
                        <>
                          {courses.loading ? <CircularProgress color="primary" size={20} /> : null}
                          {params.InputProps.endAdornment}
                        </>
                      ),
                    }}
                  />
                )}
              />
              <Field
                id="participants"
                name="participants"
                component={Autocomplete}
                open={learnerSearch}
                getOptionSelected={(option, value) => option.userId === value.userId}
                getOptionLabel={option => `${option.name} ${option.surname}`}
                options={learners.users}
                loading={learners.loading}
                error={touched.learners && Boolean(errors.learners)}
                style={{ marginTop: '10px' }}
                required
                multiple
                disabled={values.programId.length === 0}
                onOpen={() => {
                  setLearnerSearch(true);
                  props.getActiveLearners(profile.organizationId, values.programId);
                }}
                onClose={() => {
                  setLearnerSearch(false);
                }}
                renderInput={params => (
                  <BaseTextField
                    {...params}
                    label="Learners"
                    InputProps={{
                      ...params.InputProps,
                      endAdornment: (
                        <>
                          {learners.loading ? <CircularProgress color="primary" size={20} /> : null}
                          {params.InputProps.endAdornment}
                        </>
                      ),
                    }}
                  />
                )}
              />
              <Grid>
                <Button type="submit" variant="contained" color="primary" disabled={programs.loading}>
                  Save
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  disabled={programs.loading}
                  onClick={props.history.goBack}
                >
                  Cancel
                </Button>
              </Grid>
            </Form>
          )}
        </Formik>
      </MuiPickersUtilsProvider>
    </PageLayout>
  );
};

const mapStateToProps = state => ({
  profile: state.authentication.profile,
  activities: state.activities,
  programs: state.programs,
  courses: state.courses,
  learners: state.users,
});

const mapDispatchToProps = {
  getPrograms,
  getCourses,
  getActiveLearners,
  getActivityTypes,
  createActivity,
  updateActivity,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddEditActivity);
