import React from 'react';
import classes from './Activities.module.css';
import { activitiesicon } from '../../../Assets/Images/activities';
import { NavLink } from 'react-router-dom';
import ActivityItem from './ActivityItem/ActivityItem';

const HomeActivities = (props) => {
    let maxActivitiesToView = 6;
    let activities = props.activities.map((item, index) => {
        if(index < maxActivitiesToView){
            return <ActivityItem item={item}  key={item.task + item.id}/>
        }
    });
    return(
        <div className={classes.main}>
            <div className={classes.activitiesHeader}>
                <div className={classes.activitiesHeaderBlock}>
                    {activitiesicon}
                    <span>Activities</span>
                </div>
                <NavLink to="/activities">View all</NavLink>
            </div>
            <div className={classes.itemsList}>
                {activities}
            </div>
        </div>
    );
}

export default HomeActivities;