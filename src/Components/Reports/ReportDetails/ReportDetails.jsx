import React from 'react';
import { Link, useLocation, withRouter } from 'react-router-dom';
import classes from './ReportsDetails.module.css';

const ReportsDetails = (props) => {

    const location = props.match.params.insight;
    const targetTitle = location.split('_').join(' ')
    const number = () => {
        if (location === 'enrolled') {
            return props.props.courses ? props.props.courses.length : 0
        } else if (location === 'in_progress') {
            return props.props.courses ? props.props.courses.filter((cours) => cours.courseProgress > 0).length : 0
        } else if (location === 'pending') {
            return props.props.activities ? props.props.activities.length : 0
        }
    }


    return (
        <div>
            <div className={classes.reportDetailsTitle}>
                <h3>
                    <Link to='/report'>
                        General Insights >
                    </Link>
                    <span>{` ${targetTitle}`}</span>
                    <span>{`(${number()})`}</span>
                </h3>
                <input type="text" />
            </div>
        </div>
    );
}

let WithRouterContainer = withRouter(ReportsDetails);

export default WithRouterContainer;