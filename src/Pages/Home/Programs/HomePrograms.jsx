import React from 'react';
import classes from './HomePrograms.module.css';
import { useTranslation } from 'react-i18next';
import { programicon } from '../../../Assets/Images/programicon';
import { NavLink } from 'react-router-dom';
import { empty_state_icon } from '../../../Assets/Images/empty_state_icon';
import { learnersicon } from '../../../Assets/Images/learners';

const HomePrograms = (props) => {
    const {t, i18n} = useTranslation();
    let maxProgramsToView = 2;
    let programs = [];


    return(
        <div className={classes.main}>
            <div className={classes.header}>
                <div className={classes.headerBlock}>
                    {programicon}
                    <span>{t("home.programs.title")}</span>
                </div>
                {programs.length > 0 && <NavLink to="/programs">{t("home.programs.viewAll")}</NavLink>}
            </div>
            {(programs.length > 0 && programs != null && programs != undefined) ?
            <div className={classes.content}>
                <div className={classes.itemsList}>
                    {programs}
                </div> 
                <div className={classes.header}>
                    <div className={classes.headerBlock}>
                        {learnersicon}
                        <span>{t("home.learners.title")}</span>
                    </div>
                </div>
            </div>
            : 
            <div className={classes.empty}>
                <div className={classes.emptyIcon}>
                    {empty_state_icon}
                </div>
                <span>{t("home.programs.empty")}</span>
            </div>}
        </div>
    )
}

export default HomePrograms;