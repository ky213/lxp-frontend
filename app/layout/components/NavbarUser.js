import React from 'react';
import { Link, useHistory  } from 'react-router-dom';
import PropTypes from 'prop-types';

import {
    NavItem,
    NavLink
} from '@/components';
import { authenticationService } from '@/services';
import { RoleDescription, Role } from '@/helpers';
import { useAppState, AppStateContext } from '@/components/AppState';
import { LOGOUT_USER } from '@/actions';
import InstituteLogoThemed from '@/components/InstituteLogoThemed';

const NavbarUser = (props) => {
    const [{currentUser, selectedInstitute}, dispatch] = useAppState();
    let history = useHistory();

    const handleLogoutClick = (e) => {
        e.preventDefault();
        if(confirm('Are you sure you want to logout the application?')) {
            console.log("Zovem logout sidebar click")
            dispatch({type: LOGOUT_USER});                          
            //authenticationService.logout();
            //return <Redirect to='/pages/login' />
            history.push('/pages/login');
        }

        return false;
    }
    
    return (
        <NavItem { ...props }>
            <NavLink tag={Link} to={'#'} onClick={handleLogoutClick}>
                
            </NavLink>
            
        </NavItem>
    )
}

NavbarUser.propTypes = {
    className: PropTypes.string,
    style: PropTypes.object
};

export  { NavbarUser };
