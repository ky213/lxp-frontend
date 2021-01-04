import React from 'react';
import classes from './ActivityItem.module.css';
import { clockicon } from '../../../Assets/Images/clock';
import { NavLink } from 'react-router-dom';
import ProgressBar from '../../Common/ProgressBar/ProgressBar';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import styled from 'styled-components';


const StyledMain = styled.div`
    width: ${({ width }) => 'calc(' + width + '% - 32px)'};
`;

const StyledTimeBlock = styled.div`
    margin-left: ${({ direction }) => direction === "ltr" ? "16px" : "0"};
    margin-right: ${({ direction }) => direction === "rtl" ? "16px" : "0"};
`;

const StyledTimeSpan = styled.span`
    margin-left: ${({ direction }) => direction === "ltr" ? "4px" : "0"};
    margin-right: ${({ direction }) => direction === "rtl" ? "4px" : "0"};
`;

const StyledProgressSpan = styled.span`
    margin-left: ${({ direction }) => direction === "ltr" ? "14px" : "0"};
    margin-right: ${({ direction }) => direction === "rtl" ? "14px" : "0"};
`;

const ActivityItem = (props) => {
    const {t, i18n} = useTranslation();
    let widthProgressBar = 45;
    let heightProgressBar = 8;

    const endTime = new Date(props.item.end);
    const now = new Date();

    var daysLag = Math.ceil(Math.abs(endTime.getTime() - now.getTime()) / (1000 * 3600 * 24));
    
    return(
        <StyledMain className={classes.main} width={props.width}>
            <NavLink to={`/activities/view/${props.item.activityId}`}>
                <div className={classes.activityHeader}>
                    <span className={classes.program}>{(!props.item.description || props.item.description === "") ? t("activityMini.empty") : props.item.description}</span>
                    <div className={classes.headerSide}>
                        <span className={classes.status}>{props.item.status}</span>
                        <StyledTimeBlock className={classes.timeBlock} direction={props.direction}>
                            {clockicon}
                            <StyledTimeSpan className={classes.time} direction={props.direction}>
                                {daysLag} 
                                {endTime >= now ? <span>{t("activityMini.daysLeft")}</span>
                                                : <span>{t("activityMini.daysAgo")}</span>}
                            </StyledTimeSpan>
                        </StyledTimeBlock>
                    </div>
                    
                </div>
                <h3>{props.item.name}</h3>
                <div className={classes.progressBlock}>
                    <ProgressBar width={widthProgressBar} height={heightProgressBar} progress={props.item.totalPoints}/>
                    <StyledProgressSpan direction={props.direction}>{props.item.totalPoints}%</StyledProgressSpan>
                </div>
                
            </NavLink>
        </StyledMain>
    );
}

let mapStateToProps = (state) => ({
    direction: state.common.direction
});

export default connect(mapStateToProps, {})(ActivityItem);