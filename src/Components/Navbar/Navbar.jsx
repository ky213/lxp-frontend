import React, { useState } from 'react';
import classes from './Navbar.module.css';
import { NavLink } from 'react-router-dom';
import { programicon } from '../../Assets/Images/programicon.js';
import { myreporticon } from '../../Assets/Images/myreport.js';
import { activitiesicon } from '../../Assets/Images/activities.js';
import { coursesicon } from '../../Assets/Images/courses.js';
import { notificationicon } from '../../Assets/Images/notification.js';

const Navbar = (props) => {
    const [notificationsCount, setNotificationsCount] = useState(1);
    return(
        <nav className={classes.main}>
            <div className={classes.leftSideNav}>
                <div className={classes.logoBlock}>
                    <NavLink to="/home">
                        <div className={classes.logo}></div>
                        <span>Brand</span>
                    </NavLink>
                </div>
                <div className={classes.links}>
                    <div className={classes.menuItem}>
                        <NavLink to="/home" activeClassName={classes.active}>
                            <i class="fas fa-home"></i>
                            Home
                        </NavLink>
                    </div>
                    <div className={classes.menuItem}>
                        <NavLink to="/programs" activeClassName={classes.active}>
                            {programicon}
                            Programs
                        </NavLink>
                    </div>
                    <div className={classes.menuItem}>
                        <NavLink to="/courses" activeClassName={classes.active}>
                            {coursesicon}
                            Courses
                        </NavLink>
                    </div>
                    <div className={classes.menuItem}>
                        <NavLink to="/activities" activeClassName={classes.active}>
                            {activitiesicon}
                            Activities
                        </NavLink>
                    </div>
                    <div className={classes.menuItem}>
                        <NavLink to="/report" activeClassName={classes.active}>
                            {myreporticon}
                            My Report
                        </NavLink>
                    </div>
                </div>
            </div>
            
           <div className={classes.rightSideNav}>
                <button className={classes.searchBut}>
                    <i class="fas fa-search"></i>
                </button>
                <div className={classes.notifications}>
                    <NavLink to="/notifications">
                        {notificationicon}
                        <div className={classes.notificationsCount}>
                            {notificationsCount}
                        </div>
                    </NavLink>
                </div>
                <div className={classes.userMenu}>
                    {props.user.profilePhoto ? 
                    <img src={props.user.profilePhoto}/> : 
                    <div className={classes.userDefault}></div>}
                    <span>{props.user.firstName}</span>
                </div>
           </div>
            

        </nav>
    )
}

export default Navbar;