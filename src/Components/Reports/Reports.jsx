import React from 'react';
import styled from 'styled-components';
import classes from './Reports.module.css';
import UserInfo from './UserInfo/UserInfo';




const Reports = (props) => {

    return (
        <div className={classes.main}>
            <div className={classes.container}>
                <UserInfo user={props.user} />
                <div className={classes.rightSide}>
                    <div className={classes.tabsBlock}>
                        <h3>
                            General Insights
                        </h3>
                        <div className={classes.tabs}>
                            <ul>
                                <li>
                                    <p>Enrolled</p>
                                    <p>courses</p>
                                </li>
                                <li>
                                    <p>In Progress</p>
                                    <p>courses</p>
                                </li>
                                <li>
                                    <p>Pending</p>
                                    <p>activities</p>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className={classes.graphics}>
                    <div className={classes.graphicsTitle}>
                        <h3>Overview</h3>
                        <div className={classes.select}></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Reports;