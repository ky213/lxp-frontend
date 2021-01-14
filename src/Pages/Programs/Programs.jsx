import React, { useState } from 'react';
import classes from './Programs.module.css';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { empty_state_icon } from '../../Assets/Images/empty_state_icon';
import { ROLE_LEARNER, ROLE_MANAGER } from '../../Utils/constants';
import { NavLink } from 'react-router-dom';

const StyledLabel = styled.label`
    margin-left: ${({ direction }) => direction === "rtl" ? "56px" : "0"};
    margin-right: ${({ direction }) => direction === "ltr" ? "56px" : "0"};
`;

const Programs = (props) => {
    const { t, i18n } = useTranslation();



    let programs = [];

    

    return (
        <div className={classes.main}>
            <div className={classes.header}>
                <div className={classes.container}>
                    {props.user.roleId === ROLE_LEARNER && <h1>{t("programs.title")}</h1>}
                    {props.user.roleId === ROLE_MANAGER &&
                    <div className={classes.headerHeader}>
                        <h1>{t("programs.title")}</h1>
                        <NavLink to="/programs/add">
                            <div>
                                <span>+</span>
                            </div>
                            {t("programs.addProgram")}
                        </NavLink>
                    </div>}
                    <div className={classes.filters}>
                        <StyledLabel className={classes.filter} direction={props.direction}>
                            <span className={classes.filterText}>{t("courses.filters.all")}</span>
                            <input type="checkbox" onChange={() => { props.setAll() }} checked={props.all} value={props.all} />
                            <span className={classes.checkmark}></span>
                        </StyledLabel>
                        <StyledLabel className={classes.filter} direction={props.direction}>
                            <span className={classes.filterText}>{t("courses.filters.completed")}</span>
                            <input type="checkbox" onChange={() => { props.setCompleted(!props.completed) }} checked={props.completed} />
                            <span className={classes.checkmark}></span>
                        </StyledLabel>
                        <StyledLabel className={classes.filter} direction={props.direction}>
                            <span className={classes.filterText}>{t("courses.filters.inProgress")}</span>
                            <input type="checkbox" onChange={() => { props.setInProgress(!props.inProgress) }} checked={props.inProgress} />
                            <span className={classes.checkmark}></span>
                        </StyledLabel>
                        <StyledLabel className={classes.filter} direction={props.direction}>
                            <span className={classes.filterText}>{t("courses.filters.notStarted")}</span>
                            <input type="checkbox" onChange={() => { props.setNotStarted(!props.notStarted) }} checked={props.notStarted} />
                            <span className={classes.checkmark}></span>
                        </StyledLabel>
                    </div>
                </div>
            </div>
            <div className={classes.itemsList}>
                <div className={classes.containerItems}>
                    {(programs.length > 0 && programs != null && programs != undefined) ? programs :
                        <div className={classes.empty}>
                            <div className={classes.emptyIcon}>
                                {empty_state_icon}
                            </div>
                            <span>{t("programs.emptyManager")}</span>
                            <NavLink to="/programs/add">{t("programs.addProgram")}</NavLink>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
}

export default Programs;