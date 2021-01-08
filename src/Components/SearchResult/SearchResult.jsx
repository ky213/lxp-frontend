import React from 'react';
import classes from './SearchResult.module.css';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { coursesicon } from '../../Assets/Images/courses';
import { activitiesicon } from '../../Assets/Images/activities';
import { programicon } from '../../Assets/Images/programicon';
import { empty_state_icon } from '../../Assets/Images/empty_state_icon';

const StyledLabel = styled.label`
    margin-left: ${({ direction }) => direction === "rtl" ? "56px" : "0"};
    margin-right: ${({ direction }) => direction === "ltr" ? "56px" : "0"};
`;

const SearchResult = (props) => {
    const {t, i18n} = useTranslation();

    let courses = [];
    let programs = [];
    let activities = [];

    console.log(props.viewAll)

    return(
        <div className={classes.main}>
            <div className={classes.header}>
                <div className={classes.container}>
                    <h1>{t("searchResult.title")} <strong>{props.searchValue}</strong></h1>
                    <div className={classes.filters}>
                        <StyledLabel className={classes.filter} direction={props.direction}>
                            <span className={classes.filterText}>{t("searchResult.all")}</span>
                            <input type="checkbox" onChange={()=>{props.setViewAll(!props.viewAll)}} checked={props.viewAll} value={props.viewAll}/>
                            <span className={classes.checkmark}></span>
                        </StyledLabel>
                        <StyledLabel className={classes.filter} direction={props.direction}>
                            <span className={classes.filterText}>{t("searchResult.programs")}</span>
                            <input type="checkbox" onChange={()=>{props.setViewPrograms(!props.viewPrograms)}} value={props.viewPrograms} checked={props.viewPrograms}/>
                            <span className={classes.checkmark}></span>
                        </StyledLabel>
                        <StyledLabel className={classes.filter} direction={props.direction}>
                            <span className={classes.filterText}>{t("searchResult.courses")}</span>
                            <input type="checkbox" onChange={()=>{props.setViewCourses(!props.viewCourses)}} value={props.viewCourses} checked={props.viewCourses}/>
                            <span className={classes.checkmark}></span>
                        </StyledLabel>
                        <StyledLabel className={classes.filter} direction={props.direction}>
                            <span className={classes.filterText}>{t("searchResult.activities")}</span>
                            <input type="checkbox" onChange={()=>{props.setViewActivities(!props.viewActivities)}} value={props.viewActivities} checked={props.viewActivities}/>
                            <span className={classes.checkmark}></span>
                        </StyledLabel>
                    </div>
                </div>
            </div>
            <div className={classes.content}>
                    <div className={classes.container}>
                        {props.viewCourses &&
                        <div className={classes.category}>
                            <div className={classes.categoryHeader}>
                                {coursesicon}
                                <span>{t('searchResult.courses')}</span>
                            </div>
                            <div className={classes.itemsList}>
                                {(courses.length > 0 && courses) ? courses : 
                                    <div className={classes.empty}>
                                        <div className={classes.emptyIcon}>
                                            {empty_state_icon}
                                        </div>
                                        <span>{t("searchResult.coursesEmpty")}</span>
                                    </div>
                                }
                            </div>
                        </div>}
                        {props.viewActivities &&
                        <div className={classes.category}>
                            <div className={classes.categoryHeader}>
                                {activitiesicon}
                                <span>{t('searchResult.activities')}</span>
                            </div>
                            <div className={classes.itemsList}>
                                {(activities.length > 0 && activities) ? activities : 
                                    <div className={classes.empty}>
                                        <div className={classes.emptyIcon}>
                                            {empty_state_icon}
                                        </div>
                                        <span>{t("searchResult.activitiesEmpty")}</span>
                                    </div>
                                }
                            </div>
                        </div>}
                        {props.viewPrograms &&
                        <div className={classes.category}>
                            <div className={classes.categoryHeader}>
                                {programicon}
                                <span>{t('searchResult.programs')}</span>
                            </div>
                            <div className={classes.itemsList}>
                                {(programs.length > 0 && programs) ? programs : 
                                    <div className={classes.empty}>
                                        <div className={classes.emptyIcon}>
                                            {empty_state_icon}
                                        </div>
                                        <span>{t("searchResult.programsEmpty")}</span>
                                    </div>
                                }
                            </div>
                        </div>}
                    </div>
                </div>
        </div>
    );
}

export default SearchResult;