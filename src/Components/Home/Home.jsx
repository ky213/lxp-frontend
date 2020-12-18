import React from 'react';
import HomeActivities from './Activities/Activities';
import HomeCourses from './Courses/Courses';
import classes from './Home.module.css';
import Statistic from './Statistic/Statistic';

const Home = (props) => {
    return(
        <div className={classes.main}>
            <div className={classes.container}>
                <div className={classes.leftSide}>
                    <div className={classes.containerLeft}>
                        <div className={classes.statistic}>
                            <Statistic user={props.user}/>
                        </div>
                        <div className={classes.courses}>
                            <HomeCourses courses={props.courses}/>
                        </div>
                    </div>
                </div>
                <div className={classes.rightSide}>
                    <div className={classes.containerRight}>
                        <div className={classes.activities}>
                            <HomeActivities activities={props.activities}/>
                        </div>
                    </div>
                </div>
            </div>
            
            
            
        </div>
    );
}

export default Home;