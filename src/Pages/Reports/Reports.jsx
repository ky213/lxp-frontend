import React from 'react';
import classes from './Reports.module.css';
import UserInfo from './UserInfo/UserInfo';
import ReportMain from './ReportMain/ReportMain';
import ReportsDetails from './ReportDetails/ReportDetails';
import { Route } from 'react-router-dom';

const Reports = props => {
  return (
    <div className={classes.main}>
      <div className={classes.container}>
        <UserInfo user={props.user} />
        <div className={classes.rightSide}>
          <Route exact path="/report">
            <ReportMain props={props} />
          </Route>
          <Route path="/report/:insight">
            <ReportsDetails props={props} />
          </Route>
        </div>
      </div>
    </div>
  );
};

export default Reports;
