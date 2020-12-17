import React from 'react';
import classes from './Courses.module.css';
import { coursesicon } from '../../../Assets/Images/courses';
import { NavLink } from 'react-router-dom';

const HomeCourses = (props) => {
    return(
        <div className={classes.main}>
            <div className={classes.coursesHeader}>
                <div className={classes.coursesHeaderBlock}>
                    {coursesicon}
                    <span>Courses</span>
                </div>
                <NavLink to="/courses">View all</NavLink>
            </div>
        </div>
    );
}

export default HomeCourses;