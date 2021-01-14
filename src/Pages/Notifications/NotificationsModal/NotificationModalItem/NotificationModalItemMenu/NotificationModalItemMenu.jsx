import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import classes from './NotificationModalItemMenu.module.css';
import markasreadicon from '../../../../../Assets/Images/asreadicon.svg';
import deleteicon from '../../../../../Assets/Images/deleteicon.svg';
import { useTranslation } from 'react-i18next';

const StyledModal = styled.div`
    transform: ${({ direction }) => direction === "ltr" ? 'translateY(0px) translateX(-166px)' : 'translateY(0px) translateX(166px);' }; 
`;

const StyledArrow = styled.div`
    left: ${({ direction }) => direction === "ltr" ? "-6px" : "6px"};
    
    & div{
        left: ${({ direction }) => direction === "ltr" ? "-4.5px" : "3.5px"};
    }
`;

const StyledSpan = styled.span`
    margin-left: ${({ direction }) => direction === "ltr" ? "12px" : "0"};
    margin-right: ${({ direction }) => direction === "rtl" ? "12px" : "0"};
`;


const NotificationModalItemMenu = (props) => {
    const {t, i18n} = useTranslation();

    return(
        <StyledModal className={classes.main   + " " + classes.detectClick} direction={props.direction}>
            <StyledArrow className={classes.arrow   + " " + classes.detectClick} direction={props.direction}>
                <div className={classes.innerArrow   + " " + classes.detectClick}></div>
            </StyledArrow>
            <div className={classes.body   + " " + classes.detectClick}>
                <button className={classes.detectClick}>
                    <div className={classes.image   + " " + classes.detectClick}>
                        <img src={markasreadicon} className={classes.detectClick}/>
                    </div>
                    <StyledSpan direction={props.direction} className={classes.detectClick}>{t("notificationsModal.menu.asRead")}</StyledSpan>
                </button>
                <button className={classes.detectClick}>
                    <div className={classes.image  + " " + classes.detectClick}>
                        <img src={deleteicon} className={classes.detectClick}/>
                    </div>
                    <StyledSpan direction={props.direction} className={classes.detectClick}>{t("notificationsModal.menu.delete")}</StyledSpan>
                </button>
            </div>
        </StyledModal>
    );
}

let mapStateToProps = (state) => ({
    direction: state.common.direction
})

export default connect(mapStateToProps, {

})(NotificationModalItemMenu);
