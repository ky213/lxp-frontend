import React, { useState } from 'react';
import classes from './Programs.module.css';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { empty_state_icon } from '../../Assets/Images/empty_state_icon';

const StyledLabel = styled.label`
    margin-left: ${({ direction }) => direction === "rtl" ? "56px" : "0"};
    margin-right: ${({ direction }) => direction === "ltr" ? "56px" : "0"};
`;

const Programs = (props) => {
    const {t, i18n} = useTranslation();

    const [all, setAll] = useState(false);
    const [completed, setCompleted] = useState(true);
    const [inProgress, setInProgress] = useState(true);
    const [notStarted, setNotStarted] = useState(false);

    let programs = [];

    programs = props.programs.map(program => {

    });

    return(
        <div className={classes.main}>
            <div className={classes.header}>
                <div className={classes.container}>
                    <h1>{t("programs.title")}</h1>
                    <div className={classes.filters}>
                        <StyledLabel className={classes.filter} direction={props.direction}>
                            <span className={classes.filterText}>{t("courses.filters.all")}</span>
                            <input type="checkbox" onChange={()=>{setAll(!all)}}/>
                            <span className={classes.checkmark}></span>
                        </StyledLabel>
                        <StyledLabel className={classes.filter} direction={props.direction}>
                            <span className={classes.filterText}>{t("courses.filters.completed")}</span>
                            <input type="checkbox" onChange={()=>{setCompleted(!completed)}} checked={completed}/>
                            <span className={classes.checkmark}></span>
                        </StyledLabel>
                        <StyledLabel className={classes.filter} direction={props.direction}>
                            <span className={classes.filterText}>{t("courses.filters.inProgress")}</span>
                            <input type="checkbox" onChange={()=>{setInProgress(!inProgress)}} checked={inProgress}/>
                            <span className={classes.checkmark}></span>
                        </StyledLabel>
                        <StyledLabel className={classes.filter} direction={props.direction}>
                            <span className={classes.filterText}>{t("courses.filters.notStarted")}</span>
                            <input type="checkbox" onChange={()=>{setNotStarted(!notStarted)}}/>
                            <span className={classes.checkmark}></span>
                        </StyledLabel>
                    </div>
                </div>
            </div>
            <div className={classes.itemsList}>
                <div className={classes.containerItems}>
                    {(programs.length > 0 && programs != null && programs != undefined) ? programs : 
                        <div className={classes.empty}>
                            <div className={classes.emptyIcon}>
                                {empty_state_icon}
                            </div>
                            <span>{t("programs.empty")}</span>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
}

export default Programs;