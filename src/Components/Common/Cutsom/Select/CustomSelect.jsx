import React, { useEffect, useState } from 'react';
import classes from './CustomSelect.module.css';
import { connect } from 'react-redux';
import styled from 'styled-components';

const StyledSelect = styled.div`
    width: ${({ width }) => width + "%"};
`;

const CustomSelect = ({input, meta, ...props}) => {
    const [currentOption, setCurrentOption] = useState(props.disableDefValueOptionText ? props.disableDefValueOptionText : props.options[0]);
    const [isOpenDropdown, setIsOpenDropdown] = useState(false);

    useEffect(()=>{
        if(input){
            input.value = ""
        }
       
    },[]);

    let handleSelect = (option) => {
        setCurrentOption(option);
        if(input){
            input.onChange(option);
        }
        props.setFunction(option);
        setIsOpenDropdown(false);
    }

    let options = props.options.map((option, index) => {
        return <span key={index + "opt"} onClick={()=>{handleSelect(option)}} className={classes.option + " " + classes.detectClick} {...input}>{option}</span>
    });

    let hasError = null;

    if(props.disableDefValueOption){
        hasError = meta.touched && meta.error;
    }

    return(
            <StyledSelect className={classes.main + " " + (hasError && classes.error) + " " + classes.detectClick} width={props.width}>
                <input hidden type="checkout" value={isOpenDropdown} className={classes.detectClick}/>
                {/* <input {...input} {...props} value={321}/> */}
                <div className={classes.view + " " + classes.detectClick} onClick={()=>setIsOpenDropdown(!isOpenDropdown)}>
                    <span className={classes.detectClick}>{currentOption}</span>
                    <div className={classes.arrow + " " + (isOpenDropdown && classes.open) + " " + classes.detectClick}></div>
                </div>
                {isOpenDropdown && 
                <div className={classes.dropdown + " " + (isOpenDropdown && classes.openDropdown) + " " + classes.detectClick}>
                    {props.disableDefValueOption && <span className={classes.option + " " + classes.disabled + " " + classes.detectClick}>{props.disableDefValueOptionText}</span>}
                    {options}
                </div>}
                {props.disableDefValueOption && 
                    <>
                        {hasError && <span>{meta.error}</span>}
                    </>
                }
            </StyledSelect>  
    );
}

let mapStateToProps = (state) => ({
    direction: state.common.direction
});

export default connect(mapStateToProps, null)(CustomSelect);