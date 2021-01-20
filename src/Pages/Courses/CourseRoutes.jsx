import React from 'react';
import { Switch, Route } from 'react-router-dom';
import AddCourse from './AddCourse/AddCourse';
import { PageNotFound } from '../../Components';
import CoursesContainer from './CoursesContainer';
import EditCourse from './EditCourse/EditCourse';

const CourseRoutes = (props) => {
    return(
        <Switch>
            <Route exact path={`/courses`} component={CoursesContainer} />
            <Route exact path={`/courses/add`} component={AddCourse} />
            <Route exact path={`/courses/edit/:courseId`} component={EditCourse} />
            <Route component={PageNotFound} />
        </Switch>
    );
}

export default CourseRoutes;