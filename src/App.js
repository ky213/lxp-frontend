import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import "./App.css";
import Activity from "./Pages/Activity/Activity";
import LoadDataRouter from "./Pages/Common/LoadDataRouter/LoadDataRouter";
import CoursesContainer from "./Pages/Courses/CoursesContainer";
import HomeContainer from "./Pages/Home/HomeContainer";
import NavbarContainer from "./Pages/Navbar/NavbarContainer";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import { setDirection, setCurrentLanguage } from "./Store/Reducers/common";
import ActivitiesContainer from "./Pages/Activites/ActivitiesContainer";
import Login from "./Pages/Auth/Login/Login";
import AddActivity from "./Pages/Activity/AddActivity/AddActivity";
import ForgotPassword from "./Pages/Auth/Forgot/ForgotPassword";
import ReportsContainer from "./Pages/Reports/ReportsContainer";
import Profile from "./Pages/Profile/Profile";
import EditActivity from "./Pages/Activity/EditActivity/EditActivity";
import LessonsContainer from "./Pages/Lessons/LessonsContainer";
import ProgramsContainer from "./Pages/Programs/ProgramsContainer";
import SearchResultContainer from "./Pages/SearchResult/SearchResultContainer";
import NotificationsContainer from "./Pages/Notifications/NotificationsContainer";
import AddProgram from "./Pages/Programs/AddProgram/AddProgram";
import ResourcesContainer from "./Pages/Activites/Resources/ResourcesContainer";

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
          <Route exact path="/home" render={() => <LoadDataRouter Component={HomeContainer} />}/>
          <Route exact path="/courses" render={() => <LoadDataRouter Component={CoursesContainer} />}/>
          <Route path="/courses/:courseId" render={() => <LoadDataRouter Component={LessonsContainer} />}/>
          <Route path="/activities/view/:activityId" render={() => <LoadDataRouter Component={Activity} />}/>
          <Route exact path="/activities" render={() => <LoadDataRouter Component={ActivitiesContainer} />}/>
          <Route path="/activities/add" render={() => <LoadDataRouter Component={AddActivity} />}/>
          <Route path="/activities/edit/:activityId" render={() => <LoadDataRouter Component={EditActivity} />}/>
          <Route exact path="/programs" render={() => <LoadDataRouter Component={ProgramsContainer} />}/>
          <Route path="/programs/add" render={() => <LoadDataRouter Component={AddProgram} />}/>
          <Route path="/profile" render={() => <LoadDataRouter Component={Profile} />}/>
          <Route path="/login" render={() => <Login />} />
          <Route path="/forgot_password" render={() => <ForgotPassword />} />
          <Route path="/report" render={() => <LoadDataRouter Component={ReportsContainer} />}/>
          <Route path="/search" render={() => <LoadDataRouter Component={SearchResultContainer} />}/>
          <Route path="/home/notifications" render={() => <LoadDataRouter Component={NotificationsContainer} />}/>
          <Route path="/resources" render={() => <LoadDataRouter Component={ResourcesContainer} />}/>
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
