import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Activities from './Activities';
import { getActivities } from '../../Redux/activitiesReducer';
import Preloader from '../Common/Preloader/Preloader';
import { useLayoutEffect } from 'react';

const ActivitiesContainer = (props) => {
    useEffect(()=>{
        if(props.user.employeeId){
            props.getActivities(props.user.employeeId, props.user.userId, props.user.organizationId);
        }  
    },[props.user.employeeId]);

    const [all, setAll] = useState(true);
    const [completed, setCompleted] = useState(true);
    const [inProgress, setInProgress] = useState(true);
    const [notStarted, setNotStarted] = useState(true);
    const [privateParam, setPrivateParam] = useState(true);

    const handleAll = () => {
        let newAll = !all;
        setAll(!all);
        if(newAll){
            setCompleted(true);
            setInProgress(true);
            setNotStarted(true);
            setPrivateParam(true);
            return;
        }else{
            setCompleted(false);
            setInProgress(false);
            setNotStarted(false);
            setPrivateParam(false);
        }
    } 

    useEffect(()=>{
        if(completed && inProgress && notStarted && privateParam){
            setAll(true);
        }else{
            setAll(false)
        }
    },[completed, inProgress, notStarted, privateParam]);


    const [size, setSize] = useState([window.outerWidth, window.innerHeight]);
    const [blockWidth, setBlockWidth] = useState(49);

    useLayoutEffect(()=>{
        function updateSize(){
            setSize([window.outerWidth, window.innerHeight]);
        }
        window.addEventListener('resize', updateSize);
        updateSize();
        return () => window.removeEventListener('resize', updateSize);
    },[]);

    useEffect(()=>{
        if(size[0] > 700){
            setBlockWidth(49);
        }else{
            setBlockWidth(100);
        }
    },[size]);


    return(
        <>
            {props.isFetching ? <Preloader/> :
            <>
                {props.isAuth && 
                    <Activities activities={props.activities}
                                direction={props.direction}
                                blockWidth={blockWidth}
                                all={all} setAll={handleAll}
                                completed={completed} setCompleted={setCompleted}
                                inProgress={inProgress} setInProgress={setInProgress}
                                notStarted={notStarted} setNotStarted={setNotStarted}
                                privateParam={privateParam} setPrivateParam={setPrivateParam}/>}
            </>}
        </>
    );
}

let mapStateToProps = (state) => ({
    isFetching: state.common.isFetching,
    user: state.user.user,
    activities: state.activities.activities,
    isAuth: state.user.isAuth,
    direction: state.common.direction
});

export default connect(mapStateToProps, {
    getActivities
})(ActivitiesContainer);