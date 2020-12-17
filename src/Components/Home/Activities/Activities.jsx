import React from 'react';
import classes from './Activities.module.css';
import { activitiesicon } from '../../../Assets/Images/activities';
import { NavLink } from 'react-router-dom';

const HomeActivities = (props) => {
    return(
        <div className={classes.main}>
            <div className={classes.activitiesHeader}>
                <div className={classes.activitiesHeaderBlock}>
                    {activitiesicon}
                    <span>Activities</span>
                </div>
                <NavLink to="/activities">View all</NavLink>
            </div>
        </div>
    );
}

export default HomeActivities;