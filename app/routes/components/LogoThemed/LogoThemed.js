import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { ThemeConsumer } from '@/components/Theme';
import styled from 'styled-components';
import { useAppState } from '@/components/AppState';
import { Role } from '@/helpers';
import LearnLogo from '@/components/LearnLogo';
import OrganizationLogoThemed from '@/components/OrganizationLogoThemed';
import {
  Responsive,
  isMobileDevice,
  isTabletDevice,
  isLaptopDevice,
  isBiggerThanLaptop,
} from 'responsive-react';

const Aligner = styled.div`
  display: flex;
  align-items: center;
`;

const LogoThemed = ({ checkBackground, className, ...otherProps }) => {
  const [{ currentUser, selectedOrganization }, dispatch] = useAppState();
  const loggedInUser = currentUser && currentUser.user;
  const isSuperAdmin =
    (loggedInUser && loggedInUser.role == Role.SuperAdmin) || false;

  return (
    <ThemeConsumer>
      {({
        style,
        color,
        foregroundColor,
        backgroundColor,
        organizationLogo,
        organizationName,
      }) => {
        //console.log("Selected color:", color, style, foregroundColor, backgroundColor)
        return (
          <>
            <Aligner>
              {/* <LearnLogo className="res-logo" fill={otherProps.fill} style={{height:'30px'}} title="Learning Experience Platform" /> */}
            </Aligner>
          </>
        );
      }}
    </ThemeConsumer>
  );
};

LogoThemed.propTypes = {
  checkBackground: PropTypes.bool,
  className: PropTypes.string,
};

export { LogoThemed };
