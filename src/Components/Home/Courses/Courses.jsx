import React from 'react';
import classes from './Courses.module.css';
import { coursesicon } from '../../../Assets/Images/courses';
import { NavLink } from 'react-router-dom';
import CourseItem from './CourseItem/CourseItem';
import { useTranslation } from 'react-i18next';
import { empty_state_icon } from '../../../Assets/Images/empty_state_icon';

const HomeCourses = (props) => {
    const {t, i18n} = useTranslation();
    let maxCoursesToView = 6;
    console.log(props)
    let courses = [];
    // courses = props.courses.map((item, index) => {
    //     if(index < maxCoursesToView){
    //         return <CourseItem item={item} key={item.courseId}/>
    //     }
    // });
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
                {(courses.length > 0 && courses != null && courses != undefined) ? courses : 
                    <div className={classes.empty}>
                        <div className={classes.emptyIcon}>
                            {empty_state_icon}
                        </div>
                        <span>You have not been assigned to any courses yet</span>
                    </div>
                }
            </div>
        </div>
    );
}

export default HomeCourses;