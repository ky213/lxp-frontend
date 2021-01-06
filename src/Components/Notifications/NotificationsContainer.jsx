import React from 'react';
import { connect } from 'react-redux';
import Preloader from '../Common/Preloader/Preloader';
import Notifications from './Notifications';

const NotificationsContainer = (props) => {
    return(
        <>
            {props.isFetching ? <Preloader/> :
            <Notifications/>}
        </>
    )
}

let mapStateToProps = (state) => ({
    isFetching: state.common.isFetching
});

export default connect(mapStateToProps, {

})(NotificationsContainer);