import React, { useState } from 'react';
import classes from './ProfileNotifications.module.css';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';

const ProfileNotifications = (props) => {
    const {t, i18n} = useTranslation();

    const [enableEmail, setEnableEmail] = useState(false);
    const [enableText, setEnableText] = useState(false);

    let handleEmail = () => {
        setEnableEmail(!enableEmail);
    }
    let handleText = () => {
        setEnableText(!enableText);
    }

    return(
        <div className={classes.main}>
            <div className={classes.field}>
                <label htmlFor="email">{t("profile.notifications.email")}</label>
                <label className={classes.switch}>
                    <input type="checkbox" id="email" onChange={handleEmail} value={enableEmail}/>
                    <span className={classes.slider}></span>
                </label>
            </div>
            <div className={classes.field}>
                <label htmlFor="text">{t("profile.notifications.text")}</label>
                <label className={classes.switch}>
                    <input type="checkbox" id="text" onChange={handleText} value={enableText}/>
                    <span className={classes.slider}></span>
                </label>
            </div>
        </div>
    );
}

let mapStateToProps = (state) => ({

});

export default connect(mapStateToProps, {})(ProfileNotifications);