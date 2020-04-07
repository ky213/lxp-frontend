import React from 'react';
import classNames from 'classnames';
import {
    ThemeConsumer
} from '@/components/Theme';

import { Button } from '@/components';

const ThemedButton = ({ children, className, ...otherProps }) => {
    return (
        <ThemeConsumer>
        {
            ({ color, foregroundColor, backgroundColor }) => (
                <Button color={ color } style={{backgroundColor: backgroundColor, borderColor:backgroundColor, color: foregroundColor}} className={classNames(className)} { ...otherProps }>
                    {children}
                </Button>
            )
        }
        </ThemeConsumer>
    );
};

export { ThemedButton };
