import React from 'react';
import { useIntl } from "react-intl";
import {
    Container,
    Alert
} from '@/components';

import { instituteService } from '@/services';
import { HeaderMain } from "@/routes/components/HeaderMain";
import ListInstitutes from './ListInstitutes';
import InstituteSettings from './InstituteSettings';
import { Role } from '@/helpers';
import { useAppState } from '@/components/AppState';
import { SUPER_ADMIN_SELECT_INSTITUTE } from "@/actions";
import { Consumer, ThemeContext } from '@/components/Theme/ThemeContext';

const SuperAdminHome = (props) => {
    const intl = useIntl();
    const [{currentUser, selectedInstitute}, dispatch] = useAppState();
    const theme = React.useContext(ThemeContext);
    //const currentUser = authenticationService.currentUserValue;
    const isSuperAdmin = currentUser && currentUser.user && currentUser.user.role == Role.SuperAdmin;
    const [institutes, setInstitutes] = React.useState([]);

    const [selectedInstituteId, setSelectedInstituteId] = React.useState(null);
    const [showInstituteForm, setShowInstituteForm] = React.useState(false);
    const [searchText, setSearchText] = React.useState(null);
    const [pageId, setPageId] = React.useState(1);
    const [recordsPerPage, setRecordsPerPage] = React.useState(15);
    const [totalNumberOfRecords, setTotalNumberOfRecords] = React.useState(0);
    const [selectedInstitutes, setSelectedInstitutes] = React.useState([]);

    const getInstitutes = () => {
        if(isSuperAdmin) {
            instituteService.getAll(pageId, recordsPerPage, searchText).then((data) => {
                setInstitutes(data.institutes);
                setTotalNumberOfRecords(data.totalNumberOfRecords);
            });
        }
    }

    const handleSearch = (e) => {
        setSearchText(e.target.value);
    }

    const handleInstituteCreate = () => {
        setSelectedInstituteId(null);
        setShowInstituteForm(true);
    }

    const handleCancel = () => {
        setSelectedInstituteId(null);
        setShowInstituteForm(false);
    }

    const handleInstituteEdit = (instituteId) => {
        setSelectedInstituteId(instituteId);
        setShowInstituteForm(true);
    }

    const handleEdited = () => {
        if(isSuperAdmin) {
            getInstitutes();
            setShowInstituteForm(false);
        }        
    }
    
    const handleSelected = (e, institute) => {
        if(e.target.checked) {
            setSelectedInstitutes([...selectedInstitutes, institute]);
        }
        else {
            setSelectedInstitutes(selectedInstitutes.filter(i => i.instituteId != institute.instituteId));
        }
    }

    const handleDelete = async () => {
        const deleteMessage = `${selectedInstitutes.length > 1 ? 
            intl.formatMessage({ id: 'SuperAdminHome.HandleDeleteTheseInst'}) : intl.formatMessage({ id: 'SuperAdminHome.HandleDeleteThisInst'})}?`;
        if(confirm(intl.formatMessage({ id: 'General.HandleDeleteConfirm'}) + " " + deleteMessage)) {
            try {
                await instituteService.deleteInstitutes(selectedInstitutes.map(i => i.instituteId));
                getInstitutes();
                setSelectedInstitutes([]);
            }
            catch(error) {
                alert(intl.formatMessage({ id: 'General.HandleDeleteError'}) + deleteMessage)
            }
        }
    }

    React.useEffect(() => {
        getInstitutes();
        }, [pageId, searchText]
    );

    React.useEffect(() => {
        dispatch({type: SUPER_ADMIN_SELECT_INSTITUTE, selectedInstitute: null});
      
        theme.onChangeTheme({
            backgroundColor: null,
            foregroundColor: null,
            instituteLogo: null,
            instituteName: null
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

                {showInstituteForm && (
                    <InstituteSettings instituteId={selectedInstituteId} onEdited={handleEdited} onCancel={handleCancel} />
                )}
                {!showInstituteForm && (
                    <ListInstitutes 
                        institutes={institutes}
                        selectedInstitutes={selectedInstitutes}
                        pageId={pageId}
                        setPageId={setPageId}
                        onSearch={handleSearch} 
                        recordsPerPage={recordsPerPage}
                        totalNumberOfRecords={totalNumberOfRecords}
                        searchText={searchText}
                        onInstituteCreate={handleInstituteCreate} 
                        onInstituteEdit={handleInstituteEdit} 
                        onSelected={handleSelected}
                        onDelete={handleDelete}
                        />
                )}
                
            </Container>
        </React.Fragment>
    );
};

export default SuperAdminHome;