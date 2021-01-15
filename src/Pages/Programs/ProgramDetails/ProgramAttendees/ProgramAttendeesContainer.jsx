import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import ProgramAttendees from './ProgramAttendees';
import Preloader from '../../../Common/Preloader/Preloader';
import { ROLE_LEARNER, ROLE_MANAGER } from '../../../../Utils/constants';
import { Redirect } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { setCurrentProgram } from '../../../../Store/Reducers/programs';

const ProgramAttendeesContainer = (props) => {
    const [all, setAll] = useState(true);
    const [completed, setCompleted] = useState(true);
    const [inProgress, setInProgress] = useState(true);
    const [notStarted, setNotStarted] = useState(true);

    const [searchValue, setSearchValue] = useState("");

    const handleAll = () => {
        let newAll = !all;
        setAll(!all);
        if(newAll){
            setCompleted(true);
            setInProgress(true);
            setNotStarted(true);
            return;
        }else{
            setCompleted(false);
            setInProgress(false);
            setNotStarted(false);
        }
    } 

    useEffect(()=>{
        if(completed && inProgress && notStarted){
            setAll(true);
        }else{
            setAll(false)
        }
    },[completed, inProgress, notStarted]);

    useEffect(()=>{
        let programId = props.match.params.programId;
        props.programs.forEach(prog => {
            if(prog.programId === programId){
                props.setCurrentProgram(prog);
            }
        })
    },[]);



    return(
        <>
            {props.user.roleId != ROLE_MANAGER && <Redirect to="/"/>}
            {props.isFetching ? <Preloader/> :
            <ProgramAttendees direction={props.direction}
                            all={all} setAll={handleAll}
                            completed={completed} setCompleted={setCompleted}
                            inProgress={inProgress} setInProgress={setInProgress}
                            notStarted={notStarted} setNotStarted={setNotStarted}
                            setSearchValue={setSearchValue} searchValue={searchValue}
                            currentProgram={props.currentProgram}/>}
        </>
    );
}

let WithUrlDataContainerComponent = withRouter(ProgramAttendeesContainer);

let mapStateToProps = (state) => ({
    isFetching: state.common.isFetching,
    direction: state.common.direction,
    user: state.user.user,
    currentProgram: state.programs.currentProgram,
    programs: state.programs.programs
});

export default connect(mapStateToProps, {
    setCurrentProgram
})(WithUrlDataContainerComponent);