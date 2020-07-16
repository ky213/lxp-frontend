import React from 'react';
import { hot } from 'react-hot-loader'
import { BrowserRouter as Router } from 'react-router-dom';

import AppLayout from '@/layout/default';
import { RoutedContent } from '@/routes';

import { history, Role } from '@/helpers';
import { authenticationService } from '@/services';
import { AppStateProvider } from '@/components/AppState';
import reducers from "@/reducers";

const basePath = process.env.BASE_PATH || '/';

const AppClient = () => {
    const loggedInUser = JSON.parse(localStorage.getItem('currentUser')) || null;
    
    const organization = loggedInUser && 
                        loggedInUser.user && 
                        loggedInUser.user.organizationId && {
                            organizationId:loggedInUser.user.organizationId, 
                            name: loggedInUser.user.organizationName,
                            colorCode: loggedInUser.user.organizationForegroundColor,
                            backgroundColorCode: loggedInUser.user.organizationBackgroundColor,
                            logo: loggedInUser.user.organizationLogo
                        } || null;

    const initialState = {
        currentUser: loggedInUser,
        history: history,
        selectedProgram: null,
        academicYear: null,
        selectedOrganization: loggedInUser && 
            loggedInUser.user && loggedInUser.user.role && loggedInUser.user.role != Role.SuperAdmin && organization || null
    }

    const logout = () => {
        authenticationService.logout();
        history.push('/pages/login');
    }
    
    return (
        <AppStateProvider initialState={initialState} reducer={reducers}>
            <Router history={history} basename={ basePath }>
                <AppLayout>
                    <RoutedContent />
                </AppLayout>
            </Router>
        </AppStateProvider>
    ); 
}

export default hot(module)(AppClient);