import React, { Fragment, useEffect, useState } from 'react';
import classes from './NotificationModalItem.module.css';
import { notificationicon } from '../../../../Assets/Images/notification.js';
import showmoreicon from "../../../../Assets/Images/showmoreicon.svg";
import parse from 'html-react-parser';
import NotificationModalItemMenu from './NotificationModalItemMenu/NotificationModalItemMenu';

const NotificationModalItem = (props) => {
    let sendTime = new Date(props.item.generated);
    let now = new Date();

    const [isOpenMenu, setIsOpenMenu] = useState(false);

    

    useEffect(()=>{
        if(props.isScroll){
            setIsOpenMenu(false);
        }
    },[props.isScroll]);

    function secondsToDhms(seconds) {
        seconds = Number(seconds);
        var d = Math.floor(seconds / (3600*24));
        var h = Math.floor(seconds % (3600*24) / 3600);
        var m = Math.floor(seconds % 3600 / 60);
        var s = Math.floor(seconds % 60);
        
        var dDisplay = d > 0 ? d + (d == 1 ? "d " : "d ") : "";
        var hDisplay = h > 0 ? h + (h == 1 ? "h " : "h ") : "";
        var mDisplay = m > 0 ? m + (m == 1 ? "m " : "m ") : "";
        var sDisplay = s > 0 ? s + (s == 1 ? "s" : "s") : "";

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
        <div className={classes.main}>
            <div className={classes.image}>
                {notificationicon}
            </div>
            <div className={classes.info}>
                <p>{parse(props.item.text)}</p>
                <span>{agoTime} ago</span>
            </div>
            <div className={classes.menu} onClick={()=>{setIsOpenMenu(!isOpenMenu)}}>
                <img src={showmoreicon}/>
                {isOpenMenu && <NotificationModalItemMenu/>}
            </div>
        </div>    
    );
}

export default NotificationModalItem;