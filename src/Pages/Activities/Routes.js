import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { PageNotFound } from '../../Components';
import { Activities, AddActivity, EditActivity } from '.';

const ActivityRoutes = props => {
  return (
    <Switch>
      <Route exact path={`${props.match.url}`} component={Activities} />
      <Route exact path={`${props.match.url}/add`} component={AddActivity} />
      <Route exact path={`${props.match.url}/edit/:id`} component={EditActivity} />
      <Route component={PageNotFound} />
    </Switch>
  );
};

export default ActivityRoutes;
