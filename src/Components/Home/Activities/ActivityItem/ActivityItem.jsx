import React from 'react';
import classes from './ActivityItem.module.css';
import { clockicon } from '../../../../Assets/Images/clock';
import { NavLink } from 'react-router-dom';
import ProgressBar from '../../../Common/ProgressBar/ProgressBar';

const ActivityItem = (props) => {
    let widthProgressBar = 45;
    let heightProgressBar = 8;

    const endTime = new Date(props.item.end);
    const now = new Date();

    var daysLag = Math.ceil(Math.abs(endTime.getTime() - now.getTime()) / (1000 * 3600 * 24));
    
    if(endTime >= now) {
        daysLag = daysLag + " days left";
    }else{
        daysLag = daysLag + " days ago";
    }  
    return(
        <div className={classes.main}>
            <NavLink to={`/activities/${props.item.activityId}`}>
                <div className={classes.activityHeader}>
                    <span className={classes.program}>{(!props.item.description || props.item.description === "") ? "Empty" : props.item.description}</span>
                    <div className={classes.headerSide}>
                        <span className={classes.status}>{props.item.status}</span>
                        <div className={classes.timeBlock}>
                            {clockicon}
                            <span className={classes.time}>{daysLag}</span>
                        </div>
                    </div>
                    
                </div>
                <h3>{props.item.name}</h3>
                <div className={classes.progressBlock}>
                    <ProgressBar width={widthProgressBar} height={heightProgressBar} progress={props.item.totalPoints}/>
                    <span>{props.item.totalPoints}%</span>
                </div>
                
            </NavLink>
        </div>
    );
}

export default ActivityItem;