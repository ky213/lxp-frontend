import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import classes from './LessonFileCourse.module.css';

const StyledProgressBar = styled.div`
    width: ${({ width }) => width + "%"};
    height: 8px;
    background-color: #42a678;
    border-radius: 20px;
`;

const LessonFileCourse = (props) => {
    const [progress, setProgress] = useState(100);


    return(
        <div className={classes.main}>
            <span className={classes.name}>{props.file.name}</span>
            <div className={classes.progress}>
                <StyledProgressBar width={progress}/>
            </div>
            <span className={classes.progressCount}>{progress}%</span>
            <button onClick={()=>{props.handleRemoveFile(props.index)}}>
                <span>&#x2715;</span>
            </button>
        </div>
    );
}

export default LessonFileCourse;