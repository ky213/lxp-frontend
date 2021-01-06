import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Programs from './Programs';
import { getPrograms } from '../../Redux/programsReducer';
import Preloader from '../Common/Preloader/Preloader';


const ProgramsContainer = (props) => {
    useEffect(()=>{
        if(props.user.organizationId){
            props.getPrograms(props.user.organizationId, props.pageId, props.perPage);
        }
    },[]);

    return(
        <>
            {props.isFetching ? <Preloader/> :
            <Programs programs={props.programs} 
                    direction={props.direction}/>}
        </>
    );
}

let mapStateToProps = (state) => ({
    user: state.user.user,
    programs: state.programs.programs,
    isFetching: state.common.isFetching,
    direction: state.common.direction,
    pageId: state.programs.pageId,
    perPage: state.programs.perPage
});

export default connect(mapStateToProps, {
    getPrograms
})(ProgramsContainer);