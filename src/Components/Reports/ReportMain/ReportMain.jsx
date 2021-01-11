import React from 'react';
import { Link, NavLink } from 'react-router-dom'
import classes from './ReportMain.module.css';
import { useTranslation } from 'react-i18next';
import Filter from '../Filter/Filter'
import { Chart } from "react-google-charts";

export default function ReportMain({ props }) {
    const { t, i18n } = useTranslation();
    const coursesInProgress = props.courses ? props.courses.filter((cours) => cours.courseProgress > 0).length : 0
    const coursesIsCompleted = props.courses ? props.courses.filter((cours) => cours.isCompleted).length : 0
    const coursesNotStarted = props.courses ? props.courses.filter((cours) => cours.courseProgress === 0).length : 0

    const firstCourseDaysNumber = 1
    const secondCourseDaysNumber = 4

    return (
        <>
            <div className={classes.tabsBlock}>
                <h3>
                    {t("reports.insights.title")}
                </h3>
                <ul className={classes.tabs}>
                    <li>
                        <Link className={classes.textDecorationNone} to="/report/enrolled">
                            <p className={classes.tabTitle}> {t("reports.insights.enrolled")}</p>
                            <p className={classes.tabValue}>
                                <span>{props.courses ? props.courses.length : 0}</span>
                                {` ${t("reports.insights.courses")}`}
                            </p>
                        </Link>
                    </li>
                    <li>
                        <Link className={classes.textDecorationNone} to="/report/in_progress">
                            <p className={classes.tabTitle}>{t("reports.insights.inProgress")}</p>
                            <p className={classes.tabValue}>
                                <span>{coursesInProgress}</span>
                                {` ${t("reports.insights.courses")}`}
                            </p>
                        </Link>
                    </li>
                    <li>
                        <Link className={classes.textDecorationNone} to={`/report/pending`}>
                            <p className={classes.tabTitle}>{t("reports.insights.pending")}</p>
                            <p className={classes.tabValue}>
                                <span>{(props.activities && props.activities.length > 0) ? props.activities.length : 0}</span>
                                {` ${t("reports.insights.activities")}`}
                            </p>
                        </Link>
                    </li>
                </ul>
            </div>
            <div className={classes.graphics}>
                <div className={classes.graphicsTitle}>
                    <h3>{t("reports.overview.title")}</h3>
                    <Filter />
                </div>
                <div className={classes.overviewCharts}>
                    <div className={classes.chart}>
                        <Chart
                            width={'100%'}
                            height={'100%'}
                            background={'#fff'}
                            chartType="PieChart"
                            loader={<div>Loading Chart</div>}
                            data={[
                                ['Progress', 'How mutch'],
                                ['Not started', coursesNotStarted],
                                ['In progress', coursesInProgress],
                                ['Completed', coursesIsCompleted],
                            ]}
                            options={{
                                title: 'My Courses',
                                legend: "bottom",
                                chartArea: { width: '95%', height: '70%' },
                                colors: ['#cce1f4', '#f4e6cc', '#a9d5c1'],
                                pieSliceText: 'value',
                                fontSize: 14,
                                pieSliceTextStyle: { color: "black" },
                                titleTextStyle: { fontSize: 16 }
                            }}
                        />
                    </div>
                    <div className={classes.chart}>
                        <Chart
                            chartType="ColumnChart"
                            width="100%"
                            height="100%"
                            data={[
                                ["Courses", "Days", { role: "style" }],
                                ["Course 1", firstCourseDaysNumber, '#f4e6cc'],
                                ["Course 2", secondCourseDaysNumber, '#a9d5c1'],
                            ]}
                            options={{
                                fontSize: 14,
                                title: 'My Engagment',
                                titleTextStyle: { fontSize: 16 },
                                chartArea: { width: '80%', height: '70%' },
                                bar: { groupWidth: "85%" },
                                legend: { position: "none" },
                                vAxes: {
                                    0: { title: 'Days', titleTextStyle: { fontStyle: 'normal' } },
                                }
                            }}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}