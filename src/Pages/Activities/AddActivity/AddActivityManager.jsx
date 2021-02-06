import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import { TextField, Select } from 'formik-material-ui';
import { Autocomplete } from 'formik-material-ui-lab';
import { DateTimePicker } from 'formik-material-ui-pickers';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import * as Yup from 'yup';

import { getPrograms } from 'Store/Reducers/programs';
import { getActiveLearners } from 'Store/Reducers/users';
import { getCourses } from 'Store/Reducers/courses';
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
  TextField as BaseTextField,
} from 'Components';

export const AddEditActivity = props => {
  const [programSearch, setProgramSearch] = useState(false);
  const [courseSearch, setCourseSearch] = useState(false);
  const [learnerSearch, setLearnerSearch] = useState(false);

  const { programs, courses, learners, profile } = props;

  const handleSubmit = (values, { setSubmitting }) => {
    console.log(values);
    setSubmitting(false);
  };

  const initialValues = {
    programId: 'c1ab5e5d-48d2-4004-b902-6318ace53353',
    name: 'xxxxx',
    start: '2021-02-09T23:00:00.000Z',
    end: '2021-02-09T23:00:00.000Z',
    priority: 1,
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
  };

  return (
    <PageLayout title="Add activity" fullWidth>
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          {({ errors, touched, values, handleChange, setFieldValue, isSubmitting }) => (
            <Form style={{ width: '50%', margin: 'auto' }}>
              <Field
                id="programId"
                name="programId"
                component={Autocomplete}
                open={programSearch}
                getOptionSelected={(option, value) => option.programId === value.programId}
                getOptionLabel={option => `${option.name} ${option.surname}`}
                options={programs.programs}
                loading={programs.loading}
                error={touched.programId && Boolean(errors.programId)}
                required
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
                id="activityName"
                name="activityName"
                label="Activty name"
                placeholder="e.g: brainstorm new ideas "
                component={TextField}
                error={touched.activityName && Boolean(errors.activityName)}
                helperText={touched.activityName && errors.activityName}
                fullWidth
                required
              />
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
              />
              <Field id="start" name="start" label="From" component={DateTimePicker} />
              <Field id="start" name="start" label="To" component={DateTimePicker} />
              <Label style={{ marginBottom: '8px' }}>Repeat?</Label>
              <RadioGroup label="position" name="position" defaultValue="yes" row>
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
              <FormControl fullWidth style={{ marginTop: '10px' }}>
                <Label>Activity type</Label>
                <Field component={Select} name="activityTypeId" fullWidth>
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Field>
              </FormControl>
              <Label style={{ marginTop: '20px' }}>Visibility</Label>
              <RadioGroup label="position" name="position" defaultValue={true} row>
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
              <Label style={{ marginTop: '20px' }}>Assign to</Label>
              <RadioGroup label="position" name="position" defaultValue={'program'} row>
                <FormControlLabel
                  label="Course"
                  labelPlacement="end"
                  value="course"
                  control={<Radio disabled={isSubmitting} />}
                  disabled={isSubmitting}
                />
                <FormControlLabel
                  label="Learner"
                  labelPlacement="end"
                  value="learner"
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
                getOptionSelected={(option, value) => option.courseId === value.courseId}
                getOptionLabel={option => `${option.name} ${option.surname}`}
                options={learners.users}
                loading={learners.loading}
                error={touched.learners && Boolean(errors.learners)}
                required
                multiple
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
                          {courses.loading ? <CircularProgress color="primary" size={20} /> : null}
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
  programs: state.programs,
  courses: state.courses,
  learners: state.users,
});

const mapDispatchToProps = {
  getPrograms,
  getCourses,
  getActiveLearners,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddEditActivity);
