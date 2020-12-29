import React, { useEffect, useState } from 'react';
import classes from './CustomSelect.module.css';
import { connect } from 'react-redux';

const CustomSelect = (props) => {
    const [currentOption, setCurrentOption] = useState(props.options[0]);
    const [isOpenDropdown, setIsOpenDropdown] = useState(false);

    let handleSelect = (option) => {
        setCurrentOption(option);
        props.setFunction(option);
        setIsOpenDropdown(false);
    }

    let options = props.options.map(option => {
        return <span onClick={()=>{handleSelect(option)}} className={classes.option}>{option}</span>
    });

    return(
        <div className={classes.main}>
            <input hidden type="checkout" value={isOpenDropdown}/>
            <div className={classes.view} onClick={()=>setIsOpenDropdown(!isOpenDropdown)}>
                <span>{currentOption}</span>
                <div className={classes.arrow + " " + (isOpenDropdown && classes.open)}></div>
            </div>
            {isOpenDropdown && 
            <div className={classes.dropdown + " " + (isOpenDropdown && classes.openDropdown)}>
                {options}
            </div>}
        </div> 
    );
}

let mapStateToProps = (state) => ({
    direction: state.common.direction
});

export default connect(mapStateToProps, null)(CustomSelect);