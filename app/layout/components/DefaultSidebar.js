import React from 'react';
import { Link } from 'react-router-dom';

import {
    Sidebar,
    SidebarTrigger,
} from './../../components';

import { SidebarMiddleNav } from './SidebarMiddleNav';

import SidebarTopA from '@/routes/components/Sidebar/SidebarTopA'
import { SidebarBottomA } from '../../routes/components/Sidebar/SidebarBottomA'
import { LogoThemed } from '../../routes/components/LogoThemed/LogoThemed';
import {
    Responsive,
    isMobileDevice, 
    isTabletDevice,
    isLaptopDevice,
    isBiggerThanLaptop
  } from "responsive-react";

export const DefaultSidebar = () => (
    <Sidebar>
        { /* START SIDEBAR-OVERLAY: Close (x) */ }
        <Sidebar.Close>
            <SidebarTrigger tag={ 'a' } href="javascript:;">
                <div className="close"></div>
            </SidebarTrigger>
        </Sidebar.Close>
        { /* START SIDEBAR-OVERLAY: Close (x) */ }
        
        { /* START SIDEBAR: Only for Desktop */ }
        <Sidebar.HideSlim>
            <Sidebar.Section>
            <Responsive displayIn={["laptop"]}>
                <Link to="/" className="sidebar__brand d-flex mb-4">
                    <LogoThemed checkBackground fill="#F4F5F7" />
                    
                </Link>
                </Responsive>
            </Sidebar.Section>
        </Sidebar.HideSlim>
        { /* END SIDEBAR: Only for Desktop */ }

        { /* START SIDEBAR: Only for Mobile */ }
        <Sidebar.MobileFluid>
            <SidebarTopA />
            
            <Sidebar.Section fluid cover>
                { /* SIDEBAR: Menu */ }
                <SidebarMiddleNav />
            </Sidebar.Section>

            <SidebarBottomA />
        </Sidebar.MobileFluid>
        { /* END SIDEBAR: Only for Mobile */ }
    </Sidebar>
);
