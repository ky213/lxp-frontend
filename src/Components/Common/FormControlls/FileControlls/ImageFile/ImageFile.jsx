import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import classes from './ImageFile.module.css';

const StyledBut = styled.button`
    left: ${({ direction }) => direction === "ltr" ? "10px" : "-10px"};
`;

const ImageFileProgram = (props) => {
    return(
        <div className={classes.main}>
            <StyledBut direction={props.direction} onClick={()=>{props.handleRemoveFile(props.index)}}>&#x2715;</StyledBut>
            <img src={window.URL.createObjectURL(props.image)}/>
        </div>
    );
}

let mapStateToProps = (state) => ({
    direction: state.common.direction
})

export default connect(mapStateToProps, {})(ImageFileProgram);