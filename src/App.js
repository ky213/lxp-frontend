import React from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';

import { MainLayout, PageNotFound, LoadDataRouter, PrivateRoute } from 'Components';
import { setDirection, setCurrentLanguage } from 'Store/Reducers/common';
import {
  Home,
  Programs,
  Library,
  Notifications,
  Reports,
  Activities,
  SearchResult,
  Login,
  ForgotPassword,
  Profile,
} from 'Pages';
import './App.css';
import CourseRoutes from 'Pages/Courses/CourseRoutes';

const App = props => {
  const { t, i18n } = useTranslation();

  const changeLanguage = language => {
    switch (language) {
      case 'en': {
        props.setDirection('ltr');
        break;
      }
      case 'ar': {
        props.setDirection('rtl');
        break;
      }
      default: {
        props.setDirection('ltr');
        break;
      }
    }
    i18n.changeLanguage(language);
  };

  return (
    <MainLayout direction={props.direction} changeLanguage={changeLanguage}>
      <Switch>
        <Route exact path="/" render={() => <Redirect to="/home" />} />
        <Route path="/home" component={Home} />
        <Route path="/courses" component={CourseRoutes} />
        <PrivateRoute path="/activities" component={Activities} hasRole={[]} />
        <Route path="/programs" component={Programs} />
        <Route path="/profile" component={Profile} />
        <Route path="/login" component={Login} />
        <Route path="/forgot_password" component={ForgotPassword} />
        <Route path="/report" component={Reports} />
        <Route path="/search" component={SearchResult} />
        <Route path="/home/notifications" component={Notifications} />
        <Route path="/library" component={Library} />
        <Route component={PageNotFound} />
      </Switch>
    </MainLayout>
  );
};

let mapStateToProps = state => ({
  direction: state.common.direction,
  currentLanguage: state.common.currentLanguage,
});

export default connect(mapStateToProps, {
  setDirection,
  setCurrentLanguage,
})(App);
