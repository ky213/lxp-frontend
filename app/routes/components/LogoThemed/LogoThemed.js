import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { ThemeConsumer } from '@/components/Theme';
import styled from "styled-components";
import { useAppState } from '@/components/AppState';
import { Role } from '@/helpers';
import PulseLogo from '@/components/PulseLogo';
import InstituteLogoThemed from '@/components/InstituteLogoThemed';
import {
    Responsive,
    isMobileDevice, 
    isTabletDevice,
    isLaptopDevice,
    isBiggerThanLaptop
  } from "responsive-react";

const Aligner = styled.div`
    display: flex;
    align-items: center;
`;

const LogoThemed = ({ checkBackground, className, ...otherProps }) => {
    const [{currentUser, selectedInstitute}, dispatch] = useAppState();
    const loggedInUser = currentUser && currentUser.user;
    const isSuperAdmin = loggedInUser && loggedInUser.role == Role.SuperAdmin || false;

    return (
        <ThemeConsumer>
        {
            ({ style, color, foregroundColor, backgroundColor, instituteLogo, instituteName }) => {
                //console.log("Selected color:", color, style, foregroundColor, backgroundColor)
                return (
                    <>
                    <Aligner>
                       
                        <PulseLogo className="res-logo" fill={otherProps.fill} style={{height:'30px'}} title="Resident Management System" />
                    </Aligner>
                    
                    </>
                )
            }
        }
        </ThemeConsumer>
    );
}


LogoThemed.propTypes = {
    checkBackground: PropTypes.bool,
    className: PropTypes.string,
};

export { LogoThemed };
