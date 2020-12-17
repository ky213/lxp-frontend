import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from './Statistic.module.css';

const Statistic = (props) => {
    return(
        <div className={classes.main}>
            <div className={classes.block}>
                <div className={classes.infoBlock}>
                    <p>Welcome back,</p>
                    <h3>{props.user.fullName}</h3>
                </div>
                <div className={classes.infoBlock}>
                    <label>Learning Hours</label>
                    <span><strong>34 hrs</strong> and <strong>54 mins</strong></span>
                </div>
                <div className={classes.infoBlock}>
                    <label>Annual Learning Goal</label>
                    <span><strong>34 hrs</strong></span>
                </div>
            </div>
            <div className={classes.block + " " + classes.programs}>
                <div className={classes.programsHeader}>
                    <h4>Programs</h4>
                    <NavLink to="/programs">View all</NavLink>
                </div>
                <div className={classes.progressBlock}>
                    <label>Cybersecurity</label>
                    <div className={classes.progressContainer}>
                        <progress max={100} value={78}></progress>
                        <span>78%</span>
                    </div>
                </div>
                <div className={classes.progressBlock}>
                    <label>Writing</label>
                    <div className={classes.progressContainer}>
                        <progress max={100} value={42}></progress>
                        <span>42%</span>
                    </div>
                </div>
                <div className={classes.progressBlock}>
                    <label>Information Technology</label>
                    <div className={classes.progressContainer}>
                        <progress max={100} value={60}></progress>
                        <span>60%</span>
                    </div>
                </div>
            </div>
            <div className={classes.block + " " + classes.stats}>
                <h4>Stats</h4>
            </div>
        </div>
    );
}

export default Statistic;