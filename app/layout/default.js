import React from 'react';
import PropTypes from 'prop-types';

import {
  Layout,
  ThemeSelector,
  ThemeProvider,
  PageConfigConsumer,
} from '@/components';

import './../styles/bootstrap.scss';
import './../styles/main.scss';
import './../styles/plugins/plugins.scss';
import './../styles/plugins/plugins.css';
import { AppStateContext } from '@/components/AppState';

import { RoutedNavbars, RoutedSidebars } from '@/routes';

const favIcons = [
  {
    rel: 'icon',
    type: 'image/x-icon',
    href: require('./../images/favicons/favicon.ico'),
  },

  {
    rel: 'apple-touch-icon',
    sizes: '180x180',
    href: require('./../images/favicons/apple-touch-icon.png'),
  },

  {
    rel: 'icon',
    type: 'image/png',
    sizes: '32x32',
    href: require('./../images/favicons/favicon-32x32.png'),
  },
  {
    rel: 'icon',
    type: 'image/png',
    sizes: '16x16',
    href: require('./../images/favicons/favicon-16x16.png'),
  },
];

class AppLayout extends React.Component {
  static contextType = AppStateContext;

  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  render() {
    const { children } = this.props;
    const [{ currentUser }, dispatch] = this.context;
    const initialForegroundColor =
      (currentUser &&
        currentUser.user &&
        currentUser.user.organizationForegroundColor) ||
      '';
    const initialBackgroundColor =
      (currentUser &&
        currentUser.user &&
        currentUser.user.organizationBackgroundColor) ||
      '';
    const initialOrganizationLogo =
      (currentUser && currentUser.user && currentUser.user.organizationLogo) ||
      '';
    const initialOrganizationName =
      (currentUser && currentUser.user && currentUser.user.organizationName) ||
      '';
    const initialDarkMode =
      (currentUser && currentUser.user && currentUser.user.darkMode) || 'false';

    return (
      <ThemeProvider
        initialStyle="light"
        initialColor="primary"
        initialForegroundColor={initialForegroundColor}
        initialBackgroundColor={initialBackgroundColor}
        initialOrganizationLogo={initialOrganizationLogo}
        initialOrganizationName={initialOrganizationName}
        initialDarkMode={initialDarkMode}
      >
        <Layout sidebarSlim favIcons={favIcons}>
          {/* --------- Navbar ----------- */}
          <Layout.Navbar>
            <RoutedNavbars />
          </Layout.Navbar>
          {/* -------- Sidebar ------------*/}
          <Layout.Sidebar>
            <RoutedSidebars />
          </Layout.Sidebar>

          {/* -------- Content ------------*/}
          <Layout.Content>{children}</Layout.Content>

          {/* -- Theme Selector (DEMO) ----
                    <PageConfigConsumer>
                    {
                        ({ sidebarHidden, navbarHidden }) => (
                            <ThemeSelector styleDisabled={ sidebarHidden && navbarHidden } />
                        )
                    }
                    </PageConfigConsumer>*/}
        </Layout>
      </ThemeProvider>
    );
  }
}

export default AppLayout;
