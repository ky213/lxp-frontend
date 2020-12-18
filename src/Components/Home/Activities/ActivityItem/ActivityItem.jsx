import React from 'react';
import classes from './ActivityItem.module.css';
import { clockicon } from '../../../../Assets/Images/clock';
import { NavLink } from 'react-router-dom';
import ProgressBar from '../../../Common/ProgressBar/ProgressBar';

const ActivityItem = (props) => {
    let widthProgressBar = 45;
    let heightProgressBar = 8;
    return(
        <div className={classes.main}>
            <NavLink to={`/activities/${props.item.id}`}>
                <div className={classes.activityHeader}>
                    <span className={classes.program}>{props.item.program}</span>
                    <div className={classes.headerSide}>
                        <span className={classes.status}>{props.item.status}</span>
                        <div className={classes.timeBlock}>
                            {clockicon}
                            <span className={classes.time}>{props.item.time}</span>
                        </div>
                    </div>
                    
                </div>
                <h3>{props.item.task}</h3>
                <div className={classes.progressBlock}>
                    <ProgressBar width={widthProgressBar} height={heightProgressBar} progress={props.item.progress}/>
                    <span>{props.item.progress}%</span>
                </div>
                
            </NavLink>
        </div>
    );
}

export default ActivityItem;