import React from 'react';
import classes from './DeleteModal.module.css';
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
                <h1>{props.title}</h1>
                <span>{props.sub}</span>
                <div className={classes.buttons}>
                    <button className={classes.del}>{props.deleteText}</button>
                    <p>&nbsp;&nbsp;&nbsp;&nbsp;</p>
                    <button className={classes.cancel} onClick={()=>props.setIsShowDeleteModal(false)}>{props.cancelText}</button>
                </div>
            </div>
        </div>
    );
}

export default DeleteActivity;