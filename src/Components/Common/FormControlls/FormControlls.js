import React from 'react';
import classes from './FormControlls.module.css';

export const AuthInput = ({input, meta, ...props}) => {
    const hasError = meta.touched && meta.error;
    return(
        <div className={classes.formControll + " " + (hasError && classes.error)}>
            <input {...input} {...props}/>
            {hasError && <span>{meta.error}</span>}
        </div>
    );
}

