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
        <Route path="/home" render={() => <LoadDataRouter Component={Home} />} />
        <Route path="/courses" render={() => <LoadDataRouter Component={CourseRoutes} />} />
        <PrivateRoute path="/activities" component={Activities} hasRole={[]} />
        <Route path="/programs" render={() => <LoadDataRouter Component={Programs} />} />
        <Route path="/profile" render={() => <LoadDataRouter Component={Profile} />} />
        <Route path="/login" render={() => <Login />} />
        <Route path="/forgot_password" render={() => <ForgotPassword />} />
        <Route path="/report" render={() => <LoadDataRouter Component={Reports} />} />
        <Route path="/search" render={() => <LoadDataRouter Component={SearchResult} />} />
        <Route path="/home/notifications" render={() => <LoadDataRouter Component={Notifications} />} />
        <Route path="/library" render={() => <LoadDataRouter Component={Library} />} />
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
