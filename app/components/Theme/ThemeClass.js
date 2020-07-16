import React from 'react';
import PropTypes from 'prop-types';

import { Consumer } from './ThemeContext';
import { useHistory } from 'react-router-dom';
import {
    isMobileDevice, 
    isTabletDevice,
    isLaptopDevice,
    isBiggerThanLaptop
  } from "responsive-react";

const ThemeClass = ({ children, color, style, foregroundColor, backgroundColor, organizationLogo, organizationName, darkMode }) => {
    let history = useHistory();
 
    const currentPathName = history && history.location && history.location.pathname && history.location.pathname.replace("/", "").replace("-"," ") || "";
    
    const layoutThemeClass = `layout--theme--${ style }--${ color } ${darkMode == "true"|| currentPathName == "activities" && "dark" || ""} ${isMobileDevice() && "mobile" || ""}`;
    
    return children(layoutThemeClass);
};

ThemeClass.propTypes = {
    children: PropTypes.func.isRequired,
    color: PropTypes.string,
    style: PropTypes.string,
    foregroundColor: PropTypes.string,
    backgroundColor: PropTypes.string,
    organizationLogo: PropTypes.string,
    organizationName: PropTypes.string,
    darkMode: PropTypes.string
};

const ContextThemeClass = (otherProps) =>
    <Consumer>
        {
            (themeState) => <ThemeClass {...{ ...themeState, ...otherProps }}/>
        }
    </Consumer>;

export { ContextThemeClass as ThemeClass };

