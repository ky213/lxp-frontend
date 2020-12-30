import React, { useEffect, useState } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import './App.css';
import Activity from './Components/Activity/Activity';
import LoadDataRouter from './Components/Common/LoadDataRouter/LoadDataRouter';
import CoursesContainer from './Components/Courses/CoursesContainer';
import HomeContainer from './Components/Home/HomeContainer';
import NavbarContainer from './Components/Navbar/NavbarContainer';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { setDirection } from './Redux/commonReducer';
import ActivitiesContainer from './Components/Activites/ActivitiesContainer';
import Login from './Components/Auth/Login/Login';

const StyledContentContainer = styled.div`
  width: 100%;
  direction: ${({ direction }) => direction};
`;

const App = (props) => {
  const {t, i18n} = useTranslation();

  const changeLanguage = (language) => {
    switch(language){
      case "en":{
        props.setDirection("ltr");
        break;
      }
      case "ar":{
        props.setDirection("rtl");
        break;
      }
      default:{
        props.setDirection("ltr");
        break;
      }
    }
    i18n.changeLanguage(language);
  };

  useEffect(()=>{
    
  },[]);

  return (
    <BrowserRouter>
      <StyledContentContainer direction={props.direction}>
        <NavbarContainer changeLanguage={changeLanguage}/>
        <Switch>
          <Route exact path="/" component>
            <Redirect to="/home"/>
          </Route>
          <Route path="/home" render={()=><LoadDataRouter Component={HomeContainer}/>}/>
          <Route path="/courses" render={()=><LoadDataRouter Component={CoursesContainer}/>}/>
          <Route path="/activities/:activityId" render={()=><LoadDataRouter Component={Activity}/>}/>
          <Route exact path="/activities" render={()=><LoadDataRouter Component={ActivitiesContainer}/>}/>
          <Route exact path="/login" render={()=><Login/>}/>
        </Switch>
      </StyledContentContainer>
    </BrowserRouter>
  );
}

let mapStateToProps = (state) => ({
  direction: state.common.direction,
});

export default connect(mapStateToProps, {
  setDirection
})(App);
