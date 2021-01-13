import React from 'react';
import classes from './ActivityFile.module.css';
import pdficon from '../../../Assets/Images/pdficon.svg';
import styled from 'styled-components';
import { connect } from 'react-redux';


const StyledDiv = styled.div`
    margin-left: ${({ direction }) => direction === "ltr" ? "0" : "10px"};
    margin-right: ${({ direction }) => direction === "rtl" ? "0" : "10px"};
`;

const StyledBut = styled.button`
    left: ${({ direction }) => direction === "ltr" ? "10px" : "-10px"};
`;

const ActivityFile = (props) => {
    return(
        <StyledDiv className={classes.main} direction={props.direction}>
            <div className={classes.body}>
                <StyledBut direction={props.direction} onClick={()=>{props.handleRemoveFile(props.index)}}>&#x2715;</StyledBut>
                <img src={pdficon}/>
            </div>
            <span>{props.name}</span>
        </StyledDiv>
        
    );
}

let mapStateToProps = (state) => ({
    direction: state.common.direction
})

export default connect(mapStateToProps, {})(ActivityFile);