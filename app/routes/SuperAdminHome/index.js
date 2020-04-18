import React from 'react';
import {
    Container,
    Card,    
    CardFooter,
    Col,
    Row,
    Table,
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
import PulseLogo from '@/components/PulseLogo';
import { defineMessages, FormattedMessage } from "react-intl";

const SuperAdminHome = (props) => {
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
                console.log('Got institutes:', data.institutes);
                setInstitutes(data.institutes);
                setTotalNumberOfRecords(data.totalNumberOfRecords);
            });
        }
    }

    const handleSearch = (e) => {
        setSearchText(e.target.value);
    }

    const handleInstituteCreate = () => {
        console.log("Handle institute create:");
        setSelectedInstituteId(null);
        setShowInstituteForm(true);
    }

    const handleCancel = () => {
        console.log("Handle cancel create:");
        setSelectedInstituteId(null);
        setShowInstituteForm(false);
    }

    const handleInstituteEdit = (instituteId) => {
        console.log("Handle institute edit:", instituteId);
        setSelectedInstituteId(instituteId);
        setShowInstituteForm(true);
    }

    const handleEdited = () => {
        console.log("Handle edited!")

        if(isSuperAdmin) {
            getInstitutes();
            setShowInstituteForm(false);
        }        
    }
    
    const handleSelected = (e, institute) => {
        console.log("Selected:", e, institute)
        if(e.target.checked) {
            setSelectedInstitutes([...selectedInstitutes, institute]);
        }
        else {
            setSelectedInstitutes(selectedInstitutes.filter(i => i.instituteId != institute.instituteId));
        }
    }

    const handleDelete = async () => {
        console.log("Delete selected institutes:", selectedInstitutes)
        const deleteMessage = `${selectedInstitutes.length > 1 ? "these institutes" : "this institute"}?`;
        if(confirm('Are you sure you want to delete ' + deleteMessage)) {
            try {
                await instituteService.deleteInstitutes(selectedInstitutes.map(i => i.instituteId));
                getInstitutes();
                setSelectedInstitutes([]);
            }
            catch(error) {
                console.log("Error while deleting institutes:", error)
                alert("Something went wrong while trying to delete " + deleteMessage)
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
                
                <FormattedMessage id="Title" />

                <HeaderMain title={`Hello, ${currentUser && currentUser.user && currentUser.user.fullName}`} />
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