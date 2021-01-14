import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import classes from './Activities.module.css';
import { useTranslation } from 'react-i18next';
import ActivityItem from './ActivityItem/ActivityItem';
import { NavLink } from 'react-router-dom';

const StyledLabel = styled.label`
    margin-left: ${({ direction }) => direction === "rtl" ? "56px" : "0"};
    margin-right: ${({ direction }) => direction === "ltr" ? "56px" : "0"};
`;

const Activities = (props) => {
    const {t, i18n} = useTranslation();

    props.activities.sort(function(a,b){
        return new Date(b.end) - new Date(a.end);
    });

    let activities = props.activities.map(item => {
        return <ActivityItem item={item} key={item.activityId} width={props.blockWidth}/>
    });

    return(
        <div className={classes.main}>
            <div className={classes.header}>
                <div className={classes.headerContainer}>
                    <div className={classes.headerHeader}>
                        <h1>{t("activities.title")}</h1>
                        <NavLink to="/activities/add">
                            <div>
                                <span>+</span>
                            </div>
                            {t("activities.addActivityBut")}
                        </NavLink>
                    </div>
                    <div className={classes.filters}>
                        <StyledLabel className={classes.filter} direction={props.direction}>
                            <span className={classes.filterText}>{t("activities.filters.all")}</span>
                            <input type="checkbox" onChange={()=>{props.setAll()}} value={props.all} checked={props.all}/>
                            <span className={classes.checkmark}></span>
                        </StyledLabel>
                        <StyledLabel className={classes.filter} direction={props.direction}>
                            <span className={classes.filterText}>{t("activities.filters.completed")}</span>
                            <input type="checkbox" onChange={()=>{props.setCompleted(!props.completed)}} checked={props.completed}/>
                            <span className={classes.checkmark}></span>
                        </StyledLabel>
                        <StyledLabel className={classes.filter} direction={props.direction}>
                            <span className={classes.filterText}>{t("activities.filters.inProgress")}</span>
                            <input type="checkbox" onChange={()=>{props.setInProgress(!props.inProgress)}} checked={props.inProgress}/>
                            <span className={classes.checkmark}></span>
                        </StyledLabel>
                        <StyledLabel className={classes.filter} direction={props.direction}>
                            <span className={classes.filterText}>{t("activities.filters.notStarted")}</span>
                            <input type="checkbox" onChange={()=>{props.setNotStarted(!props.notStarted)}} checked={props.notStarted}/>
                            <span className={classes.checkmark}></span>
                        </StyledLabel>
                        <StyledLabel className={classes.filter} direction={props.direction}>
                            <span className={classes.filterText}>{t("activities.filters.private")}</span>
                            <input type="checkbox" onChange={()=>{props.setPrivateParam(!props.privateParam)}} checked={props.privateParam}/>
                            <span className={classes.checkmark}></span>
                        </StyledLabel>
                    </div>
                </div>
            </div>
            <div className={classes.itemsList}>
                <div className={classes.containerItems}>
                    {activities}
                </div>
            </div>
        </div>
    );
}

export default Activities;