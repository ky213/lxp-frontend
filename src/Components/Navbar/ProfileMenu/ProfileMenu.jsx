import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import classes from './ProfileMenu.module.css';
import { logout } from '../../../Redux/userReducer';
import { logout_icon } from '../../../Assets/Images/logout_icon';
import { profile_settings_icon } from '../../../Assets/Images/profile_settings_icon';

const StyledModal = styled.div`
    direction: ${({ direction }) => direction};
    transform: ${({ direction }) => direction === "ltr" ? 'translateX(-233px) translateY(25px)' : 'translateX(-73px) translateY(25px)'}; 

`;
const StyledArrow = styled.div`
    left: ${({ direction }) => direction === "ltr" ? '-15px' : '25px'};
    & div{
        left: ${({ direction }) => direction === "ltr" ? '-4px' : '4px'};
    }
`;

const StyledMenu = styled.div`
    span{
        margin-left: ${({ direction }) => direction === "ltr" ? "10px" : "0"};
        margin-right: ${({ direction }) => direction === "rtl" ? "10px" : "0"};
    }
`;



const ProfileMenu = (props) => {
    return(
        <StyledModal className={classes.main} direction={props.direction}>
            <StyledArrow className={classes.arrow} direction={props.direction}>
                <div className={classes.innerArrow}></div>
            </StyledArrow>
            <StyledMenu className={classes.menu} direction={props.direction}>
                <div className={classes.menuItem + " " + classes.withBorder}>
                    <NavLink to="/profile">
                        {profile_settings_icon}
                        <span>Profile Settings</span>
                    </NavLink>
                </div>
                <div className={classes.menuItem}>
                    <button onClick={()=>{props.logout()}}>
                        {logout_icon}
                        <span>Logout</span>
                    </button>
                </div>
            </StyledMenu>
        </StyledModal>
    );
}

let mapStateToProps = (state) => ({
    direction: state.common.direction
});

export default connect(mapStateToProps, {
    logout
})(ProfileMenu);