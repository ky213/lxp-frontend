import React, { useEffect, useReducer, useRef } from 'react';
import { connect, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import classes from './ProfileMenu.module.css';
import { logout } from 'Store/Reducers/authentication';
import { logout_icon } from 'Assets/Images/logout_icon';
import { profile_settings_icon } from 'Assets/Images/profile_settings_icon';

const StyledModal = styled.div`
  direction: ${({ direction }) => direction};
  transform: ${({ direction }) =>
    direction === 'ltr' ? 'translateX(-233px) translateY(25px)' : 'translateX(-73px) translateY(25px)'};
`;
const StyledArrow = styled.div`
  left: ${({ direction }) => (direction === 'ltr' ? '-15px' : '25px')};
  & div {
    left: ${({ direction }) => (direction === 'ltr' ? '-4px' : '4px')};
  }
`;

const StyledMenu = styled.div`
  span {
    margin-left: ${({ direction }) => (direction === 'ltr' ? '10px' : '0')};
    margin-right: ${({ direction }) => (direction === 'rtl' ? '10px' : '0')};
  }
`;

const ProfileMenu = props => {
  const handleLogout = () => {
    props.logout();
    props.setIsOpenProfileMenu(false);
  };
  const linkRef = useRef(null);
  const butRef = useRef(null);

  useEffect(() => {
    linkRef.current.querySelector('svg').classList.add('detectClick');
    butRef.current.querySelector('svg').classList.add('detectClick');
    window.addEventListener('mousedown', event => {
      if (event.target.classList.value.includes('detectClick')) {
        return;
      }
      props.setIsOpenProfileMenu(false);
    });
  }, []);

  return (
    <StyledModal className={classes.main + ' ' + classes.detectClick} direction={props.direction}>
      <StyledArrow className={classes.arrow + ' ' + classes.detectClick} direction={props.direction}>
        <div className={classes.innerArrow + ' ' + classes.detectClick}></div>
      </StyledArrow>
      <StyledMenu className={classes.menu + ' ' + classes.detectClick} direction={props.direction}>
        <div className={classes.menuItem + ' ' + classes.withBorder + ' ' + classes.detectClick}>
          <NavLink
            ref={linkRef}
            to="/profile"
            className={classes.detectClick}
            onClick={() => {
              props.setIsOpenProfileMenu(false);
            }}
          >
            {profile_settings_icon}
            <span className={classes.detectClick}>Profile Settings</span>
          </NavLink>
        </div>
        <div className={classes.menuItem + ' ' + classes.detectClick}>
          <button ref={butRef} className={classes.detectClick} onClick={handleLogout}>
            {logout_icon}
            <span className={classes.detectClick}>Logout</span>
          </button>
        </div>
      </StyledMenu>
    </StyledModal>
  );
};

let mapStateToProps = state => ({
  direction: state.common.direction,
});

export default connect(mapStateToProps, {
  logout,
})(ProfileMenu);
