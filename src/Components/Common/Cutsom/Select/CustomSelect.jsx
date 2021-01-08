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

    let handleSelect = (option) => {
        setCurrentOption(option);
        props.setFunction(option);
        setIsOpenDropdown(false);
    }

    let options = props.options.map(option => {
        return <span onClick={()=>{handleSelect(option)}} className={classes.option} {...input}>{option}</span>
    });

    let hasError = null;

    if(props.disableDefValueOption){
        hasError = meta.touched && meta.error;
    }
    

    return(
            <StyledSelect className={classes.main + " " + (hasError && classes.error)} width={props.width}>
                <input hidden type="checkout" value={isOpenDropdown}/>
                <div className={classes.view} onClick={()=>setIsOpenDropdown(!isOpenDropdown)}>
                    <span>{currentOption}</span>
                    <div className={classes.arrow + " " + (isOpenDropdown && classes.open)}></div>
                </div>
                {isOpenDropdown && 
                <div className={classes.dropdown + " " + (isOpenDropdown && classes.openDropdown)}>
                    {props.disableDefValueOption && <span className={classes.option + " " + classes.disabled}>{props.disableDefValueOptionText}</span>}
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