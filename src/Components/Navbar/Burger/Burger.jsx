import React from 'react';
import styled from 'styled-components';
import { useState } from 'react';
import BurgerMenu from './BurgerMenu';

const StyledBurger = styled.div`
    width: 40px;
    height: 40px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    position: relative;
    z-index: 120;

    div{
        width: 100%;
        height: 5px;
        background-color: ${({ open }) => !open ? '#59bcab' : 'white'};
        transform-origin: 6px;
        border-radius: 10px;
        transition-duration: 0.3s;
        z-index: 100;

        &:nth-child(1){
            transform: ${({ open }) => open ? 'rotate(45deg)' : 'rotate(0)'};

        }
        &:nth-child(2){
            transform: ${({ open }) => open ? 'translateX(100%)' : 'translateX(0)'};
            opacity: ${({ open }) => open ? 0 : 1};
            display: ${({ open }) => open ? 'none' : 'block'}
        }
        &:nth-child(3){
            transform: ${({ open }) => open ? 'rotate(-45deg)' : 'rotate(0)'}
        }
    }
    @media screen and (max-width: 374px){
        &{
            width: 30px;
            height: 30px
        }
    }
`;


const Burger = ({changeLanguage, language, currentLanguage}) => {
    const [open, setOpen] = useState(false);
    return(
        <>  
            <StyledBurger open={open} onClick={() => setOpen(!open)}>
                <div />
                <div />
                <div />
            </StyledBurger>
            <BurgerMenu open={open} setOpen={setOpen} changeLanguage={changeLanguage} language={language} currentLanguage={currentLanguage}/>
        </>
    )
}

export default Burger;