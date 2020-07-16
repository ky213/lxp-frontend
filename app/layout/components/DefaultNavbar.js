import React from 'react';
import { Link, useHistory } from 'react-router-dom';

import {
    Navbar,
    Nav,
    NavItem,
    SidebarTrigger
} from '@/components';

import { NavbarActivityFeed } from './NavbarActivityFeed';
import { NavbarUser } from './NavbarUser';
import { LogoThemed } from '@/routes/components/LogoThemed/LogoThemed';
import LearnLogo from '@/components/LearnLogo';
import { authenticationService } from '@/services';
import { history} from '@/helpers';
import Announcement from '@/components/Announcement';
import OrganizationLogoThemed from '@/components/OrganizationLogoThemed';

import {
    Responsive,
    isMobileDevice, 
    isTabletDevice,
    isLaptopDevice,
    isBiggerThanLaptop
  } from "responsive-react";

export const DefaultNavbar = () => {
    let history = useHistory();
    const currentPathName = history && history.location && history.location.pathname && history.location.pathname.replace("/", "").replace("-"," ") || "";
    const defaultFill = currentPathName == "activities" && "#F4F4F4" || "#0C6CF3";

    return (
        <>
        <Navbar light expand="xs" fluid>
            <Nav navbar>
               
                <NavItem className="mr-2 navbar__sidebar-trigger">
                    <SidebarTrigger/>
                </NavItem>
             
                <NavItem className="navbar-brand d-lg-none">
                    <Link to="/">
                        <LearnLogo style={{height:'25px'}} fill={defaultFill} />
                    </Link>
                </NavItem>
                <NavItem className="d-none d-md-block">
                    <span className="navbar-text">
                        <Link to="/">
                            <i className="fa fa-home"></i>
                        </Link>
                    </span>
                    <span className="navbar-text px-2">
                        <i className="fa fa-angle-right"></i>
                    </span>
                    <span className="navbar-text">
                        <Link to={history && history.location && history.location.pathname} style={{textTransform:'capitalize'}}>
                            {currentPathName}
                        </Link>
                    </span>
                    {/* 
                    <span className="navbar-text px-2">
                        <i className="fa fa-angle-right"></i>
                    </span>
                    <span className="navbar-text">
                        Page Link
                    </span>*/}
                </NavItem>
            </Nav>
            <Nav navbar className="ml-auto">
                <NavbarActivityFeed />
                {/*<NavbarMessages className="ml-2" />*/}
                <OrganizationLogoThemed marginRight="0px" marginLeft="10px" />
                
            </Nav>
        </Navbar>
        <Announcement/>
        </>
    )
    }
