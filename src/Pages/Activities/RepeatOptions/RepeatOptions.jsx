import React, { useEffect, useLayoutEffect, useState } from 'react';
import classes from './RepeatOptions.module.css';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Field, reduxForm } from 'redux-form';
import { Calendar, CustomSelect } from 'Components';

const StyledTextBlock = styled.div`
    margin-left: ${({ direction }) => direction === 'ltr' ? "0" : "15px"};
    margin-right: ${({ direction }) => direction === 'rtl' ? "0" : "15px"};
    @media screen and (max-width: 568px){
        margin-left: ${({ direction }) => direction === 'ltr' ? "0" : "15px"};
        margin-right: ${({ direction }) => direction === 'rtl' ? "0" : "15px"};
    }
`;

const RepeatOptionsForm = (props) => {
    const {t, i18n} = useTranslation();
    let repeatOptions = [t("activityEditRepeat.repeatOptions.yearly"),
                    t("activityEditRepeat.repeatOptions.month"),
                    t("activityEditRepeat.repeatOptions.day")];

    const [selectWidth, setSelectWidth] = useState(78);
    const [selectEndWidth, setSelectEndWidth] = useState(49);
    const [selectWidthSmall, setSelectWidthSmall] = useState(48);
    const [selectWidthSmallMore, setSelectWidthSmallMore] = useState(28);
    const [repeatOption, setRepeatOption] = useState(repeatOptions[0]);

    const [size, setSize] = useState([window.outerWidth, window.innerHeight]);

    useLayoutEffect(()=>{
        function updateSize(){
            setSize([window.outerWidth, window.innerHeight]);
        }
        window.addEventListener('resize', updateSize);
        updateSize();
        return () => window.removeEventListener('resize', updateSize);
    },[]);

    useEffect(()=>{
        if(size[0] > 968){
            setSelectWidth(78);
            setSelectWidthSmall(48);
            setSelectWidthSmallMore(28);
            setSelectEndWidth(49);
        }else if(size[0] < 968 && size[0] >= 856){
            setSelectWidth(84);
            setSelectWidthSmall(49);
            setSelectWidthSmallMore(31);
            setSelectEndWidth(65);
        }else if(size[0] > 756){
            setSelectWidth(81);
            setSelectWidthSmall(49);
            setSelectWidthSmallMore(31);
            setSelectEndWidth(76);
        }else if(size[0] > 658){
            setSelectWidthSmallMore(24);
            setSelectEndWidth(55);
        }else if(size[0] < 568){
            setSelectWidth(100);
            setSelectEndWidth(88);
            setSelectWidthSmallMore(30);
        }

    },[size]);


    let monthOptions = [t("activityEditRepeat.month.jan"),
                        t("activityEditRepeat.month.feb"),
                        t("activityEditRepeat.month.march"),
                        t("activityEditRepeat.month.april"),
                        t("activityEditRepeat.month.may"),
                        t("activityEditRepeat.month.june"),
                        t("activityEditRepeat.month.july"),
                        t("activityEditRepeat.month.aug"),
                        t("activityEditRepeat.month.sept"),
                        t("activityEditRepeat.month.oct"),
                        t("activityEditRepeat.month.nov"),
                        t("activityEditRepeat.month.dec")];
    
    const [monthOption, setMonthOption] = useState(monthOptions[0]);

    let dateOptions = [];

    for(let i = 1; i <= 31; i++){
        dateOptions.push(i);
    }

    const [dateOption, setDateOption] = useState(dateOptions[0]);

    let stOptions = [t("activityEditRepeat.st.one"),
                    t("activityEditRepeat.st.two"),
                    t("activityEditRepeat.st.three"),
                    t("activityEditRepeat.st.four")];

    const [st, setSt] = useState(stOptions[0]);

    let daysOfWeek = [t("activityEditRepeat.daysOfWeek.monday"),
                    t("activityEditRepeat.daysOfWeek.tuesday"),
                    t("activityEditRepeat.daysOfWeek.wednesday"),
                    t("activityEditRepeat.daysOfWeek.thursday"),
                    t("activityEditRepeat.daysOfWeek.friday"),
                    t("activityEditRepeat.daysOfWeek.saturday"),
                    t("activityEditRepeat.daysOfWeek.sunday")];

    let everyOptions = [t("activityEditRepeat.everyOptions.never"), "opt2", "opt3"];

    const [everyOpt, setEveryOpt] = useState(everyOptions[0]);

    const [type, setType] = useState(1);

    

    return(
        <div className={classes.main}>
            <div className={classes.field}>
                <StyledTextBlock direction={props.direction} className={classes.text}>
                    <label>Repeat Every</label>
                </StyledTextBlock>
                <Field component={CustomSelect} name="repeat" options={repeatOptions} setFunction={setRepeatOption} width={selectWidth}/>
            </div>
            <div className={classes.field}>
                <StyledTextBlock className={classes.text} direction={props.direction}>
                    <div className={classes.visibilityBlock}>
                        <input type="radio" name="type" id="type1" defaultChecked={true} onChange={e=>{setType(e.target.value)}} value={1}/>
                        <label htmlFor={"type1"}>{t("activityEditRepeat.on")}</label>
                        <div className={classes.check}></div>
                    </div>
                </StyledTextBlock>
                <div className={classes.fieldContainer}>
                    <Field component={CustomSelect} name="month" options={monthOptions} setFunction={setMonthOption} width={selectWidthSmall}/>
                    <p>&nbsp;&nbsp;&nbsp;&nbsp;</p>
                    <Field component={CustomSelect} name="dateNum" options={dateOptions} setFunction={setDateOption} width={selectWidthSmall}/>
                </div>
            </div>
            <div className={classes.field}>
                <StyledTextBlock className={classes.text} direction={props.direction}>
                    <div className={classes.visibilityBlock}>
                        <input type="radio" name="type" id="type2" onChange={e=>{setType(e.target.value)}} value={2}/>
                        <label htmlFor={"type2"}>{t("activityEditRepeat.onThe")}</label>
                        <div className={classes.check}></div>
                    </div>
                </StyledTextBlock>
                <div className={classes.fieldContainer}>
                    <Field component={CustomSelect} name="st" options={stOptions} setFunction={setSt} width={selectWidthSmallMore}/>
                    <p>&nbsp;&nbsp;&nbsp;&nbsp;</p>
                    <Field component={CustomSelect} name="dateNum2" options={dateOptions} setFunction={setDateOption} width={selectWidthSmallMore}/>
                    <label className={classes.ofLabel}>{t("activityEditRepeat.of")}</label>
                    <Field component={CustomSelect} name="month" options={monthOptions} setFunction={setMonthOption} width={selectWidthSmallMore}/>
                </div>
            </div>
            <div className={classes.fieldDate}>
                <StyledTextBlock className={classes.text} direction={props.direction}>
                    <label>{t("activityEditRepeat.end")}</label>
                </StyledTextBlock>
                <div className={classes.fieldContainer}>
                    <Field component={CustomSelect} name="every" options={everyOptions} setFunction={setEveryOpt} width={selectEndWidth}/>
                    <p>&nbsp;&nbsp;&nbsp;&nbsp;</p>
                    <Field component={Calendar} name="date"/>
                </div>
                
            </div>
            <div className={classes.field}>
                <button>{t("activityEditRepeat.save")}</button>
            </div>
        </div>
    );
}

let RepeatOptionsReduxForm = reduxForm({form: 'repeatOptions'})(RepeatOptionsForm);

const RepeatOptions = (props) => {
    const onSubmit = (formData) => {
        console.log(formData);
    }
    return(
        <RepeatOptionsReduxForm onSubmit={onSubmit} direction={props.direction}/>
    )
}

let mapStateToProps = (state) => ({
    direction: state.common.direction
})

export default connect(mapStateToProps, {})(RepeatOptions);