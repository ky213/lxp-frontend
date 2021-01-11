import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import classes from './NotificationModalItemMenu.module.css';
import markasreadicon from '../../../../../Assets/Images/asreadicon.svg';
import deleteicon from '../../../../../Assets/Images/deleteicon.svg';
import { useTranslation } from 'react-i18next';

const StyledModal = styled.div`
    transform: ${({ direction }) => direction === "ltr" ? 'translateY(0px) translateX(-166px)' : 'translateY(0px) translateX(166px);' }; 
    @media screen and (max-width: 1000px){
        width: 620px;
        
    }
    @media screen and (max-width: 822px){
        width: 520px;
        
    }
    @media screen and (max-width: 693px){
        width: 420px;
        
    }
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
        <StyledModal className={classes.main} direction={props.direction}>
            <StyledArrow className={classes.arrow} direction={props.direction}>
                <div className={classes.innerArrow}></div>
            </StyledArrow>
            <div className={classes.body}>
                <button>
                    <div className={classes.image}>
                        <img src={markasreadicon}/>
                    </div>
                    <StyledSpan direction={props.direction}>{t("notificationsModal.menu.asRead")}</StyledSpan>
                </button>
                <button>
                    <div className={classes.image}>
                        <img src={deleteicon}/>
                    </div>
                    <StyledSpan direction={props.direction}>{t("notificationsModal.menu.delete")}</StyledSpan>
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

