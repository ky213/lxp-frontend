import React from 'react';
import styled from 'styled-components';
import classes from './Reports.module.css';
import UserInfo from './UserInfo/UserInfo';
import { useTranslation } from 'react-i18next';
import Filter from './Filter/Filter'



const Reports = (props) => {

    const { t, i18n } = useTranslation();
    const coursesInProgress = props.courses ? props.courses.filter((cours)=> cours.courseProgress > 0).length : 0

    console.log(props.activities)

    return (
        <div className={classes.main}>
            <div className={classes.container}>
                <UserInfo user={props.user} />
                <div className={classes.rightSide}>
                    <div className={classes.tabsBlock}>
                        <h3>
                            {t("reports.insights.title")}
                        </h3>
                        <ul className={classes.tabs}>
                            <li>
                                <p className={classes.tabTitle}> {t("reports.insights.enrolled")}</p>
                                <p className={classes.tabValue}>
                                    <span>{props.courses ? props.courses.length : 0}</span>
                                    {` ${t("reports.insights.courses")}`}
                                </p>
                            </li>
                            <li>
                                <p className={classes.tabTitle}>{t("reports.insights.inProgress")}</p>
                                <p className={classes.tabValue}>
                                    <span>{props.courses.length}</span> 
                                    {` ${t("reports.insights.courses")}`}
                                </p>
                            </li>
                            <li>
                                <p className={classes.tabTitle}>{t("reports.insights.pending")}</p>
                                <p className={classes.tabValue}>
                                    <span>{props.activities ? props.activities.length : 0}</span> 
                                    {` ${t("reports.insights.activities")}`}
                                    </p>
                            </li>
                        </ul>
                    </div>
                    <div className={classes.graphics}>
                    <div className={classes.graphicsTitle}>
                        <h3>Overview</h3>
                        <Filter />
                    </div>
                </div>
                </div>
            </div>
        </div>
    );
}

export default Reports;