import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import classes from './Message.module.css';

const StyledMessage = styled.p`
    background-color: ${({ itsMe }) => itsMe ? "#b3dbc9" : "#c2c6dd"};
    direction: ltr;
`;

const StyledArrow = styled.div`
    border-top: ${({ itsMe }) => itsMe ? "12px solid #b3dbc9" : "12px solid #c2c6dd"};
    transform: ${({ itsMe, direction }) => direction === "ltr" ? (itsMe ? "rotate(-90deg)" : "rotate(90deg)") : (itsMe ? "rotate(90deg)" : "rotate(-90deg)")};
`;

const StyledMain = styled.div`
    direction: ${({ itsMe, direction }) =>  direction === "ltr" ? (itsMe ? "rtl" : "ltr") : (itsMe ? "ltr" : "rtl")};
    align-self: ${({ itsMe }) => itsMe ? "flex-end" : "flex-start"};
`;

const StyledMessageBlock = styled.div`
    margin-left: ${({ itsMe, direction }) => direction === "ltr" ? (!itsMe ? "10px" : "0") : (!itsMe ? "0" : "10px")};
    margin-right: ${({ itsMe, direction }) => direction === "ltr" ? (itsMe ? "10px" : "0") : (itsMe ? "0" : "10px")};
`;

const Message = (props) => {
    const [userName, setUserName] = useState("");
    useEffect(()=>{
        let firstLetter = props.message.user.name ? props.message.user.name[0] : "";
        let secondLetter = props.message.user.surname ? props.message.user.surname[0] : "";
        setUserName(firstLetter+secondLetter);
    },[props.message.user]);

    return(
        <StyledMain className={classes.main} direction={props.direction} itsMe={props.message.itsMe}>
            {props.message.user.profilePhoto ?
            <img src={props.message.user.profilePhoto}/> : 
            <div className={classes.noPhoto}>
                <span>{userName}</span>
            </div>}
            <StyledMessageBlock className={classes.message} direction={props.direction} itsMe={props.message.itsMe}>
                <StyledArrow className={classes.arrow} direction={props.direction} itsMe={props.message.itsMe}/>
                <StyledMessage className={classes.text} direction={props.direction} itsMe={props.message.itsMe}>{props.message.text}</StyledMessage>
            </StyledMessageBlock>
            
        </StyledMain>
    );
}

let mapStateToProps = (state) => ({
    direction: state.common.direction
})

export default connect(mapStateToProps, {})(Message);