import React from 'react';
import { connect } from 'react-redux';
import classes from './Profile.module.css';
import { useTranslation } from 'react-i18next';
import { NavLink, Redirect, Route } from 'react-router-dom';
import ProfileInfo from './Info/ProfileInfo';
import ProfileEmail from './Email/ProfileEmail';
import ProfilePassword from './Password/ProfilePassword';
import ProfileNotifications from './Notifications/ProfileNotifications';

const Profile = (props) => {
    const {t, i18n} = useTranslation();
    return(
        <div className={classes.main}>
            <div className={classes.container}>
                <h1>{t("profile.title")}</h1>
                <div className={classes.body}>
                    <div className={classes.menu}>
                        <div className={classes.menuItem}>
                            <NavLink to="/profile/info" activeClassName={classes.active}>{t("profile.tabs.info")}</NavLink>
                        </div>
                        <div className={classes.menuItem}>
                            <NavLink to="/profile/email" activeClassName={classes.active}>{t("profile.tabs.email")}</NavLink>
                        </div>
                        <div className={classes.menuItem}>
                            <NavLink to="/profile/password" activeClassName={classes.active}>{t("profile.tabs.password")}</NavLink>
                        </div>
                        <div className={classes.menuItem}>
                            <NavLink to="/profile/notifications" activeClassName={classes.active}>{t("profile.tabs.notifications")}</NavLink>
                        </div>
                    </div>
                    <div className={classes.content}>
                        <Route exact path="/profile">
                            <Redirect to="/profile/info"/>
                        </Route>
                        <Route path="/profile/info" render={()=><ProfileInfo/>}/>
                        <Route path="/profile/email" render={()=><ProfileEmail/>}/>
                        <Route path="/profile/password" render={()=><ProfilePassword/>}/>
                        <Route path="/profile/notifications" render={()=><ProfileNotifications/>}/>
                    </div>
                </div>
            </div>
        </div>
    );
}

let mapStateToProps = (state) => ({
    user: state.user.user
});

export default connect(mapStateToProps, {})(Profile);