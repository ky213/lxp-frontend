import React from 'react';
import HomeActivities from './Activities/Activities';
import HomeCourses from './Courses/Courses';
import classes from './Home.module.css';
import Statistic from './Statistic/Statistic';

const Home = (props) => {
    return(
        <div className={classes.main}>
            <div className={classes.container}>
                <Statistic user={props.user}/>
                <HomeCourses/>
                <HomeActivities/>
            </div>
            
        </div>
    );
}

export default Home;