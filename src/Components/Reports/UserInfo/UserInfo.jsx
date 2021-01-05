import React from 'react';
import classes from './UserInfo.module.css';
import { useTranslation } from 'react-i18next';

const UserInfo = (props) => {
    const { t, i18n } = useTranslation();

    return (
        <div className={classes.main}>
            <div className={classes.block + " " + classes.withoutPadding}>
                <div className={classes.infoBlock}>
                    <p>{t("home.statistic.infoUser.welcome")}</p>
                    <h3>{props.user.fullName}</h3>
                </div>
                <div className={classes.infoBlock}>
                    <label>{t("home.statistic.infoUser.learningHours")}</label>
                    <span><strong>34 {t("home.statistic.infoUser.hours")}</strong> {t("home.statistic.infoUser.and")} <strong>54 {t("home.statistic.infoUser.mins")}</strong></span>
                </div>
                <hr className={classes.line} />
                <div className={classes.infoBlock}>
                    <label>{t("home.statistic.infoUser.learningGoal")}</label>
                    <span><strong>34 {t("home.statistic.infoUser.hours")}</strong></span>
                </div>
            </div>
        </div>
    );
}

export default UserInfo