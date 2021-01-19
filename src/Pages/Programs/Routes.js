import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { PageNotFound } from '../../Components';
import AddProgram from './AddProgram/AddProgram';
import EditProgram from './EditProgram/EditProgram';
import ProgramAttendeesContainer from './ProgramDetails/ProgramAttendees/ProgramAttendeesContainer';
import ProgramViewContainer from './ProgramDetails/ProgramView/ProgramViewContainer';
import ProgramsContainer from './ProgramsContainer';

const ActivityRoutes = props => {
  return (
    <Switch>
      <Route exact path={`/programs`} component={ProgramsContainer} />
      <Route exact path={`/programs/view/:programId`} component={ProgramViewContainer} />
      <Route exact path={`/programs/view/:programId/attendees`} component={ProgramAttendeesContainer} />
      <Route exact path={`/programs/add`} component={AddProgram} />
      <Route exact path={`/programs/edit/:programId`} component={EditProgram} />
      <Route component={PageNotFound} />
    </Switch>
  );
};

export default ActivityRoutes;
