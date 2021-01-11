import React, { useState } from 'react';
import styled from 'styled-components';
import classes from './Navbar.module.css';
import { NavLink } from 'react-router-dom';
import { programicon } from '../../Assets/Images/programicon.js';
import { myreporticon } from '../../Assets/Images/myreport.js';
import { activitiesicon } from '../../Assets/Images/activities.js';
import { coursesicon } from '../../Assets/Images/courses.js';
import { notificationicon } from '../../Assets/Images/notification.js';
import { homeicon } from '../../Assets/Images/homeicon.js';
import { searchicon } from '../../Assets/Images/searchicon.js';
import Burger from './Burger/Burger';
import { useTranslation } from 'react-i18next';
import SearchModal from '../Common/SearchModal/SearchModal';
import ProfileMenu from './ProfileMenu/ProfileMenu';
import NotificationsModal from '../Notifications/NotificationsModal/NotificationsModal';
import {planeticon} from '../../Assets/Images/planet_icon'
import { useSelector } from 'react-redux';

const StyledLogoBlock = styled.div`
    a span{
        margin-left: ${({ direction }) => direction === "ltr" ? "5px" : "0"};
        margin-right: ${({ direction }) => direction === "rtl" ? "5px" : "0"};
    }
`;
const StyledLinks = styled.div`
    margin-left: ${({ direction }) => direction === "ltr" ? "60px" : "0"};
    margin-right: ${({ direction }) => direction === "rtl" ? "60px" : "0"};
`;

const StyledNotifications = styled.div`
    margin-left: ${({ direction }) => direction === "rtl" ? "15px" : "0"};
    margin-right: ${({ direction }) => direction === "ltr" ? "15px" : "0"};
`;

const StyledBut = styled.button`
    margin-left: ${({ direction }) => direction === "rtl" ? "15px" : "0"};
    margin-right: ${({ direction }) => direction === "ltr" ? "15px" : "0"};
`;

const Navbar = (props) => {
    const {t, i18n} = useTranslation();
    
    const currentLanguage = useSelector((state)=> state.common.currentLanguage)

    const language = () => {
        if(currentLanguage === "en") {
            props.setCurrentLanguage("ar");
            return "ar"
        } else {
            props.setCurrentLanguage("en");
            return "en"
        }
    }

    const [isOpenProfileMenu, setIsOpenProfileMenu] = useState(false);

    return(
        <nav className={classes.main}>
            <div className={classes.container}>
                <div className={classes.leftSideNav}>
                    <StyledLogoBlock className={classes.logoBlock} direction={props.direction}>
                        <NavLink to="/home">
                            <div className={classes.logo}></div>
                            <span>{t("navbar.logo")}</span>
                        </NavLink>
                    </StyledLogoBlock>
                    <StyledLinks className={classes.links} direction={props.direction}>
                        <div className={classes.menuItem}>
                            <NavLink to="/home" activeClassName={classes.active}>
                                {homeicon}
                                {t("navbar.home")}
                            </NavLink>
                        </div>
                        <div className={classes.menuItem}>
                            <NavLink to="/programs" activeClassName={classes.active}>
                                {programicon}
                                {t("navbar.programs")}
                            </NavLink>
                        </div>
                        <div className={classes.menuItem}>
                            <NavLink to="/courses" activeClassName={classes.active}>
                                {coursesicon}
                                {t("navbar.courses")}
                            </NavLink>
                        </div>
                        <div className={classes.menuItem}>
                            <NavLink to="/activities" activeClassName={classes.active}>
                                {activitiesicon}
                                {t("navbar.activities")}
                            </NavLink>
                        </div>
                        <div className={classes.menuItem}>
                            <NavLink to="/report" activeClassName={classes.active}>
                                {myreporticon}
                                {t("navbar.myreport")}
                            </NavLink>
                        </div>
                    </StyledLinks>
                </div>
                
                
                <div className={classes.rightSideNav}>
                    <div className={classes.langBut}>
                        <div className={classes.showLng}>
                            {currentLanguage === "en" ? "AR" : "EN"}
                        </div>
                        <button onClick={()=>{props.changeLanguage(language())}}>
                            {planeticon}
                        </button>
                    </div>
                    <StyledBut className={classes.searchBut + " " + (props.isOpenSearchModal && classes.activeSearch)} direction={props.direction} onClick={()=>{props.setIsOpenSearchModal(!props.isOpenSearchModal)}}>
                        {searchicon}
                    </StyledBut>
                    {props.isOpenSearchModal && <SearchModal setIsOpenSearchModal={props.setIsOpenSearchModal}/>}
                    <StyledNotifications className={classes.notifications} direction={props.direction}>
                        <button onClick={()=>{props.setIsOpenNotificationsModal(!props.isOpenNotificationsModal)}} className={classes.notBut + " " + (props.isOpenNotificationsModal && classes.activeModalNotifications)}>
                            {notificationicon}
                            <div className={classes.notificationsCount}>
                                {props.totalUnreadNotificationsCount}
                            </div>
                        </button>
                    </StyledNotifications>
                    {props.isOpenNotificationsModal && <NotificationsModal setIsOpenNotificationsModal={props.setIsOpenNotificationsModal}/>}
                    <input type="checkbox" hidden id="profileMenu" className={classes.check} checked={isOpenProfileMenu}/>
                    <label className={classes.userMenu} htmlFor="profileMenu" onClick={()=>{setIsOpenProfileMenu(!isOpenProfileMenu)}}>
                        {props.user.profilePhoto ? 
                        <img src={props.user.profilePhoto} className={classes.userPhoto}/> : 
                        <div className={classes.userDefault}></div>}
                        <span>{props.user.name}</span>
                        <div className={classes.profileMenuContainer}>
                            {isOpenProfileMenu && <ProfileMenu setIsOpenProfileMenu={setIsOpenProfileMenu}/>}
                        </div>
                    </label>
                    <div className={classes.burger}>
                        <Burger changeLanguage={props.changeLanguage} language={language} currentLanguage={currentLanguage}/>
                    </div>
                </div>
            </div>
            
            

        </nav>
    )
}

export default Navbar;