import React from 'react';
import Preloader from '../../Common/Preloader/Preloader';
import NotificationsModal from './NotificationsModal';

const NotificationsModalContainer = (props) => {
    return(
        <>
            {props.isFetching && <Preloader/>}
            <NotificationsModal/>
        </>
    );
}

let mapStateToProps = (state) => ({
    isFetching: state.common.isFetching
});

export default connect (mapStateToProps, {})(NotificationsModalContainer);