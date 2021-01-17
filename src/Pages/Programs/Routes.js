import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { PageNotFound } from '../../Components';
import AddEditProgram from './AddEdit';
import Programs from './ProgramsContainer';

const ActivityRoutes = props => {
  return (
    <Switch>
      <Route exact path={`${props.match.url}`} component={Programs} />
      <Route exact path={`${props.match.url}/add`} component={AddEditProgram} />
      <Route exact path={`${props.match.url}/edit/:id`} component={AddEditProgram} />
      <Route component={PageNotFound} />
    </Switch>
  );
};

export default ActivityRoutes;
