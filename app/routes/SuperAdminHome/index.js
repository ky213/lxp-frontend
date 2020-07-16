import React from 'react';
import { useIntl } from "react-intl";
import {
    Container,
    Alert
} from '@/components';

import { organizationService } from '@/services';
import { HeaderMain } from "@/routes/components/HeaderMain";
import ListOrganizations from './ListOrganizations';
import OrganizationSettings from './OrganizationSettings';
import { Role } from '@/helpers';
import { useAppState } from '@/components/AppState';
import { SUPER_ADMIN_SELECT_ORGANIZATION } from "@/actions";
import { Consumer, ThemeContext } from '@/components/Theme/ThemeContext';

const SuperAdminHome = (props) => {
    const intl = useIntl();
    const [{currentUser, selectedOrganization}, dispatch] = useAppState();
    const theme = React.useContext(ThemeContext);
    //const currentUser = authenticationService.currentUserValue;
    const isSuperAdmin = currentUser && currentUser.user && currentUser.user.role == Role.SuperAdmin;
    const [organizations, setOrganizations] = React.useState([]);

    const [selectedOrganizationId, setSelectedOrganizationId] = React.useState(null);
    const [showOrganizationForm, setShowOrganizationForm] = React.useState(false);
    const [searchText, setSearchText] = React.useState(null);
    const [pageId, setPageId] = React.useState(1);
    const [recordsPerPage, setRecordsPerPage] = React.useState(15);
    const [totalNumberOfRecords, setTotalNumberOfRecords] = React.useState(0);
    const [selectedOrganizations, setSelectedOrganizations] = React.useState([]);

    const getOrganizations = () => {
        if(isSuperAdmin) {
            organizationService.getAll(pageId, recordsPerPage, searchText).then((data) => {
                setOrganizations(data.organizations);
                setTotalNumberOfRecords(data.totalNumberOfRecords);
            });
        }
    }

    const handleSearch = (e) => {
        setSearchText(e.target.value);
    }

    const handleOrganizationCreate = () => {
        setSelectedOrganizationId(null);
        setShowOrganizationForm(true);
    }

    const handleCancel = () => {
        setSelectedOrganizationId(null);
        setShowOrganizationForm(false);
    }

    const handleOrganizationEdit = (organizationId) => {
        setSelectedOrganizationId(organizationId);
        setShowOrganizationForm(true);
    }

    const handleEdited = () => {
        if(isSuperAdmin) {
            getOrganizations();
            setShowOrganizationForm(false);
        }        
    }
    
    const handleSelected = (e, Organization) => {
        if(e.target.checked) {
            setSelectedOrganizations([...selectedOrganizations, Organization]);
        }
        else {
            setSelectedOrganizations(selectedOrganizations.filter(i => i.organizationId != Organization.organizationId));
        }
    }

    const handleDelete = async () => {
        const deleteMessage = `${selectedOrganizations.length > 1 ? 
            intl.formatMessage({ id: 'SuperAdminHome.HandleDeleteTheseInst'}) : intl.formatMessage({ id: 'SuperAdminHome.HandleDeleteThisInst'})}?`;
        if(confirm(intl.formatMessage({ id: 'General.HandleDeleteConfirm'}) + " " + deleteMessage)) {
            try {
                await organizationService.deleteOrganizations(selectedOrganizations.map(i => i.organizationId));
                getOrganizations();
                setSelectedOrganizations([]);
            }
            catch(error) {
                alert(intl.formatMessage({ id: 'General.HandleDeleteError'}) + deleteMessage)
            }
        }
    }

    React.useEffect(() => {
        getOrganizations();
        }, [pageId, searchText]
    );

    React.useEffect(() => {
        dispatch({type: SUPER_ADMIN_SELECT_ORGANIZATION, selectedOrganization: null});
      
        theme.onChangeTheme({
            backgroundColor: null,
            foregroundColor: null,
            OrganizationLogo: null,
            OrganizationName: null
          });
       
    }, [])
    
    return (
        <React.Fragment>
            <Container>
                {props.location && props.location.state && props.location.state.message && (
                    <Alert color="danger">
                        <h6 className="mb-1 alert-heading">
                            Warning
                        </h6>
                        {props.location.state.message}
                    </Alert>
                )}
                
                <HeaderMain title={intl.formatMessage({ id: 'SuperAdminHome.Title'}, {name:  currentUser && currentUser.user && currentUser.user.fullName })} />

                {showOrganizationForm && (
                    <OrganizationSettings organizationId={selectedOrganizationId} onEdited={handleEdited} onCancel={handleCancel} />
                )}
                {!showOrganizationForm && (
                    <ListOrganizations 
                        organizations={organizations}
                        selectedOrganizations={selectedOrganizations}
                        pageId={pageId}
                        setPageId={setPageId}
                        onSearch={handleSearch} 
                        recordsPerPage={recordsPerPage}
                        totalNumberOfRecords={totalNumberOfRecords}
                        searchText={searchText}
                        onOrganizationCreate={handleOrganizationCreate} 
                        onOrganizationEdit={handleOrganizationEdit} 
                        onSelected={handleSelected}
                        onDelete={handleDelete}
                        />
                )}
                
            </Container>
        </React.Fragment>
    );
};

export default SuperAdminHome;