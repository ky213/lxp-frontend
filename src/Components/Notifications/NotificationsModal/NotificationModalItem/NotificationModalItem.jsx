import React, { Fragment, useEffect, useRef, useState } from 'react';
import classes from './NotificationModalItem.module.css';
import { notificationicon } from '../../../../Assets/Images/notification.js';
import showmoreicon from "../../../../Assets/Images/showmoreicon.svg";
import parse from 'html-react-parser';
import { useTranslation } from 'react-i18next';
import NotificationModalItemMenu from './NotificationModalItemMenu/NotificationModalItemMenu';

const NotificationModalItem = (props) => {
    let sendTime = new Date(props.item.generated);
    let now = new Date();

    const [isOpenMenu, setIsOpenMenu] = useState(false);

    const {t, i18n} = useTranslation();
    
    const divRef = useRef(null);
    const pRef = useRef(null);

    useEffect(()=>{
        divRef.current.querySelector('svg').classList.add('detectClick')
        pRef.current.querySelector('strong').classList.add('detectClick')
    },[]);

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
        <div className={classes.main  + " " + classes.detectClick}>
            <div ref={divRef} className={classes.image  + " " + classes.detectClick}>
                {notificationicon}
            </div>
            <div className={classes.info  + " " + classes.detectClick}>
                <p ref={pRef} className={classes.detectClick}>{parse(props.item.text)}</p>
                <span className={classes.detectClick}>{agoTime} {t("notificationItem.ago")}</span>
            </div>
            <div className={classes.menu   + " " + classes.detectClick} onClick={()=>{setIsOpenMenu(!isOpenMenu)}}>
                <img src={showmoreicon} className={classes.detectClick}/>
                {isOpenMenu && <NotificationModalItemMenu/>}
            </div>
        </div>    
    );
}

export default NotificationModalItem;