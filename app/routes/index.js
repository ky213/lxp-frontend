import React from 'react';
import {
    Route,
    Switch,
    Redirect
} from 'react-router';

// ----------- Pages Imports ---------------
import UserProfile from './UserProfile';
import Widgets from './Widgets';
import AdminResidents from './AdminResidents';
import ImportResidentsFromCsv from './AdminResidents/ImportResidentsFromCsv';

import AdminFm from './AdminFm';
import ImportFmFromCsv from './AdminFm/ImportFmFromCsv';
import AdminUserRoles from './AdminUserRoles';
import AdminSuperAdmins from './AdminSuperAdmins';

import Announcements from './Announcements';
import AdminAnnouncements from './AdminAnnouncements';

import AdminCourses from './AdminCourses';

// import UserEdit from './AdminInstitute/UserEdit';
// import AddNewUser from './AdminInstitute/AddNewUser';

import ListInstitutes from './Institute/ListInstitutes';
import InstituteSettings from './Institute/InstituteSettings';

import Analytics from './Dashboards/Analytics';
import ProjectsDashboard from './Dashboards/Projects';
import System from './Dashboards/System';
import Monitor from './Dashboards/Monitor'; 
import Financial from './Dashboards/Financial';
import Stock from './Dashboards/Stock';
import Reports from './Dashboards/Reports';

import Cards from './Cards/Cards';
import CardsHeaders from './Cards/CardsHeaders';

import NavbarOnly from './Layouts/NavbarOnly';
import SidebarDefault from './Layouts/SidebarDefault';
import SidebarA from './Layouts/SidebarA';
import DragAndDropLayout from './Layouts/DragAndDropLayout';
import SidebarWithNavbar from './Layouts/SidebarWithNavbar';

import Accordions from './Interface/Accordions';
import Alerts from './Interface/Alerts';
import Avatars from './Interface/Avatars';
import BadgesLabels from './Interface/BadgesLabels';
import Breadcrumbs from './Interface/Breadcrumbs';
import Buttons from './Interface/Buttons';
import Colors from './Interface/Colors';
import Dropdowns from './Interface/Dropdowns';
import Images from './Interface/Images';
import ListGroups from './Interface/ListGroups';
import MediaObjects from './Interface/MediaObjects';
import Modals from './Interface/Modals';
import Navbars from './Interface/Navbars';
import Paginations from './Interface/Paginations';
import ProgressBars from './Interface/ProgressBars';
import TabsPills from './Interface/TabsPills';
import TooltipPopovers from './Interface/TooltipsPopovers';
import Typography from './Interface/Typography';
import CropImage from './Interface/CropImage';
import DragAndDropElements from './Interface/DragAndDropElements';
import Calendar from './Calendar';
import ReCharts from './Graphs/ReCharts';
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
import Timeline from './Pages/Timeline';

// ----------- Layout Imports ---------------
import { DefaultNavbar } from './../layout/components/DefaultNavbar';
import { DefaultSidebar } from './../layout/components/DefaultSidebar';

import { SidebarANavbar } from './../layout/components/SidebarANavbar';
import { SidebarASidebar } from './../layout/components/SidebarASidebar';

import { history, Role } from '@/helpers';
import { PrivateRoute } from '@/components/PrivateRoute';
import Institute from './Institute';

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
    const [{currentUser, selectedInstitute}, dispatch] = useAppState();
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
          roles={[Role.Admin, Role.SuperAdmin, Role.InstituteManager]}
          exact
          component={AdminResidents}
        />

        <PrivateRoute
          path="/residents"
          roles={[Role.InstituteManager, Role.ProgramDirector]}
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
          roles={[Role.Admin, Role.SuperAdmin, Role.InstituteManager]}
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
          roles={[Role.Admin, Role.SuperAdmin, Role.InstituteManager]}
          exact
          component={AdminUserRoles}
        />
        
        <PrivateRoute
          path="/admin/institute"
          roles={[Role.Admin, Role.InstituteManager, Role.SuperAdmin]}
          exact
          component={Institute}
        />
        <PrivateRoute
          path="/programs"
          roles={[Role.Admin, Role.SuperAdmin, Role.InstituteManager]}
          exact
          component={Programs}
        />
        <PrivateRoute
          path="/program-settings"
          roles={[
            Role.Admin,
            Role.SuperAdmin,
            Role.InstituteManager,
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
            Role.InstituteManager,
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
            Role.InstituteManager,
            Role.ProgramDirector
          ]}
          exact
          component={AdminCourses}
        />

        <PrivateRoute
          path="/admin/announcements"
          roles={[Role.Admin, Role.InstituteManager, Role.SuperAdmin, Role.ProgramDirector]}
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

        <PrivateRoute path="/calendar" exact component={Calendar} />
        <PrivateRoute path="/activities" exact component={ActivityCalendar} />

        <PrivateRoute
          path="/activity-types"
          roles={[
            Role.Admin,
            Role.SuperAdmin,
            Role.InstituteManager,
            Role.ProgramDirector
          ]}
          exact
          component={ActivityTypes}
        />

        {/*    Pages Routes    */}
        <Route component={ComingSoon} path="/pages/coming-soon" />
        <Route component={Confirmation} path="/pages/confirmation" />
        <Route component={Danger} path="/pages/danger" />
        <Route component={Error404} path="/pages/error-404" />
        <Route component={ForgotPassword} path="/pages/forgot-password" />
        <Route component={LockScreen} path="/pages/lock-screen" />
        <Route component={Login} path="/pages/login" />
        <Route component={Register} path="/pages/register" />
        <Route component={Success} path="/pages/success" />
        <Route component={Timeline} path="/pages/timeline" />

        {/*    404    */}
        <Redirect to="/pages/error-404" />
      </Switch>
    );
};

//------ Custom Layout Parts --------
export const RoutedNavbars  = () => (
    <Switch>
        { /* Other Navbars: */}
        <Route
            component={ SidebarANavbar }
            path="/layouts/sidebar-a"
        />
        <Route
            component={ NavbarOnly.Navbar }
            path="/layouts/navbar"
        />
        <Route
            component={ SidebarWithNavbar.Navbar }
            path="/layouts/sidebar-with-navbar"
        />
        { /* Default Navbar: */}
        <Route
            component={ DefaultNavbar }
        />
    </Switch>  
);

export const RoutedSidebars = () => (
    <Switch>
        { /* Other Sidebars: */}
        <Route
            component={ SidebarASidebar }
            path="/layouts/sidebar-a"
        />
        <Route
            component={ SidebarWithNavbar.Sidebar }
            path="/layouts/sidebar-with-navbar"
        />
        { /* Default Sidebar: */}
        <Route
            component={ DefaultSidebar }
        />
    </Switch>
);
