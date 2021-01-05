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
import { setDirection } from "./Redux/commonReducer";
import ActivitiesContainer from "./Components/Activites/ActivitiesContainer";
import Login from "./Components/Auth/Login/Login";
import AddActivity from "./Components/Activity/AddActivity/AddActivity";
import ReportsContainer from "./Components/Reports/ReportsContainer";

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
            path="/home"
            render={() => <LoadDataRouter Component={HomeContainer} />}
          />
          <Route
            path="/courses"
            render={() => <LoadDataRouter Component={CoursesContainer} />}
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
            path="/report"
            render={() => <LoadDataRouter Component={ReportsContainer} />}
          />
          <Route path="/login" render={() => <Login />} />
        </Switch>
      </StyledContentContainer>
    </BrowserRouter>
  );
};

let mapStateToProps = (state) => ({
  direction: state.common.direction,
});

export default connect(mapStateToProps, {
  setDirection,
})(App);
