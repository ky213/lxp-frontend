import React, { useEffect, useState } from 'react';
import classes from './Filter.module.css';
import { connect } from 'react-redux';
import styled from 'styled-components';

const StyledSelect = styled.div`

`;

const Filter = (props) => {

    const [isOpenDropdown, setIsOpenDropdown] = useState(false);

    return(
        <StyledSelect className={classes.main} width={props.width}>
            <input hidden type="checkout" value={isOpenDropdown}/>
            <div className={classes.view} onClick={()=>setIsOpenDropdown(!isOpenDropdown)}>
                <span> Filter </span>
                <div className={classes.arrow + " " + (isOpenDropdown && classes.open)}></div>
            </div>
            {isOpenDropdown && 
            <div className={classes.dropdown + " " + (isOpenDropdown && classes.openDropdown)}>
                <span>
                    Filtered by
                </span>
                <div>
                    <input type="checkbox"/>
                    <span className={classes.option}> Courses </span>    
                </div> 
                <div>
                    <input type="checkbox"/>
                    <span className={classes.option}> Activities </span>    
                </div> 
            </div>}
        </StyledSelect> 
    );
}

let mapStateToProps = (state) => ({
    direction: state.common.direction
});

export default connect(mapStateToProps, null)(Filter);