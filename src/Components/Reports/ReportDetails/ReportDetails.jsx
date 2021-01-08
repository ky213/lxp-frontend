import React from 'react';
import { Link, useLocation, withRouter } from 'react-router-dom';
import classes from './ReportsDetails.module.css';
import { empty_state_icon } from '../../../Assets/Images/empty_state_icon';
import { searchicon } from '../../../Assets/Images/searchicon'
import { useTranslation } from 'react-i18next';

const ReportsDetails = (props) => {
    const { t, i18n } = useTranslation();
    const location = props.match.params.insight;
    const targetTitle = location.split('_').join(' ')
    const number = () => {
        if (location === 'enrolled') {
            return props.props.courses ? props.props.courses.length : 0
        } else if (location === 'in_progress') {
            return props.props.courses ? props.props.courses.filter((cours) => cours.courseProgress > 0).length : 0
        } else if (location === 'pending') {
            return props.props.activities ? props.props.activities.length : 0
        }
    }


    return (
        <div>
            <div className={classes.reportDetailsTitle}>
                <h3>
                    <Link to='/report'>
                        {t("reports.reportsDetails.generalInsights")}
                    </Link>
                    <span className={classes.detailsItemTitle}>{` ${targetTitle}`}</span>
                    <span className={classes.numberItems}>{` (${number()})`}</span>
                </h3>
                <div className={classes.reportDetailsTitleInput}>
                    <input type="text" placeholder={t("reports.reportsDetails.search")} />
                    {searchicon}
                </div>
            </div>
            {location === 'pending' && number() === 0 &&
                <div className={classes.empty}>
                    <div className={classes.emptyIcon}>
                        {empty_state_icon}
                    </div>
                    <span>{t("reports.reportsDetails.pendingActivities")}</span>
                </div>
            }
            {location === 'in_progress' && number() === 0 &&
                <div className={classes.empty}>
                    <div className={classes.emptyIcon}>
                        {empty_state_icon}
                    </div>
                    <span>{t("reports.reportsDetails.enrolledCourses")}</span>
                </div>
            }
            {location === 'enrolled' && number() === 0 &&
                <div className={classes.empty}>
                    <div className={classes.emptyIcon}>
                        {empty_state_icon}
                    </div>
                    <span>{t("reports.reportsDetails.inProgressCourses")}</span>
                </div>
            }
        </div >
    );
}

let WithRouterContainer = withRouter(ReportsDetails);

export default WithRouterContainer;