import React from 'react';

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
  width: ${props => props.width || '35px'};
  height:${props => props.height || '35px'};
  border-radius: 50%;
  overflow: hidden;
  color:${props => props.color || '#fff'};
  background-image: url(${props => props.src || '' });
  background-size: cover;
  background-position: center center;
  border:3px solid ${props => props.backgroundColor || '#fff'};
  margin-right:${props => props.marginRight || '10px'};
  margin-left:${props => props.marginLeft || '0px'};
`;

const OrganizationLogoGenerated = styled.div`
  width: ${props => props.width || '35px'};
  height:${props => props.height || '35px'};
  border-radius: 50%;
  overflow: hidden;
  background-color: ${props => props.backgroundColor || '#1EB7FF'};
  text-align:center;
  color:${props => props.color || '#fff'};
  font-weight:bold;
  line-height:${props => props.height || '35px'};
  margin-right:${props => props.marginRight || '10px'};
  margin-left:${props => props.marginLeft || '0px'};
`;

const OrganizationLogoThemed = ({width, height, marginRight, marginLeft, ...otherProps}) => {
    const [{currentUser, selectedOrganization}, dispatch] = useAppState();
    const loggedInUser = currentUser && currentUser.user;
    
    console.log("Got organization logo dimensions:", width, height, marginRight, marginLeft)

    return (
        <ThemeConsumer>
        {
            ({ style, color, foregroundColor, backgroundColor, organizationLogo, organizationName }) => {
                //console.log("Selected color:", color, style, foregroundColor, backgroundColor)
                return (
                    <>
                        {selectedOrganization && (
                            <>
                                {selectedOrganization.logo && (
                                    <OrganizationLogo 
                                        title={selectedOrganization.name} 
                                        src={selectedOrganization.logo} 
                                        color={selectedOrganization.colorCode} 
                                        backgroundColor={selectedOrganization.backgroundColorCode} 
                                        width={width} 
                                        height={height} 
                                        marginLeft={marginLeft} 
                                        marginRight={marginRight}
                                    />
                                )}
                                {!selectedOrganization.logo && selectedOrganization.name && (
                                    <OrganizationLogoGenerated title={selectedOrganization.name} 
                                        width={width} 
                                        height={height} 
                                        marginLeft={marginLeft} 
                                        marginRight={marginRight}
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