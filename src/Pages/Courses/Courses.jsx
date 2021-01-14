import React, { useEffect, useState } from 'react';
import classes from './Courses.module.css';
import CourseItemView from './CourseItemView/CourseItemView';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

const StyledLabel = styled.label`
    margin-left: ${({ direction }) => direction === "rtl" ? "56px" : "0"};
    margin-right: ${({ direction }) => direction === "ltr" ? "56px" : "0"};
`;

const Courses = (props) => {
    const {t, i18n} = useTranslation();

    let courses = props.courses.map(item => {
        return <CourseItemView item={item} key={item.courseId}/>
    })

    return(
        <div className={classes.main}>
            <div className={classes.coursesHeader}>
                <div className={classes.coursesHeaderContainer}>
                    <h1>{t("courses.title")}</h1>
                    <div className={classes.filters}>
                        <StyledLabel className={classes.filter} direction={props.direction}>
                            <span className={classes.filterText}>{t("courses.filters.all")}</span>
                            <input type="checkbox" onChange={()=>{props.setAll()}} checked={props.all}/>
                            <span className={classes.checkmark}></span>
                        </StyledLabel>
                        <StyledLabel className={classes.filter} direction={props.direction}>
                            <span className={classes.filterText}>{t("courses.filters.completed")}</span>
                            <input type="checkbox" onChange={()=>{props.setCompleted(!props.completed)}} checked={props.completed}/>
                            <span className={classes.checkmark}></span>
                        </StyledLabel>
                        <StyledLabel className={classes.filter} direction={props.direction}>
                            <span className={classes.filterText}>{t("courses.filters.inProgress")}</span>
                            <input type="checkbox" onChange={()=>{props.setInProgress(!props.inProgress)}} checked={props.inProgress}/>
                            <span className={classes.checkmark}></span>
                        </StyledLabel>
                        <StyledLabel className={classes.filter} direction={props.direction}>
                            <span className={classes.filterText}>{t("courses.filters.notStarted")}</span>
                            <input type="checkbox" onChange={()=>{props.setNotStarted(!props.notStarted)}} checked={props.notStarted}/>
                            <span className={classes.checkmark}></span>
                        </StyledLabel>
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