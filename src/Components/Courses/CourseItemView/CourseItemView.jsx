import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from './CourseItemView.module.css';

const CourseItem = (props) => {
    return(
        <div className={classes.main}>
            <NavLink to={`/courses/${props.item.id}`}>
                <img src={props.item.img}/>
                <div className={classes.itemInfo}>
                    <label>{props.item.program}</label>
                    <h2>{props.item.title}</h2>
                    <div className={classes.itemFoot}>
                        <span className={classes.status + " " + 
                            ((props.item.status === 'In Progress' && classes.inProgress) ||
                            (props.item.status === 'Completed' && classes.completed))}>{props.item.status}</span>
                        <span className={classes.time}>{props.item.time}</span>
                    </div>
                </div>
                
            </NavLink>
        </div>
    );
}

export default CourseItem;