import React from 'react';
import { NavLink } from 'react-router-dom';
import ProgressBar from '../../Common/ProgressBar/ProgressBar';
import classes from './Statistic.module.css';
import { useTranslation } from 'react-i18next';
import { ROLE_LEARNER, ROLE_MANAGER } from '../../../Utils/constants';
import { learnersicon } from '../../../Assets/Images/learners.js';
import { libraryicon } from '../../../Assets/Images/library';

const Statistic = (props) => {
    const {t, i18n} = useTranslation();


    let widthProgressBar = 83;
    let heightProgressBar = 16;
    return(
        <div className={classes.main}>
            <div className={classes.block + " " + classes.withoutPadding}>
                <div className={classes.infoBlock}>
                    <p>{t("home.statistic.infoUser.welcome")}</p>
                    <h3>{props.user.name}</h3>
                </div>
                <div className={classes.infoBlock}>
                    <label>{t("home.statistic.infoUser.learningHours")}</label>
                    <span><strong>34 {t("home.statistic.infoUser.hours")}</strong> {t("home.statistic.infoUser.and")} <strong>54 {t("home.statistic.infoUser.mins")}</strong></span>
                </div>
                <hr className={classes.line}/>
                <div className={classes.infoBlock}>
                    <label>{t("home.statistic.infoUser.learningGoal")}</label>
                    <span><strong>34 {t("home.statistic.infoUser.hours")}</strong></span>
                </div>
            </div>
            {props.user.roleId === ROLE_LEARNER &&
            <div className={classes.block + " " + classes.programs}>
                <div className={classes.programsHeader}>
                    <h4>{t("home.statistic.programs.programs")}</h4>
                    <NavLink to="/programs">{t("home.statistic.programs.viewAll")}</NavLink>
                </div>
                <div className={classes.progressBlock}>
                    <label>Cybersecurity</label>
                    <div className={classes.progressContainer}>
                        <ProgressBar width={widthProgressBar} height={heightProgressBar} progress={78}/>
                        <span>78%</span>
                    </div>
                </div>
                <div className={classes.progressBlock}>
                    <label>Writing</label>
                    <div className={classes.progressContainer}>
                        <ProgressBar width={widthProgressBar} height={heightProgressBar} progress={42}/>
                        <span>42%</span>
                    </div>
                </div>
                <div className={classes.progressBlock}>
                    <label>Information Technologies</label>
                    <div className={classes.progressContainer}>
                        <ProgressBar width={widthProgressBar} height={heightProgressBar} progress={60}/>
                        <span>60%</span>
                    </div>
                </div>
            </div>}
            {props.user.roleId === ROLE_LEARNER &&
            <div className={classes.block + " " + classes.stats}>
                <h4>{t("home.statistic.stats.stats")}</h4>
            </div>}
            
            <div className={classes.block + " " + classes.quickAccess}>
                <h4>{t("home.statistic.quickAccess.title")}</h4>
                <div className={classes.links}>
                    {props.user.roleId === ROLE_MANAGER &&
                    <NavLink to="/resources">
                        {libraryicon}
                        <span>{t("home.statistic.quickAccess.resources")}</span>
                    </NavLink>}
                    <NavLink to="/learners">
                        {learnersicon}
                        <span>{t("home.statistic.quickAccess.learners")}</span>
                    </NavLink>
                </div>
            </div>
        </div>
    );
}

export default Statistic;