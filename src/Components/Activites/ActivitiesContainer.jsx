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
        
    },[]);

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
                                blockWidth={blockWidth}/>}
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