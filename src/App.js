import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import "./App.css";
import Activity from "./Components/Activity/Activity";
import LoadDataRouter from "./Components/Common/LoadDataRouter/LoadDataRouter";
import CoursesContainer from "./Components/Courses/CoursesContainer";
import HomeContainer from "./Components/Home/HomeContainer";
import NavbarContainer from "./Components/Navbar/NavbarContainer";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import { setDirection, setCurrentLanguage } from "./Redux/commonReducer";
import ActivitiesContainer from "./Components/Activites/ActivitiesContainer";
import Login from "./Components/Auth/Login/Login";
import AddActivity from "./Components/Activity/AddActivity/AddActivity";
import ForgotPassword from "./Components/Auth/Forgot/ForgotPassword";
import ReportsContainer from "./Components/Reports/ReportsContainer";
import Profile from "./Components/Profile/Profile";
import EditActivity from "./Components/Activity/EditActivity/EditActivity";
import LessonsContainer from "./Components/Lessons/LessonsContainer";
import ProgramsContainer from "./Components/Programs/ProgramsContainer";
import SearchResultContainer from "./Components/SearchResult/SearchResultContainer";
import NotificationsContainer from "./Components/Notifications/NotificationsContainer";
import LibraryContainer from "./Components/Activites/Library/LibraryContainer";

const StyledContentContainer = styled.div`
  width: 100%;
  direction: ${({ direction }) => direction};
`;

const App = (props) => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (language) => {
    switch (language) {
      case "en": {
        props.setDirection("ltr");
        break;
      }
      case "ar": {
        props.setDirection("rtl");
        break;
      }
      default: {
        props.setDirection("ltr");
        break;
      }
    }
    i18n.changeLanguage(language);
  };

  return (
    <BrowserRouter>
      <StyledContentContainer direction={props.direction}>
        <NavbarContainer changeLanguage={changeLanguage} />
        <Switch>
          <Route exact path="/">
            <Redirect to="/home" />
          </Route>
          <Route
            exact
            path="/home"
            render={() => <LoadDataRouter Component={HomeContainer} />}
          />
          <Route
            exact
            path="/courses"
            render={() => <LoadDataRouter Component={CoursesContainer} />}
          />
          <Route
            path="/courses/:courseId"
            render={() => <LoadDataRouter Component={LessonsContainer} />}
          />
          <Route
            path="/activities/view/:activityId"
            render={() => <LoadDataRouter Component={Activity} />}
          />
          <Route
            exact
            path="/activities"
            render={() => <LoadDataRouter Component={ActivitiesContainer} />}
          />
          <Route
            path="/activities/add"
            render={() => <LoadDataRouter Component={AddActivity} />}
          />
          <Route
            path="/activities/edit/:activityId"
            render={() => <LoadDataRouter Component={EditActivity} />}
          />
          <Route
            path="/programs"
            render={() => <LoadDataRouter Component={ProgramsContainer} />}
          />
          <Route
            path="/profile"
            render={() => <LoadDataRouter Component={Profile} />}
          />
          <Route path="/login" render={() => <Login />} />
          <Route path="/forgot_password" render={() => <ForgotPassword />} />
          <Route
            path="/report"
            render={() => <LoadDataRouter Component={ReportsContainer} />}
          />
          <Route
            path="/search"
            render={() => <LoadDataRouter Component={SearchResultContainer} />}
          />
          <Route
            path="/home/notifications"
            render={() => <LoadDataRouter Component={NotificationsContainer} />}
          />
          <Route
            path="/library"
            render={() => <LoadDataRouter Component={LibraryContainer} />}
          />
        </Switch>
      </StyledContentContainer>
    </BrowserRouter>
  );
};

let mapStateToProps = (state) => ({
  direction: state.common.direction,
  currentLanguage: state.common.currentLanguage,
});

export default connect(mapStateToProps, {
  setDirection,
  setCurrentLanguage,
})(App);
