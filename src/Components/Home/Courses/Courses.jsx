import React from 'react';
import classes from './Courses.module.css';
import { coursesicon } from '../../../Assets/Images/courses';
import { NavLink } from 'react-router-dom';
import CourseItem from './CourseItem/CourseItem';
import { useTranslation } from 'react-i18next';

const HomeCourses = (props) => {
    const {t, i18n} = useTranslation();
    let maxCoursesToView = 6;
    let courses = props.courses.map((item, index) => {
        if(index < maxCoursesToView){
            return <CourseItem item={item} key={item.courseId}/>
        }
    });
    return(
        <div className={classes.main}>
            <div className={classes.coursesHeader}>
                <div className={classes.coursesHeaderBlock}>
                    {coursesicon}
                    <span>{t('home.courses.title')}</span>
                </div>
                <NavLink to="/courses">{t('home.courses.viewAll')}</NavLink>
            </div>
            <div className={classes.itemsList}>
                {courses}
            </div>
        </div>
    );
}

export default HomeCourses;