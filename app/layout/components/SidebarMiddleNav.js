import React from "react";
import { SidebarMenu } from "@/components";
import { Role } from "@/helpers";
import { useAppState } from "@/components/AppState";
import { authenticationService } from '@/services';
import { LOGOUT_USER } from '@/actions';
import { useHistory  } from 'react-router-dom';

export const SidebarMiddleNav = navbarProps => {
  const [{ currentUser, selectedInstitute }, dispatch] = useAppState();
  const loggedInUser = (currentUser && currentUser.user) || null;
  const history = useHistory();

  return (
    <SidebarMenu>
      <SidebarMenu.Item
        icon={<i className="fa fa-fw fa-home"></i>}
        title="Home"
        to="/home"
      />

      <SidebarMenu.Item
        icon={<i className="fa fa-fw fa-user-secret"></i>}
        title="My Profile"
        to="/user/profile"
      />

      <SidebarMenu.Item
        icon={<i className="fa fa-fw fa-bullhorn"></i>}
        title="My Announcements"
        to="/announcements"
      />

      <SidebarMenu.Item
        icon={<i className="fa fa-fw fa-user-secret"></i>}
        title="Super admins"
        to="/admin/superadmin"
      />

      <SidebarMenu.Item
        roles={[Role.Admin, Role.SuperAdmin, Role.InstituteManager]}
        icon={<i className="fa fa-fw fa-h-square"></i>}
        title="Institute"
        to="/admin/institute"
        exact
      />

      <SidebarMenu.Item
        roles={[Role.Admin, Role.SuperAdmin, Role.InstituteManager]}
        icon={<i className="fa fa-fw fa-medkit"></i>}
        title="Programs"
        to="/programs"
      />
      <SidebarMenu.Item
        roles={[
          Role.Admin,
          Role.SuperAdmin,
          Role.InstituteManager,
          Role.ProgramDirector
        ]}
        icon={<i className="fa fa-fw fa-cog"></i>}
        title="Program Settings"
        to="/program-settings"
      />

      <SidebarMenu.Item
        roles={[Role.SuperAdmin, Role.Admin, Role.InstituteManager]}
        icon={<i className="fa fa-fw fa-user-md"></i>}
        title="Users"
        // to="/admin/users"
      >
        <SidebarMenu.Item
          title="Faculty members"
          to="/admin/users/facultymembers"
        />
        <SidebarMenu.Item title="Residents" to="/admin/users/residents" />
        <SidebarMenu.Item title="User roles" to="/admin/users/roles" />
      </SidebarMenu.Item>

      <SidebarMenu.Item
        roles={[Role.ProgramDirector]}
        icon={<i className="fa fa-fw fa-users"></i>}
        title="Learners"
        to="/residents"
        exact
      />

      <SidebarMenu.Item
        roles={[Role.Admin, Role.SuperAdmin, Role.InstituteManager]}
        icon={<i className="fa fa-fw fa-calendar-plus-o"></i>}
        title="Academic Years"
        to="/academic-years"
      />

      <SidebarMenu.Item
        roles={[Role.Admin, Role.SuperAdmin, Role.InstituteManager]}
        icon={<i className="fa fa-fw fa-calendar-plus-o"></i>}
        title="Upload Courses"
        to="/admin/courses"
      />



      <SidebarMenu.Item
        icon={<i className="fa fa-fw fa-calendar"></i>}
        title="Courses"
        to="/courses"
      />

      <SidebarMenu.Item
        roles={[Role.Admin, Role.SuperAdmin, Role.InstituteManager, Role.ProgramDirector]}
        icon={<i className="fa fa-fw fa-calendar-plus-o"></i>}
        title="Learner Reporting"
        to="/reporting"
      />
      
      <SidebarMenu.Item
          roles={[
            Role.Admin,
            Role.SuperAdmin,
            Role.InstituteManager,
            Role.ProgramDirector
          ]}
          icon={<i className="fa fa-fw fa-tasks"></i>}
          title="Activity Types"
          to="/activity-types"
        />
        
      <SidebarMenu.Item
        icon={<i className="fa fa-fw fa-calendar"></i>}
        title="Activities"
        to="/activities"
      />

      <SidebarMenu.Item
        roles={[
          Role.Admin,
          Role.SuperAdmin,
          Role.InstituteManager,
          Role.ProgramDirector
        ]}
        icon={<i className="fa fa-fw fa-bullhorn"></i>}
        title="Announcements"
        to="/admin/announcements"
      />

      <SidebarMenu.Item
        icon={<i className="fa fa-fw fa-bell-o"></i>}
        title="Notifications"
        to="/notifications"
      />



      <SidebarMenu.Item
        icon={<i className="fa fa-fw fa-power-off sign-out"></i>}
        className="sign-out"
        title="Sign Out"
        onClick={() => {
          console.log("Click na sign out");
          //ev.preventDefault();
          if(confirm('Are you sure you want to logout the application?')) {
              //console.log("Zovem logout sidebar click")
              dispatch({type: LOGOUT_USER});                          
              authenticationService.logout();
              //return <Redirect to='/pages/login' />
              history.push('/pages/login');
          }
        }}
      />


    </SidebarMenu>
  );
};
