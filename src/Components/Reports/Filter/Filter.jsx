import React, { useEffect, useState } from 'react';
import classes from './Filter.module.css';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

const StyledSelect = styled.div`

`;

const Filter = (props) => {
    const { t, i18n } = useTranslation();

    const [isOpenDropdown, setIsOpenDropdown] = useState(false);
    const [isCourses, setIsCourses] = useState(false)
    const [isActivities, setIsActivities] = useState(false)

    return (
        <StyledSelect className={classes.main} width={props.width}>
            <input hidden type="checkout" defaultValue={isOpenDropdown} checked={isOpenDropdown} />
            <div className={classes.view} onClick={() => setIsOpenDropdown(!isOpenDropdown)}>
                <span> {t("filterReports.filter")} </span>
                <div className={classes.arrow + " " + (isOpenDropdown && classes.open)}></div>
            </div>
            {isOpenDropdown &&
                <div className={classes.dropdown + " " + (isOpenDropdown && classes.openDropdown)}>
                    <span className={`${classes.option} ${classes.margin0}`}>
                        {t("filterReports.filteredBy")}
                    </span>
                    <div onClick={() => setIsCourses(!isCourses)} className={`${classes.margin0} ${classes.filter}`}>
                        <span className={classes.filterText}>{t("filterReports.courses")}</span>
                        <input type="checkbox" checked={isCourses} value={isCourses}  defaultChecked={isCourses} defaultValue={isCourses}/>
                        <span className={classes.checkmark}></span>
                    </div>
                    <div onClick={() => setIsActivities(!isActivities)} className={`${classes.margin0} ${classes.filter}`}>
                        <span className={classes.filterText}>{t("filterReports.activities")}</span>
                        <input type="checkbox" checked={isActivities} value={isActivities}  defaultChecked={isActivities} defaultValue={isActivities}/>
                        <span className={classes.checkmark}></span>
                    </div>
                </div>}
        </StyledSelect>
    );
}

let mapStateToProps = (state) => ({
    direction: state.common.direction
});

export default connect(mapStateToProps, null)(Filter);