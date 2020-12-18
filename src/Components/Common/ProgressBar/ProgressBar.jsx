import React from 'react';
import styled from 'styled-components';

const StyledProgressBar = styled.div`
    width: ${({width}) => `${width}%;`}
    height: ${({height}) => height + 'px;'}
    background-color: rgba(102, 113, 171, 0.2);
    border-radius: 20px;
`;
const StyledProgress = styled.div`
    width: ${({progress}) => progress + '%;'}
    height: 100%;
    background-color: #6671ab;
    box-shadow: 0 2px 4px 0 rgba(102, 113, 171, 0.3);
    border-radius: 20px;
`;


const ProgressBar = (props) => {
    return(
        <StyledProgressBar width={props.width} height={props.height}>
            <StyledProgress progress={props.progress}/>
        </StyledProgressBar>
    );
}

export default ProgressBar;