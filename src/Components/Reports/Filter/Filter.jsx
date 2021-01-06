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
            <input hidden type="checkout" value={isOpenDropdown} />
            <div className={classes.view} onClick={() => setIsOpenDropdown(!isOpenDropdown)}>
                <span> {t("filterReports.filter")} </span>
                <div className={classes.arrow + " " + (isOpenDropdown && classes.open)}></div>
            </div>
            {isOpenDropdown &&
                <div className={classes.dropdown + " " + (isOpenDropdown && classes.openDropdown)}>
                    <span className={`${classes.option} ${classes.margin0}`}>
                        {t("filterReports.filteredBy")}
                    </span>
                    <div className={classes.margin0}>
                        <input type="checkbox" onChange={() => setIsCourses(true)} />
                        <span className={`${classes.option} ${classes.margin0}`}> {t("filterReports.courses")} </span>
                    </div>
                    <div className={classes.margin0}>
                        <input type="checkbox" onChange={() => setIsActivities(true)} />
                        <span className={`${classes.option} ${classes.margin0}`}> {t("filterReports.activities")} </span>
                    </div>
                </div>}
        </StyledSelect>
    );
}

let mapStateToProps = (state) => ({
    direction: state.common.direction
});

export default connect(mapStateToProps, null)(Filter);