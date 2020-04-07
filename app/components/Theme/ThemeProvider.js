import React from 'react';
import PropTypes from 'prop-types';

import { Provider } from './ThemeContext';


export class ThemeProvider extends React.Component {

    static propTypes = {
        children: PropTypes.node,
        initialStyle: PropTypes.string,
        initialColor: PropTypes.string,
        initialForegroundColor: PropTypes.string,
        initialBackgroundColor: PropTypes.string,
        instituteLogo: PropTypes.string,
        instituteName: PropTypes.string
    };

    constructor(props) {
        super(props);

        this.state = {
            style: 'light',
            color: 'primary',
            foregroundColor: null,
            backgroundColor: null,
            instituteLogo: null,
            instituteName: null,
            darkMode: 'false'
        };
    }

    componentDidMount() {
        const { initialStyle, initialColor, initialForegroundColor, initialBackgroundColor, initialInstituteLogo, initialInstituteName, initialDarkMode } = this.props;

        if (initialStyle) {
            this.setState({ style: initialStyle });
        }
        if (initialColor) {
            this.setState({ color: initialColor });
        }

        if (initialForegroundColor) {
            this.setState({ foregroundColor: initialForegroundColor });
        }

        if (initialBackgroundColor) {
            this.setState({ backgroundColor: initialBackgroundColor });
        }

        if(initialInstituteLogo) {
            this.setState({ instituteLogo: initialInstituteLogo });
        }

        if(initialInstituteName) {
            this.setState({ instituteName: initialInstituteName });
        }

        if(initialDarkMode) {
            this.setState({ darkMode: initialDarkMode });
        }
    }

    onChangeTheme(themeState) {
        this.setState(themeState);
    }
    
    render() {
        const { children } = this.props;
        
        return (
            <Provider
                value={{
                    ...this.state,
                    onChangeTheme: this.onChangeTheme.bind(this)
                }}
            >
                { children }
            </Provider>
        );
    }
}
