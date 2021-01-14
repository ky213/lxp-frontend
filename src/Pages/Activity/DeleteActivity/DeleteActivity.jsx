import React from 'react';
import classes from './DeleteActivity.module.css';
import Aos from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import shield from '../../../Assets/Images/shield.svg';

const DeleteActivity = (props) => {
    const {t, i18n} = useTranslation();

    useEffect(() => {
        Aos.init({ duration: 1000 });
    }, []);

    return(
        <div className={classes.backGray}>
            <div className={classes.modal} data-aos="fade-down">
                <button className={classes.close} onClick={()=>props.setIsShowDeleteModal(false)}>×</button>
                <img src={shield}/>
                <h1>{t("deleteActivity.title")}</h1>
                <span>{t("deleteActivity.sub")}</span>
                <div className={classes.buttons}>
                    <button className={classes.del}>{t("deleteActivity.delete")}</button>
                    <p>&nbsp;&nbsp;&nbsp;&nbsp;</p>
                    <button className={classes.cancel} onClick={()=>props.setIsShowDeleteModal(false)}>{t("deleteActivity.cancel")}</button>
                </div>
            </div>
        </div>
    );
}

export default DeleteActivity;