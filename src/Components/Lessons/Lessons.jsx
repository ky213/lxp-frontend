import React from 'react';
import { connect } from 'react-redux';
import classes from './Lessons.module.css';

const Lessons = (props) => {
    return(
        <div className={classes.main}>
            <div className={classes.header}>
                <div className={classes.container}>
                    
                </div>
            </div>
            <div className={classes.container}>
                <h3>lessons</h3>
            </div>
            
        </div>
    );
}

export default Lessons;