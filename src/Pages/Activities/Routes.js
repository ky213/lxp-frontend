import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { PageNotFound } from 'Components';
import AddActivity from './AddActivity/AddActivity';
import EditActivity from './EditActivity/EditActivity';
import ActivitiesContainer from './ActivitiesContainer';
import { USER_ROLES } from 'Config/constants';
import AddActivityManager from './AddActivity/AddActivityManager';
import { connect } from 'react-redux';
import Activity from './Activity';

const ActivityRoutes = props => {
  return (
    <Switch>
      <Route exact path={`/activities`} component={ActivitiesContainer} />
      <Route exact path={`/activities/view/:activityId`} component={Activity} />
      <Route
        exact
        path={`/activities/add`}
        component={props.user.roleId === USER_ROLES.LEARNER ? AddActivity : AddActivityManager}
      />
      <Route exact path={`/activities/edit/:id`} component={EditActivity} />
      <Route component={PageNotFound} />
    </Switch>
  );
};

let mapStateToProps = state => ({
  profile: state.authentication.profile,
});

export default connect(mapStateToProps, {})(ActivityRoutes);
