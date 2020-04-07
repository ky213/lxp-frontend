import React from 'react';
import { Link, withRouter } from 'react-router-dom';

import { 
    Sidebar,
    UncontrolledButtonDropdown,
    Avatar,
    AvatarAddOn,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from '@/components';
import { randomAvatar } from '@/utilities';
import { authenticationService } from '@/services';
import { RoleDescription, Role } from '@/helpers';
import { useAppState, AppStateContext } from '@/components/AppState';
import { LOGOUT_USER } from '@/actions';

//const currentUser = authenticationService.currentUserValue;

const SidebarTopA = (props) => {

    const [{currentUser, selectedInstitute}, dispatch] = useAppState();

    const firstName = currentUser && currentUser.user && currentUser && currentUser.user.firstName || '';
    const lastName = currentUser && currentUser.user && currentUser && currentUser.user.lastName ||'';
    const roleDescription = currentUser && currentUser.user && currentUser.user.role && RoleDescription[currentUser.user.role] || '';
    const avatarImg = currentUser && currentUser.user && currentUser.user.profilePhoto || randomAvatar();

    return (<React.Fragment>
        { /* START: Sidebar Default */ }
        <Sidebar.HideSlim>
            <Sidebar.Section className="pt-0">
                <Link to="/" className="d-block">
                    <Sidebar.HideSlim>
                        <Avatar.Image
                            size="lg"
                            src={ avatarImg }
                            
                        />
                    </Sidebar.HideSlim>
                </Link>
                
                

                <div className="sidebar__link">
                    { `${firstName} ${lastName}` }
                </div>

                <div className="small sidebar__link--muted">
                    {roleDescription}
                </div>
               {selectedInstitute && 
                    <div className="small sidebar__link">
                        {selectedInstitute.name}
                    </div>
               }

             
                
            </Sidebar.Section>
        </Sidebar.HideSlim>
        { /* END: Sidebar Default */ }

        { /* START: Sidebar Slim */ }
        <Sidebar.ShowSlim>
            <Sidebar.Section>
                <Avatar.Image
                    size="sm"
                    src={ avatarImg }
                    addOns={[
                        <AvatarAddOn.Icon 
                            className="fa fa-circle"
                            color="white"
                            key="avatar-icon-bg"
                        />,
                        <AvatarAddOn.Icon 
                            className="fa fa-circle"
                            color="success"
                            key="avatar-icon-fg"
                        />
                    ]}
                />
            </Sidebar.Section>
        </Sidebar.ShowSlim>
        { /* END: Sidebar Slim */ }
    </React.Fragment>
);

}

export default withRouter(SidebarTopA);
