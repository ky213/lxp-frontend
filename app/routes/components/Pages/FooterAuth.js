import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { FooterText } from '../FooterText';

const FooterAuth = ({ className }) => (
    <p className={ classNames(className, 'small mt-5 text-center login__footer') }>
        <FooterText />
    </p>
);
FooterAuth.propTypes = {
    className: PropTypes.string
};

export { FooterAuth };
