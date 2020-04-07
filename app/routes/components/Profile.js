import React from 'react';
import faker from 'faker/locale/en_US';

import { 
    Avatar,
    AvatarAddOn
} from '@/components';

import { randomArray, randomAvatar } from '@/utilities';

const Profile = ({selectedUser}) => { 

    return (
        <React.Fragment>
            <div className="d-flex justify-content-center my-3">
                <Avatar.Image
                    size="lg"
                    src={ selectedUser && selectedUser.profilePhoto || randomAvatar() }
                /> 
            </div>
            <div className="mb-4 text-center">
                <a className="h6 text-decoration-none" href="#">
                    { selectedUser && `${selectedUser.firstName} ${selectedUser.lastName}` }
                </a>
                <div className="text-center mt-2">
                    { selectedUser && selectedUser.roleDescription }
                </div>
                <div className="text-center">
                    <i className="fa fa-h-square mr-1"></i>
                    { selectedUser && selectedUser.instituteName }
                </div>
            </div>
        </React.Fragment>
    )
}

export { Profile };
