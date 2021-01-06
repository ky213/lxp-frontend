import React from 'react';
import classes from './HomeActivities.module.css';
import { activitiesicon } from '../../../Assets/Images/activities';
import { NavLink } from 'react-router-dom';
import ActivityItem from '../../Activites/ActivityItem/ActivityItem';
import { useTranslation } from 'react-i18next';
import { empty_state_icon } from '../../../Assets/Images/empty_state_icon';

const HomeActivities = (props) => {
    const {t, i18n} = useTranslation();
    let maxActivitiesToView = 10;
    let blockWidth = 100;

    let activities = [];
    activities = props.activities.map((item, index) => {
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
                {(activities.length > 0 && activities != null && activities != undefined) ? activities : 
                    <div className={classes.empty}>
                        <div className={classes.emptyIcon}>
                            {empty_state_icon}
                        </div>
                        <span>{t("home.activities.empty")}</span>
                    </div>
                }
            </div>
        </div>
    );
}

export default HomeActivities;