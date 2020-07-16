import React from 'react';
import {
    Route,
    Switch,
    Redirect
} from 'react-router';

// ----------- Pages Imports ---------------
import UserProfile from './UserProfile';
import AdminResidents from './AdminResidents';
import ImportResidentsFromCsv from './AdminResidents/ImportResidentsFromCsv';
import AdminFm from './AdminFm';
import ImportFmFromCsv from './AdminFm/ImportFmFromCsv';
import AdminUserRoles from './AdminUserRoles';
import AdminSuperAdmins from './AdminSuperAdmins';
import Announcements from './Announcements';
import AdminAnnouncements from './AdminAnnouncements';
import AdminCourses from './AdminCourses';
import ListOrganizations from './Organization/ListOrganizations';
import OrganizationSettings from './Organization/OrganizationSettings';


import Cards from './Cards/Cards';


import ActivityCalendar from './Activities';



import ComingSoon from './Pages/ComingSoon';
import Confirmation from './Pages/Confirmation';
import Danger from './Pages/Danger';
import Error404 from './Pages/Error404';
import ForgotPassword from './Pages/ForgotPassword';
import LockScreen from './Pages/LockScreen';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Success from './Pages/Success';


// ----------- Layout Imports ---------------
import { DefaultNavbar } from './../layout/components/DefaultNavbar';
import { DefaultSidebar } from './../layout/components/DefaultSidebar';

import { history, Role } from '@/helpers';
import { PrivateRoute } from '@/components/PrivateRoute';
import Organization from './Organization';

import Programs from './Programs';
import ProgramSettings from './ProgramSettings';
import AcademicYears from './AcademicYears';
import ResidentHome from './ResidentHome';
import FacultyMemberHome from './FacultyMemberHome';
import SuperAdminHome from './SuperAdminHome';
import Notifications from './Notifications';
import Courses from './Courses';
import ActivityTypes from './ActivityTypes';
import Reporting from './Reporting';

import { useAppState, AppStateContext } from '@/components/AppState';

//------ Route Definitions --------
// eslint-disable-next-line no-unused-vars
export const RoutedContent = (props) => {
    const [{currentUser, selectedOrganization}, dispatch] = useAppState();
    const user = currentUser && currentUser.user;

    return (
      <Switch>
        <Redirect from="/" to="/home" exact />

        <PrivateRoute
          path="/home"
          exact
          component={
            user && (
              user.role == Role.SuperAdmin && SuperAdminHome || 
              (user.role != Role.Resident && user.role != Role.SuperAdmin) && FacultyMemberHome 
 
            ) || ResidentHome 
          }
        />
        <PrivateRoute path="/user/profile" exact component={UserProfile} />

        <PrivateRoute
          path="/announcements"
          exact
          component={Announcements}
        />

        <PrivateRoute
          path="/admin/users/residents"
          roles={[Role.Admin, Role.SuperAdmin, Role.OrganizationManager]}
          exact
          component={AdminResidents}
        />

        <PrivateRoute
          path="/residents"
          roles={[Role.OrganizationManager, Role.ProgramDirector]}
          exact
          component={AdminResidents}
        />

        <PrivateRoute
          path="/admin/users/csv/residents"
          exact
          component={ImportResidentsFromCsv}
        />

        <PrivateRoute
          path="/admin/users/facultymembers"
          roles={[Role.Admin, Role.SuperAdmin, Role.OrganizationManager]}
          exact
          component={AdminFm}
        />
        
        <PrivateRoute
          path="/admin/users/csv/facultymembers"
          exact
          component={ImportFmFromCsv}
        />

        <PrivateRoute
          path="/admin/superadmin"
          exact
          component={AdminSuperAdmins}
        />
        
        <PrivateRoute
          path="/admin/users/roles"
          roles={[Role.Admin, Role.SuperAdmin, Role.OrganizationManager]}
          exact
          component={AdminUserRoles}
        />
        
        <PrivateRoute
          path="/admin/organization"
          roles={[Role.Admin, Role.OrganizationManager, Role.SuperAdmin]}
          exact
          component={Organization}
        />
        <PrivateRoute
          path="/programs"
          roles={[Role.Admin, Role.SuperAdmin, Role.OrganizationManager]}
          exact
          component={Programs}
        />
        <PrivateRoute
          path="/program-settings"
          roles={[
            Role.Admin,
            Role.SuperAdmin,
            Role.OrganizationManager,
            Role.ProgramDirector
          ]}
          exact
          component={ProgramSettings}
        />

        <PrivateRoute
          path="/academic-years"
          roles={[
            Role.Admin,
            Role.SuperAdmin,
            Role.OrganizationManager,
            Role.ProgramDirector
          ]}
          exact
          component={AcademicYears}
        />

        <PrivateRoute
          path="/admin/courses"
          roles={[
            Role.Admin,
            Role.SuperAdmin,
            Role.OrganizationManager,
            Role.ProgramDirector
          ]}
          exact
          component={AdminCourses}
        />

        <PrivateRoute
          path="/admin/announcements"
          roles={[Role.Admin, Role.OrganizationManager, Role.SuperAdmin, Role.ProgramDirector]}
          exact
          component={AdminAnnouncements}
        />

        <PrivateRoute
          path="/notifications"
          exact
          component={Notifications}
        />

        <PrivateRoute
          path="/courses"
          exact
          component={Courses}
        />

        <PrivateRoute
          path="/reporting"
          exact
          component={Reporting}
        />

        <PrivateRoute path="/activities" exact component={ActivityCalendar} />

        <PrivateRoute
          path="/activity-types"
          roles={[
            Role.Admin,
            Role.SuperAdmin,
            Role.OrganizationManager,
            Role.ProgramDirector
          ]}
          exact
          component={ActivityTypes}
        />

        {/*    Pages Routes    */}
        <Route component={Confirmation} path="/pages/confirmation" />
        <Route component={Danger} path="/pages/danger" />
        <Route component={Error404} path="/pages/error-404" />
        <Route component={ForgotPassword} path="/pages/forgot-password" />
        <Route component={Login} path="/pages/login" />
        <Route component={Register} path="/pages/register" />
        <Route component={Success} path="/pages/success" />
 

        {/*    404    */}
        <Redirect to="/pages/error-404" />
      </Switch>
    );
};

//------ Custom Layout Parts --------
export const RoutedNavbars  = () => (
    <Switch>
        { /* Default Navbar: */}
        <Route
            component={ DefaultNavbar }
        />
    </Switch>  
);

export const RoutedSidebars = () => (
    <Switch>
        { /* Default Sidebar: */}
        <Route
            component={ DefaultSidebar }
        />
    </Switch>
);
