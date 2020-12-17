import React from 'react';
import { connect } from 'react-redux';
import Navbar from './Navbar';

const NavbarContainer = (props) => {
    return(
        <Navbar user={props.user}/>
    );
}

let mapStateToProps = (state) => ({
    user: state.user.user
});

export default connect(mapStateToProps, {})(NavbarContainer);