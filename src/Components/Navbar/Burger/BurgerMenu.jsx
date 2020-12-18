import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import classes from '../Navbar.module.css';

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


const BurgerMenu = ({open, setOpen}) => {
    return(
        <Menu open={open}>
            <nav className={"nav"}>
                <div className={classes.menuItem}>
                    <NavLink to="/home" activeClassName={"active"}>Home</NavLink>
                </div>
                <div className={classes.menuItem}>
                    <NavLink to="/programs" activeClassName={"active"}>Programs</NavLink>
                </div>
                <div className={classes.menuItem}>
                    <NavLink to="/courses" activeClassName={"active"}>Courses</NavLink>
                </div>
                <div className={classes.menuItem}>
                    <NavLink to="/activities" activeClassName={"active"}>Activities</NavLink>
                </div>
                <div className={classes.menuItem}>
                    <NavLink to="/report" activeClassName={"active"}>My Report</NavLink>
                </div>
            </nav>
        </Menu>
    )
    
}

export default BurgerMenu;