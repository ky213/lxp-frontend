import React, { useState } from 'react';
import CustomSelect from '../Cutsom/Select/CustomSelect';
import classes from './SearchModal.module.css';
import { searchicon } from '../../../Assets/Images/searchicon.js';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { setSearchValue } from '../../../Redux/commonReducer';

const StyledModal = styled.div`
    transform: ${({ direction }) => direction === "ltr" ? 'translateY(100px) translateX(-743px)' : 'translateY(100px) translateX(743px)' }; 
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

    const handleSearch = () => {
        props.setSearchValue(searchValue);
        props.setIsOpenSearchModal(false)
    }

    const [filterOneValue, setFilterOneValue] = useState(filerOne[0]);
    const [filterTwoValue, setFilterTwoValue] = useState(filerTwo[0]);
    const [filterThreeValue, setFilterThreeValue] = useState(filerThree[0]);

    return(
        <StyledModal className={classes.main} direction={props.direction}>
            <StyledArrow className={classes.arrow} direction={props.direction}>
                <div class={classes.innerArrow}></div>
            </StyledArrow>
            <div className={classes.body}>
                <div className={classes.searchField}>
                    <NavLink to={`/search?value=${searchValue}`} onClick={()=>{handleSearch()}}>
                        {searchicon}
                    </NavLink>
                    <input placeholder="Search..." name={"value"} onChange={(e)=>{setSearchValue(e.target.value)}}/>
                </div>
                <div className={classes.filters}>
                    <CustomSelect options={filerOne} setFunction={setFilterOneValue} width={32}/>
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