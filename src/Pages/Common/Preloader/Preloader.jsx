import React from 'react';
import preloader from '../../../Assets/Common/preloader.svg';
import classes from './Preloader.module.css';

const Preloader = (props) => {
    return(
        <div className={classes.main}>
            <img src={preloader}/>
        </div>
    );
}

export default Preloader;