import React from 'react';

import { ThemeConsumer } from '@/components/Theme';
import styled from "styled-components";
import { useAppState } from '@/components/AppState';
import { Role } from '@/helpers';
import PulseLogo from '@/components/PulseLogo';
import {
    Responsive,
    isMobileDevice, 
    isTabletDevice,
    isLaptopDevice,
    isBiggerThanLaptop
  } from "responsive-react";

const InstituteLogo = styled.div`
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

const InstituteLogoGenerated = styled.div`
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

const InstituteLogoThemed = ({width, height, marginRight, marginLeft, ...otherProps}) => {
    const [{currentUser, selectedInstitute}, dispatch] = useAppState();
    const loggedInUser = currentUser && currentUser.user;
    
    console.log("Got institute logo dimensions:", width, height, marginRight, marginLeft)

    return (
        <ThemeConsumer>
        {
            ({ style, color, foregroundColor, backgroundColor, instituteLogo, instituteName }) => {
                //console.log("Selected color:", color, style, foregroundColor, backgroundColor)
                return (
                    <>
                        {selectedInstitute && (
                            <>
                                {selectedInstitute.logo && (
                                    <InstituteLogo 
                                        title={selectedInstitute.name} 
                                        src={selectedInstitute.logo} 
                                        color={selectedInstitute.colorCode} 
                                        backgroundColor={selectedInstitute.backgroundColorCode} 
                                        width={width} 
                                        height={height} 
                                        marginLeft={marginLeft} 
                                        marginRight={marginRight}
                                    />
                                )}
                                {!selectedInstitute.logo && selectedInstitute.name && (
                                    <InstituteLogoGenerated title={selectedInstitute.name} 
                                        width={width} 
                                        height={height} 
                                        marginLeft={marginLeft} 
                                        marginRight={marginRight}
                                        color={selectedInstitute.colorCode} 
                                        backgroundColor={selectedInstitute.backgroundColorCode}
                                        >
                                        {selectedInstitute.name[0].toUpperCase()}
                                    </InstituteLogoGenerated>
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

export {InstituteLogoThemed};