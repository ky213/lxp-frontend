import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from './CourseItemView.module.css';
import { useTranslation } from 'react-i18next';

const CourseItem = (props) => {
    const {t, i18n} = useTranslation();
    return(
        <div className={classes.main}>
            <NavLink to={`/courses/${props.item.courseId}`}>
                {(props.item.image != "null") ? <img src={props.item.image}/> : <div className={classes.defaultImg}></div>}
                <div className={classes.itemInfo}>
                    <label>{props.item.description}</label>
                    <h2>{props.item.name}</h2>
                    <div className={classes.itemFoot}>
                        <span className={classes.status + " " + 
                            ((props.item.inProgress && classes.inProgress) ||
                            (!props.item.inProgress && classes.completed))}>
                                {((props.item.inProgress && t('courseMini.inProgress')) ||
                                (!props.item.inProgress && t('courseMini.progressComplete')))}</span>
                        <span className={classes.time}>{props.item.startingDate ? props.item.startingDate : t('courseMini.overdue')}</span>
                    </div>
                </div>
                
            </NavLink>
        </div>
    );
}

export default CourseItem;