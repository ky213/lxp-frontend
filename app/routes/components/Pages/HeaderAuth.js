import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { LogoThemed } from './../LogoThemed/LogoThemed';

const HeaderAuth = (props) => (
    <div className="mb-1 mt-5">
        <div className="mb-2 text-left header-auth__logo">
            <Link to="/" className="d-inline-block">
                <LogoThemed checkBackground height="25" fill="#F4F4F4" />
            </Link>
        </div>
        <p className="mb-5 text-left header-auth__subtitle">
            Learning<br />
            Experience <br/>
            Platform
        </p>
        <h1 className="text-left mb-3 header-auth__title">
            { props.title }
        </h1> 
    </div>
)
HeaderAuth.propTypes = {
    icon: PropTypes.node,
    iconClassName: PropTypes.node,
    title: PropTypes.node,
    text: PropTypes.node,
};
HeaderAuth.defaultProps = {
    title: "Waiting for Data...",
    text: "LXP",
    iconClassName: "text-theme"
};

export { HeaderAuth };
