import React from 'react';
import styled from 'styled-components';
import HomeActivities from './Activities/HomeActivities';
import HomeCourses from './Courses/Courses';
import classes from './Home.module.css';
import Statistic from './Statistic/Statistic';

const StyledCoursesContainer = styled.div`
    @media screen and (max-width: 1279px){
        margin-left: ${({ direction }) => direction === "ltr" ? "50px" : "0"};
        margin-right: ${({ direction }) => direction === "rtl" ? "50px" : "0"};
    }
    @media screen and (max-width: 610px){
        margin-left: 0;
        margin-right: 0;
    }
`;

const StyledLeftSide = styled.div`
    padding-right: ${({ direction }) => direction === "ltr" ? "0" : "24px"};
`;


const Home = (props) => {
    return(
        <div className={classes.main}>
            <div className={classes.container}>
                <StyledLeftSide className={classes.leftSide} direction={props.direction}>
                    <div className={classes.containerLeft}>
                        <div className={classes.statistic}>
                            <Statistic user={props.user}/>
                        </div>
                        <StyledCoursesContainer direction={props.direction} className={classes.courses}>
                            <HomeCourses courses={props.courses}/>
                        </StyledCoursesContainer>
                    </div>
                </StyledLeftSide>
                <div className={classes.rightSide}>
                    <div className={classes.containerRight}>
                        <div className={classes.activities}>
                            <HomeActivities activities={props.activities}/>
                        </div>
                    </div>
                </div>
            </div>
            
            
            
        </div>
    );
}

export default Home;