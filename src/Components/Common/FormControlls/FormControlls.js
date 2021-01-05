import React from 'react';
import classes from './FormControlls.module.css';
import { useTranslation } from 'react-i18next';

export const AuthInput = ({input, meta, ...props}) => {
    const hasError = meta.touched && meta.error;
    return(
        <div className={classes.formControll + " " + (hasError && classes.error)}>
            <input {...input} {...props}/>
            {hasError && <span>{meta.error}</span>}
        </div>
    );
}

export const TextAreaCustom = ({input, meta, ...props}) => {
    const {t, i18n} = useTranslation();
    const hasError = meta.touched && meta.error;
    return(
        <div className={classes.textarea + " " + (hasError && classes.error)}>
            <textarea maxLength={props.maxLength} {...input} {...props}/>
            {hasError && <span>{meta.error}</span>}
            <label>{props.left} {t("addActivity.charactersLeft")}</label>
        </div>
    )
}
