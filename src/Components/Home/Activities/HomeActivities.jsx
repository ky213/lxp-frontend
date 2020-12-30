import React from 'react';
import classes from './HomeActivities.module.css';
import { activitiesicon } from '../../../Assets/Images/activities';
import { NavLink } from 'react-router-dom';
import ActivityItem from '../../Activites/ActivityItem/ActivityItem';
import { useTranslation } from 'react-i18next';

const HomeActivities = (props) => {
    const {t, i18n} = useTranslation();
    let maxActivitiesToView = 6;
    let blockWidth = 100;

    let activities = props.activities.map((item, index) => {
        if(index < maxActivitiesToView){
            return <ActivityItem item={item} key={item.activityId} width={blockWidth}/>
        }
    });
    return(
        <div className={classes.main}>
            <div className={classes.activitiesHeader}>
                <div className={classes.activitiesHeaderBlock}>
                    {activitiesicon}
                    <span>{t("home.activities.title")}</span>
                </div>
                <NavLink to="/activities">{t("home.activities.viewAll")}</NavLink>
            </div>
            <div className={classes.itemsList}>
                {activities}
            </div>
        </div>
    );
}

export default HomeActivities;