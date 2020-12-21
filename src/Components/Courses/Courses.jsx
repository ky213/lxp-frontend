import React, { useEffect, useState } from 'react';
import classes from './Courses.module.css';
import CourseItemView from './CourseItemView/CourseItemView';

const Courses = (props) => {
    const [all, setAll] = useState(false);
    const [completed, setCompleted] = useState(true);
    const [inProgress, setInProgress] = useState(true);
    const [notStarted, setNotStarted] = useState(false);

    let courses = props.courses.map(item => {
        return <CourseItemView item={item} key={item.courseId}/>
    })

    return(
        <div className={classes.main}>
            <div className={classes.coursesHeader}>
                <div className={classes.coursesHeaderContainer}>
                    <h1>CyberSecurity Awareness Courses</h1>
                    <div className={classes.filters}>
                        <label className={classes.filter}>
                            <span className={classes.filterText}>All</span>
                            <input type="checkbox" onChange={()=>{setAll(!all)}}/>
                            <span className={classes.checkmark}></span>
                        </label>
                        <label className={classes.filter}>
                            <span className={classes.filterText}>Completed</span>
                            <input type="checkbox" onChange={()=>{setCompleted(!completed)}} checked={completed}/>
                            <span className={classes.checkmark}></span>
                        </label>
                        <label className={classes.filter}>
                            <snap className={classes.filterText}>In Progress</snap>
                            <input type="checkbox" onChange={()=>{setInProgress(!inProgress)}} checked={inProgress}/>
                            <span className={classes.checkmark}></span>
                        </label>
                        <label className={classes.filter}>
                            <span className={classes.filterText}>Not Started</span>
                            <input type="checkbox" onChange={()=>{setNotStarted(!notStarted)}}/>
                            <span className={classes.checkmark}></span>
                        </label>
                    </div>
                </div>
            </div>
            <div className={classes.itemsList}>
                <div className={classes.containerItems}>
                    {courses}
                </div>  
            </div>
        </div>
    );
}

export default Courses;