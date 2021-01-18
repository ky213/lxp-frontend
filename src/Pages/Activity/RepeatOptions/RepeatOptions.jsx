import classes from '*.module.sass';
import React from 'react';
import classes from './RepeatOptions.module.css';
import { useTranslation } from 'react-i18next';
import CustomSelect from '../../Common/Cutsom/Select/CustomSelect';

const RepeatOptions = (props) => {
    const {t, i18n} = useTranslation();
    let repeatOptions = [t("activityEditRepeat.repeatOptions.yearly"),
                    t("activityEditRepeat.repeatOptions.monthly"),
                    t("activityEditRepeat.repeatOptions.day")];

    

    return(
        <div className={classes.main}>
            <div className={classes.field}>
                <label>Repeat Every</label>
                <CustomSelect options={repeatOptions} />
            </div>

        </div>
    );
}

export default RepeatOptions;