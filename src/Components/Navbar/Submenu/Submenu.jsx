import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from './Submenu.module.css';
import { libraryicon } from '../../../Assets/Images/library';
import { activitiesicon } from '../../../Assets/Images/activities.js';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { connect } from 'react-redux';

const StyledArrow = styled.div`
    left: ${({ direction }) => direction === "ltr" ? '-81px' : '81px'};
    & div{
        left: ${({ direction }) => direction === "ltr" ? '-4px' : '4px'};
    }
`;

const StyledDropDown = styled.div`
transform: ${({ direction }) => direction === "ltr" ? 'translateX(3px)' : 'translateX(-3px)'}; 
`;

const Submenu = (props) => {
    const {t, i18n} = useTranslation();
    return(
        <StyledDropDown className={classes.main} direction={props.direction}>
            <StyledArrow className={classes.arrow  + " " + classes.detectClick} direction={props.direction}>
                <div className={classes.innerArrow  + " " + classes.detectClick}></div>
            </StyledArrow>
            <div className={classes.body}>
                <div className={classes.menuItem}>
                    
                    <NavLink to="/activities" activeClassName={classes.active}>
                        <div className={classes.icon}>
                            {activitiesicon}
                        </div>
                        
                        <span>{t("navbar.myActivities")}</span>
                    </NavLink>
                </div>
                <div className={classes.menuItem}>
                    <NavLink to="/activities/library" activeClassName={classes.active}>
                        <div className={classes.icon}>
                            {libraryicon}
                        </div>
                        <span>{t("navbar.library")}</span>
                    </NavLink>
                </div>
            </div>
        </StyledDropDown>
        
    );
}

let mapStateToProps = (state) => ({
    direction: state.common.direction
})

export default connect(mapStateToProps, {})(Submenu);