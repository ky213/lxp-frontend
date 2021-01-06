import React from 'react';
import { connect } from 'react-redux';
import Lessons from './Lessons';

const LessonsContainer = (props) => {

    return(
        <>
            <Lessons/>
        </>
    );
}



let mapStateToProps = (state) => ({
    isFetching: state.common.isFetching
});

export default connect(mapStateToProps, {})(LessonsContainer);