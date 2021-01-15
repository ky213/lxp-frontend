import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';

import { ErrorBoundary, PageNotFound, LoadDataRouter } from './Components';
import { setDirection, setCurrentLanguage } from '../src/Store/Reducers/common';
import {
  Home,
  Programs,
  Courses,
  Library,
  Notifications,
  Reports,
  Activities,
  SearchResult,
  NavBar,
  Login,
  ForgotPassword,
  Profile,
} from './Pages';
import './App.css';

const StyledContentContainer = styled.div`
  width: 100%;
  direction: ${({ direction }) => direction};
`;

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
    <Router>
      <StyledContentContainer direction={props.direction}>
        <NavBar changeLanguage={changeLanguage} />
        <ErrorBoundary>
          <Switch>
            <Route exact path="/" render={() => <Redirect to="/home" />} />
            <Route path="/home" render={() => <LoadDataRouter Component={Home} />} />
            <Route path="/courses" render={() => <LoadDataRouter Component={Courses} />} />
            <Route path="/activities" component={Activities} />
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
        </ErrorBoundary>
      </StyledContentContainer>
    </Router>
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
