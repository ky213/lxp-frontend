import React from 'react';
import classes from './ProgramItem.module.css';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { learnersicon } from '../../../Assets/Images/learners';
import { clockicon } from '../../../Assets/Images/clock';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { ROLE_MANAGER } from '../../../Utils/constants';

const StyledAttendees = styled.div`
    margin-left: ${({ direction }) => direction === "ltr" ? "4px" : "0"};
    margin-right: ${({ direction }) => direction === "rtl" ? "4px" : "0"};
`;

const StyledTimeBlock = styled.div`
    margin-left: ${({ direction }) => direction === "ltr" ? "16px" : "0"};
    margin-right: ${({ direction }) => direction === "rtl" ? "16px" : "0"};
`;

const StyledTimeSpan = styled.span`
    margin-left: ${({ direction }) => direction === "ltr" ? "4px" : "0"};
    margin-right: ${({ direction }) => direction === "rtl" ? "4px" : "0"};
`;

const ProgramItem = (props) => {
    const {t, i18n} = useTranslation();

    const endTime = new Date(props.item.end);
    const now = new Date();

    var daysLag = Math.ceil(Math.abs(endTime.getTime() - now.getTime()) / (1000 * 3600 * 24));
    
    return(
        <div className={classes.main}>
            <NavLink to={`/programs/${props.item.programId}`}>
                {(props.item.image != "null") ? <img src={props.item.image}/> : <div className={classes.defaultImg}></div>}
                
                <div className={classes.itemInfo}>
                    <div className={classes.header}>
                        <label>{t("programMini.label")}</label>
                        {props.user.roleId === ROLE_MANAGER &&
                        <NavLink to={`/programs/${props.item.programId}/attendees`} className={classes.attendees}> 
                            {learnersicon}
                            <StyledAttendees direction={props.direction}>{props.item.attendees ? props.item.attendees.length : 0} {t("programMini.attendees")}</StyledAttendees>
                        </NavLink>}
                    </div>
                    
                    <h2>{props.item.name}</h2>
                    <p className={classes.description}>{props.item.subject}</p>
                    <div className={classes.itemFoot}>
                        <span className={classes.courses}>{props.item.courses ? props.item.courses.length : 0} {t("programMini.courses")}</span>
                        {props.item.courses && (props.item.courses.length > 0 &&
                        <StyledTimeBlock className={classes.timeBlock} direction={props.direction}>
                            {clockicon}
                            <StyledTimeSpan className={classes.time} direction={props.direction}>
                                {daysLag} 
                                {endTime >= now ? <span>{t("activityMini.daysLeft")}</span>
                                                : <span>{t("activityMini.daysAgo")}</span>}
                            </StyledTimeSpan>
                        </StyledTimeBlock>)}
                    </div>
                </div>
                
            </NavLink>
        </div>
    );
}

let mapStateToProps = (state) => ({
    direction: state.common.direction,
    user: state.user.user
});

export default connect(mapStateToProps, {})(ProgramItem);