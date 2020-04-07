import React from 'react';
import { NavLink as RouterNavLink } from "react-router-dom";
import {
  Nav,
  NavItem,
  NavLink
} from "@/components";

const UserProfileNav = ({selectedTab, setSelectedTab}) => {

  return (
  <Nav pills vertical>
    <NavItem>
      <NavLink onClick={() => setSelectedTab('profileDetails')} className={(!selectedTab || selectedTab == 'profileDetails' ? 'active' : '')} href="#">
        Profile details
      </NavLink>
    </NavItem>
    <NavItem>
      <NavLink onClick={() => setSelectedTab('accountDetails')} className={(selectedTab == 'accountDetails' ? 'active' : '')} href="#">
        Account details
      </NavLink>
    </NavItem>
  </Nav>);
}

export default UserProfileNav;