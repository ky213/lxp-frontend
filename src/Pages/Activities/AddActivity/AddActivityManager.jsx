import React from 'react';
import { connect } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import { TextField, Select } from 'formik-material-ui';
import { DateTimePicker } from 'formik-material-ui-pickers';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import * as Yup from 'yup';

import { PageLayout, Label, FormControlLabel, Radio, RadioGroup } from 'Components';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
export const AddEditActivity = props => {
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
        <Formik initialValues={initialValues}>
          {({ errors, touched, values, handleChange, setFieldValue, isSubmitting }) => (
            <Form style={{ width: '50%', margin: 'auto' }}>
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
                <InputLabel>Activity type</InputLabel>
                <Field component={Select} name="activityTypeId" fullWidth>
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Field>
              </FormControl>
              <Label style={{ marginTop: '12px' }}>Visibility</Label>
              <RadioGroup label="position" name="isPublic" defaultValue="yes" row>
                <FormControlLabel
                  label="Public"
                  labelPlacement="end"
                  value={true}
                  control={<Radio disabled={isSubmitting} />}
                  disabled={isSubmitting}
                />
                <FormControlLabel
                  label="No"
                  labelPlacement="end"
                  value={false}
                  control={<Radio disabled={isSubmitting} />}
                  disabled={isSubmitting}
                />
              </RadioGroup>
            </Form>
          )}
        </Formik>
      </MuiPickersUtilsProvider>
    </PageLayout>
  );
};

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(AddEditActivity);
