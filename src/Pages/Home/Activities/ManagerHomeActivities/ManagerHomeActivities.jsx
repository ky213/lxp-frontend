import React, { useState } from 'react';
import classes from './ManagerHomeActivities.module.css';
import { activitiesicon } from '../../../../Assets/Images/activities';
import { NavLink } from 'react-router-dom';
import ActivityItem from '../../../Activites/ActivityItem/ActivityItem';
import { useTranslation } from 'react-i18next';
import { empty_state_icon } from '../../../../Assets/Images/empty_state_icon';
import { ACTIVITY_SOURCE_ASSIGNED, ACTIVITY_SOURCE_LOGGED } from '../../../../Utils/constants';

const ManagerHomeActivities = (props) => {
    const {t, i18n} = useTranslation();
    let maxActivitiesToView = 10;
    let blockWidth = 100;

    let activities = [];

    let assigned = [];
    let logged = [];

    const [currentTab, setCurrentTab] = useState(ACTIVITY_SOURCE_ASSIGNED);

    const handleTabs = (tab) => {
        setCurrentTab(tab);
    }

    props.activities.sort(function(a,b){
        return new Date(b.end) - new Date(a.end);
    });

    assigned = props.activities.map((item, index) => {
        if(index < maxActivitiesToView){
            if(item.source === ACTIVITY_SOURCE_ASSIGNED){
                return <ActivityItem item={item} key={item.activityId} width={blockWidth}/>
            }
        }
    });

    logged = props.activities.map((item, index) => {
        if(index < maxActivitiesToView){
            if(item.source === ACTIVITY_SOURCE_LOGGED){
                return <ActivityItem item={item} key={item.activityId} width={blockWidth}/>
            }
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
            <div className={classes.tabs}>
                <div className={classes.tabsContainer}>
                    <button onClick={()=>{handleTabs(ACTIVITY_SOURCE_ASSIGNED)}} className={classes.tab + " " + (currentTab === ACTIVITY_SOURCE_ASSIGNED && classes.activeTab)}>{t("home.activities.tabs.assigned")}</button>
                    <button onClick={()=>{handleTabs(ACTIVITY_SOURCE_LOGGED)}} className={classes.tab + " " + (currentTab === ACTIVITY_SOURCE_LOGGED && classes.activeTab)}>{t("home.activities.tabs.logged")}</button>
                </div>
            </div>
            <div className={classes.itemsList}>
                {currentTab === ACTIVITY_SOURCE_ASSIGNED && 
                    ((assigned.length > 0 && assigned && assigned != undefined) ? assigned :
                    <div className={classes.empty}>
                        <div className={classes.emptyIcon}>
                            {empty_state_icon}
                        </div>
                        <span>{t("home.activities.empty")}</span>
                    </div>)
                }
                {currentTab === ACTIVITY_SOURCE_LOGGED && 
                    ((logged.length > 0 && logged && logged != undefined) ? logged :
                    <div className={classes.empty}>
                        <div className={classes.emptyIcon}>
                            {empty_state_icon}
                        </div>
                        <span>{t("home.activities.empty")}</span>
                    </div>)
                }

            </div>
        </div>
    );
}

export default ManagerHomeActivities;