import React, { useEffect, useRef, useState } from 'react';
import CustomSelect from '../Cutsom/Select/CustomSelect';
import classes from './SearchModal.module.css';
import { searchicon } from '../../../Assets/Images/searchicon.js';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { setSearchValue } from '../../../Store/Reducers/common';

const StyledModal = styled.div`
    transform: ${({ direction }) => direction === "ltr" ? 'translateY(100px) translateX(-647px)' : 'translateY(100px) translateX(647px)' }; 
    @media screen and (max-width: 1000px){
        width: 620px;
        transform: ${({ direction }) => direction === "ltr" ? 'translateY(100px) translateX(-543px)' : 'translateY(100px) translateX(543px)' }; 
    }
    @media screen and (max-width: 822px){
        width: 520px;
        transform: ${({ direction }) => direction === "ltr" ? 'translateY(100px) translateX(-443px)' : 'translateY(100px) translateX(443px)' }; 
    }
    @media screen and (max-width: 693px){
        width: 420px;
        transform: ${({ direction }) => direction === "ltr" ? 'translateY(160px) translateX(-343px)' : 'translateY(160px) translateX(343px)' }; 
    }
`;

const StyledArrow = styled.div`
    left: ${({ direction }) => direction === "ltr" ? "-50px" : "50px"};
    
    & div{
        left: ${({ direction }) => direction === "ltr" ? "-4.5px" : "3.5px"};
    }
`;

const SearchModal = (props) => {
    const [searchValue, setSearchValue] = useState('');

    let filerOne = ['Search everything', 'option1', 'option2'];
    let filerTwo = ['By anyone', 'option1', 'option2'];
    let filerThree = ['In all segments', 'option1', 'option2'];

    const linkRef = useRef(null);

    const handleSearch = () => {
        props.setSearchValue(searchValue);
        props.setIsOpenSearchModal(false)
    }

    useEffect(()=>{
        linkRef.current.querySelector('svg').classList.add('detectClick')
        window.addEventListener("mousedown",(event) => {
            if(event.target.classList.value.includes("detectClick")){
                return
            }
            props.setIsOpenSearchModal(false)
        })
    },[]);

    const [filterOneValue, setFilterOneValue] = useState(filerOne[0]);
    const [filterTwoValue, setFilterTwoValue] = useState(filerTwo[0]);
    const [filterThreeValue, setFilterThreeValue] = useState(filerThree[0]);

    return(
        <StyledModal className={classes.main + " " + classes.detectClick} direction={props.direction} direction={props.direction}>
            <StyledArrow className={classes.arrow + " " + classes.detectClick} direction={props.direction} direction={props.direction}>
                <div class={classes.innerArrow + " " + classes.detectClick} direction={props.direction}></div>
            </StyledArrow>
            <div className={classes.body + " " + classes.detectClick} direction={props.direction}>
                <div className={classes.searchField + " " + classes.detectClick} direction={props.direction}>
                    <NavLink ref={linkRef} to={`/search?value=${searchValue}`} className={classes.detectClick} onClick={()=>{handleSearch()}}>
                        {searchicon}
                    </NavLink>
                    <input placeholder="Search..." name={"value"} className={classes.detectClick} onChange={(e)=>{setSearchValue(e.target.value)}}/>
                </div>
                <div className={classes.filters  + " " + classes.detectClick} direction={props.direction}>
                    <CustomSelect options={filerOne} setFunction={setFilterOneValue} width={32} />
                    <CustomSelect options={filerTwo} setFunction={setFilterTwoValue} width={32}/>
                    <CustomSelect options={filerThree} setFunction={setFilterThreeValue} width={32}/>
                </div>
            </div>
        </StyledModal>
    );
}

let mapStateToProps = (state) => ({
    direction: state.common.direction,
    searchValue: state.common.searchValue
});

export default connect(mapStateToProps, {
    setSearchValue
})(SearchModal);