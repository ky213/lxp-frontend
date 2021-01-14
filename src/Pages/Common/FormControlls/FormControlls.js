import React, { useState } from 'react';
import classes from './FormControlls.module.css';
import { useTranslation } from 'react-i18next';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

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
        <div className={(props.isBig ? classes.textareaBig : classes.textarea) + " " + (hasError && classes.error)}>
            <textarea maxLength={props.maxLength} {...input} {...props} row={props.rows}/>
            {hasError && <span>{meta.error}</span>}
            <label>{props.maxLength ? (props.left + " " + t("addActivity.charactersLeft")) : t("addProgram.labelTextArea")}</label>
        </div>
    )
}

export const Calendar = ({input, meta, ...props}) => {
    const [startDate, setStartDate] = useState(new Date());

    let handleDate = (date) => {
        setStartDate(date);
        input.onChange(date);
    }

    const hasError = meta.touched && meta.error;

    return(
        <div className={classes.calendar + " " + (hasError && classes.error)}>
            <DatePicker selected={startDate} onChange={date => handleDate(date)}/>
            {hasError && <span>{meta.error}</span>}
        </div>
    );
}
