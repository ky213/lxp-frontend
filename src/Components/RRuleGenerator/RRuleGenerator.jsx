import React from 'react';
import { RRule, RRuleSet, rrulestr } from 'rrule';

import { Grid, Select, MenuItem } from 'Components';

const RRuleGenerator = props => {
  const rule = new RRule({
    freq: RRule.WEEKLY,
    interval: 5,
    byweekday: [RRule.MO, RRule.FR],
    dtstart: new Date(Date.UTC(2012, 1, 1, 10, 30)),
    until: new Date(Date.UTC(2012, 12, 31)),
  });

  return (
    <Grid container spacing={2} style={{ width: '100%' }}>
      <Grid item xs={5}>
        Repeat
      </Grid>
      <Grid item xs={5}>
        <Select fullWidth>
          <MenuItem value={'YEARLY'}>Yearly</MenuItem>
        </Select>
      </Grid>
    </Grid>
  );
};

export default RRuleGenerator;
