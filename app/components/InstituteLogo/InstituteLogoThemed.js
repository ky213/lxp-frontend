import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { ThemeConsumer } from './node_modules/@/components/Theme';
import styled from "styled-components";
import { useAppState } from './node_modules/@/components/AppState';
import { Role } from './node_modules/@/helpers';
import PulseLogo from './node_modules/@/components/PulseLogo';
import {
    Responsive,
    isMobileDevice, 
    isTabletDevice,
    isLaptopDevice,
    isBiggerThanLaptop
  } from "responsive-react";

const InstituteLogo = styled.div`
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

const InstituteLogoGenerated = styled.div`
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

{selectedInstitute && (
    <>
        {selectedInstitute.logo && <InstituteLogo title={selectedInstitute.name} src={selectedInstitute.logo} color={selectedInstitute.colorCode} backgroundColor={selectedInstitute.backgroundColorCode} />}
        {!selectedInstitute.logo && selectedInstitute.name && (
            <InstituteLogoGenerated title={selectedInstitute.name}
                color={selectedInstitute.colorCode} 
                backgroundColor={selectedInstitute.backgroundColorCode}
                >
                {selectedInstitute.name[0].toUpperCase()}
            </InstituteLogoGenerated>
        )}
    </>
)}


const InstituteLogoThemed = ({ checkBackground, className, ...otherProps }) => {
    const [{currentUser, selectedInstitute}, dispatch] = useAppState();
    const loggedInUser = currentUser && currentUser.user;

    return (
        <ThemeConsumer>
        {
            ({ style, color, foregroundColor, backgroundColor, instituteLogo, instituteName }) => {
                //console.log("Selected color:", color, style, foregroundColor, backgroundColor)
                return (
                    <>
                        {selectedInstitute && (
                            <>
                                {selectedInstitute.logo && <InstituteLogo title={selectedInstitute.name} src={selectedInstitute.logo} color={selectedInstitute.colorCode} backgroundColor={selectedInstitute.backgroundColorCode} />}
                                {!selectedInstitute.logo && selectedInstitute.name && (
                                    <InstituteLogoGenerated title={selectedInstitute.name}
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