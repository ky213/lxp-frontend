import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { ThemeConsumer } from '@/components/Theme';
import styled from "styled-components";
import { useAppState } from '@/components/AppState';
import { Role } from '@/helpers';
import LearnLogo from '@/components/LearnLogo';
import {
    Responsive,
    isMobileDevice, 
    isTabletDevice,
    isLaptopDevice,
    isBiggerThanLaptop
  } from "responsive-react";

const OrganizationLogo = styled.div`
  width:30px;
  height:30px;
  border-radius: 50%;
  overflow: hidden;
  color:${props => props.color || '#fff'};
  background-image: url(${props => props.src || '' });
  background-size: cover;
  background-position: center center;
  border:3px solid ${props => props.backgroundColor || '#fff'};
  margin-right:10px;
`;

const OrganizationLogoGenerated = styled.div`
  width:35px;
  height:35px;
  border-radius: 50%;
  overflow: hidden;
  background-color: ${props => props.backgroundColor || '#1EB7FF'};
  text-align:center;
  color:${props => props.color || '#fff'};
  font-weight:bold;
  line-height:35px;
  margin-right:10px;
`;

{selectedOrganization && (
    <>
        {selectedOrganization.logo && <OrganizationLogo title={selectedOrganization.name} src={selectedOrganization.logo} color={selectedOrganization.colorCode} backgroundColor={selectedOrganization.backgroundColorCode} />}
        {!selectedOrganization.logo && selectedOrganization.name && (
            <OrganizationLogoGenerated title={selectedOrganization.name}
                color={selectedOrganization.colorCode} 
                backgroundColor={selectedOrganization.backgroundColorCode}
                >
                {selectedOrganization.name[0].toUpperCase()}
            </OrganizationLogoGenerated>
        )}
    </>
)}


const OrganizationLogoThemed = ({ checkBackground, className, ...otherProps }) => {
    const [{currentUser, selectedOrganization}, dispatch] = useAppState();
    const loggedInUser = currentUser && currentUser.user;

    return (
        <ThemeConsumer>
        {
            ({ style, color, foregroundColor, backgroundColor, organizationLogo, organizationName }) => {
                //console.log("Selected color:", color, style, foregroundColor, backgroundColor)
                return (
                    <>
                        {selectedOrganization && (
                            <>
                                {selectedOrganization.logo && <OrganizationLogo title={selectedOrganization.name} src={selectedOrganization.logo} color={selectedOrganization.colorCode} backgroundColor={selectedOrganization.backgroundColorCode} />}
                                {!selectedOrganization.logo && selectedOrganization.name && (
                                    <OrganizationLogoGenerated title={selectedOrganization.name}
                                        color={selectedOrganization.colorCode} 
                                        backgroundColor={selectedOrganization.backgroundColorCode}
                                        >
                                        {selectedOrganization.name[0].toUpperCase()}
                                    </OrganizationLogoGenerated>
                                )}
                            </>
                        )}
                    </>
                )
            }
        }
        </ThemeConsumer>
    );
}

export {OrganizationLogoThemed};