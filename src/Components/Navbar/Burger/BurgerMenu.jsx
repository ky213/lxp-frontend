import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import classes from '../Navbar.module.css';
import { useTranslation } from 'react-i18next';
import {planeticon} from '../../../Assets/Images/planet_icon'

const Menu = styled.div`
    width: 100%;
    height: 100vh;
    transform: ${({ open }) => open ? 'translateX(0)' : 'translateX(100%)'};
    position: fixed;
    top: 0;
    left: 0;
    background-color: #59bcabe3;
    transition-duration: 0.4s;
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: center;

    a{
        font-size: 35px;
    }
    a.active{
        color: white;
    }

`;


const BurgerMenu = ({open, setOpen, changeLanguage, language}) => {
    const {t, i18n} = useTranslation();
    return(
        <Menu open={open}>
            <nav className={"nav"}>
                <div className={classes.menuItem}>
                    <NavLink to="/home" activeClassName={"active"}>{t("navbar.home")}</NavLink>
                </div>
                <div className={classes.menuItem}>
                    <NavLink to="/programs" activeClassName={"active"}>{t("navbar.programs")}</NavLink>
                </div>
                <div className={classes.menuItem}>
                    <NavLink to="/courses" activeClassName={"active"}>{t("navbar.courses")}</NavLink>
                </div>
                <div className={classes.menuItem}>
                    <NavLink to="/activities" activeClassName={"active"}>{t("navbar.activities")}</NavLink>
                </div>
                <div className={classes.menuItem}>
                    <NavLink to="/report" activeClassName={"active"}>{t("navbar.myreport")}</NavLink>
                </div>
                <div className={`${classes.langBut} ${classes.langBurgerMenu}`}>
                    <button onClick={()=>{changeLanguage(language())}}>
                            {planeticon}
                    </button>
                </div>
            </nav>
        </Menu>
    )
    
}

export default BurgerMenu;