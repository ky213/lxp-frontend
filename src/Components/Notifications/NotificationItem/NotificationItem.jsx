import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import classes from './NotificationItem.module.css';
import { notificationicon } from '../../../Assets/Images/notification';
import parse from 'html-react-parser';
import { useTranslation } from 'react-i18next';
import showmoreicon from "../../../Assets/Images/showmoreicon.svg";
import NotificationModalItemMenu from '../NotificationsModal/NotificationModalItem/NotificationModalItemMenu/NotificationModalItemMenu';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

const StyledItem = styled.div`
    background-color: ${({ isRead }) => isRead ? "white" : "rgba(172, 221, 213, 0.15)"};
`;

const StyledDiv = styled.div`
    margin-left: ${({ direction }) => direction === "ltr" ? '0' : '16px'};
    margin-right: ${({ direction }) => direction === "rtl" ? "0" : "16px"};
`;

const NotificationItem = (props) => {
    let sendTime = new Date(props.item.generated);
    let now = new Date();

    const [isOpenMenu, setIsOpenMenu] = useState(false);

    const {t, i18n} = useTranslation();

    useEffect(()=>{
        if(props.isScroll){
            setIsOpenMenu(false);
        }
    },[props.isScroll]);

    function secondsToDhms(seconds) {
        seconds = Number(seconds);
        let d = Math.floor(seconds / (3600*24));
        let h = Math.floor(seconds % (3600*24) / 3600);
        let m = Math.floor(seconds % 3600 / 60);
        let s = Math.floor(seconds % 60);
        
        let dDisplay = d > 0 ? d + (t("notificationItem.days")) : "";
        let hDisplay = h > 0 ? h + (t("notificationItem.hours")) : "";
        let mDisplay = m > 0 ? m + (t("notificationItem.minutes")) : "";
        let sDisplay = s > 0 ? s + (t("notificationItem.seconds")) : "";

        if(dDisplay != ""){
            return dDisplay;
        }else if(hDisplay != ""){
            return hDisplay;
        }else if(mDisplay != ""){
            return mDisplay;
        }else{
            return sDisplay;
        }
    }

    let agoTime = secondsToDhms((now.getTime() - sendTime.getTime()) / 1000);
    
    return(
        <StyledItem className={classes.main} isRead={props.isRead}>
            <StyledDiv className={classes.image} direction={props.direction}>
                {notificationicon}
            </StyledDiv>
            <div className={classes.info}>
                <p>{parse(props.item.text)}</p>
                <NavLink to={`/home/notifications/${props.item.notificationId}`}>{t("notificationItem.link")}</NavLink>
                <span>{agoTime} {t("notificationItem.ago")}</span>
            </div>
            <div className={classes.menu} onClick={()=>{setIsOpenMenu(!isOpenMenu)}}>
                <img src={showmoreicon}/>
                {isOpenMenu && <NotificationModalItemMenu/>}
            </div>
        </StyledItem>
    );
}

let mapStateToProps = (state) => ({
    direction: state.common.direction
})

export default connect(mapStateToProps, {})(NotificationItem);