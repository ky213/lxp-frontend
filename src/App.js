import React, { useEffect } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import './App.css';
import Activity from './Components/Activity/Activity';
import LoadDataRouter from './Components/Common/LoadDataRouter/LoadDataRouter';
import CoursesContainer from './Components/Courses/CoursesContainer';
import HomeContainer from './Components/Home/HomeContainer';
import NavbarContainer from './Components/Navbar/NavbarContainer';

const App = (props) => {
  return (
    <BrowserRouter>
      <div className="main">
        <NavbarContainer/>
        <Switch>
            <Route exact path="/">
              <Redirect to="/home"/>
            </Route>
            <Route path="/home" render={()=><LoadDataRouter Component={HomeContainer}/>}/>
            <Route path="/courses" render={()=><LoadDataRouter Component={CoursesContainer}/>}/>
            <Route path="/activities/:activityId" render={()=><LoadDataRouter Component={Activity}/>}/>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
