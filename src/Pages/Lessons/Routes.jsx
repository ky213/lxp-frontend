import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { Lesson } from './Lesson';
import { PageNotFound } from 'Components';

const LessonsRoutes = props => {
  return (
    <Switch>
      <Route exact path={`/lessons/:lessonId`} component={Lesson} />
      <Route component={PageNotFound} />
    </Switch>
  );
};

export default LessonsRoutes;
