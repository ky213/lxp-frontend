import React from 'react';
import {
    Container,
    Card,
    CardFooter,
    Col,
    Row,
    Table,
} from '@/components';

import { HeaderMain } from "@/routes/components/HeaderMain";
import AddEditActivityType from './AddEditActivityType';
import ListActivityTypes from './ListActivityTypes';
import { activityTypesService } from '@/services';
import { Role } from '@/helpers';

import {
    HeaderDemo
} from "@/routes/components/HeaderDemo";
import { useAppState } from '@/components/AppState';

const ActivityTypes = () => {
    const [{currentUser, selectedOrganization}, dispatch] = useAppState();
    const isSuperAdmin = currentUser && currentUser.user && currentUser.user.role == Role.SuperAdmin;

    const [activityTypes, setActivityTypes] = React.useState([]);
    const [selectedActivityTypeId, setSelectedActivityTypeId] = React.useState(null);

    const [showActivityTypeForm, setShowActivityTypeForm] = React.useState(false);
    const [searchText, setSearchText] = React.useState(null);
    const [pageId, setPageId] = React.useState(1);
    const [recordsPerPage, setRecordsPerPage] = React.useState(15);
    const [totalNumberOfRecords, setTotalNumberOfRecords] = React.useState(0);
    const [selectedActivityTypes, setSelectedActivityTypes] = React.useState([]);

    const getActivityTypes = () => {        
        activityTypesService.getAll(selectedOrganization && selectedOrganization.organizationId, pageId, recordsPerPage, searchText).then((data) => {
            //console.log("Got ActivityTypes: ", data)
            setActivityTypes(data.activityTypes);
            setTotalNumberOfRecords(data.totalNumberOfRecords);
        });
    }

    const handleSearch = (e) => {
        setSearchText(e.target.value);
    }

    const handleActivityTypeCreate = () => {
        setSelectedActivityTypeId(null);
        setShowActivityTypeForm(true);
    }

    const handleCancelCreate = () => {
        /* console.log("Handle cancel create"); */
        setSelectedActivityTypeId(null);
        setShowActivityTypeForm(false);       
    }

    const handleActivityTypeEdit = (activityTypeId) => {
        //console.log("handleActivityTypeEdit ====>   ", activityTypeId)
        setSelectedActivityTypeId(activityTypeId);
        setShowActivityTypeForm(true);
    }

    const handleEdited = () => {
        getActivityTypes();
        setSelectedActivityTypeId(null);
        setShowActivityTypeForm(false);
    }

    const handleSelected = (activityTypeId, e) => {

        //console.log("Selected Activity Types ====>   ", activityTypeId)

        if(e.target.checked) {
            setSelectedActivityTypes([...selectedActivityTypes, activityTypeId]);
        }
        else {
            setSelectedActivityTypes(selectedActivityTypes.filter(p => p != activityTypeId));
        }

        /* console.log("Selected Activity Types", selectedActivityTypes) */
    }


    React.useEffect(() => {
        getActivityTypes();
    }, [pageId, searchText]);


    return (
        <React.Fragment>
            <Container>
                <HeaderMain
                    title={`${showActivityTypeForm && "Activity Types" || "Activity Types"}`}
                />

                {showActivityTypeForm && (
                    <>
                        <Row>
                            <Col lg={12}>
                                <HeaderDemo
                                    title="Create/Edit activity type"
                                    subTitle="You can create a new activity type or change existing activity type settings like the name, etc. here"
                                />
                            </Col>
                        </Row>
                        <Row>
                            <AddEditActivityType activityTypeId={selectedActivityTypeId}
                                onEdited={handleEdited} onCancelCreate={handleCancelCreate} />
                        </Row>
                    </>
                )}

                {!showActivityTypeForm && (<>
                                    <Row>
                                    <Col lg={12}>
                                        <HeaderDemo
                                            no={1}
                                            title="Activity Types"
                                            subTitle="You can search, edit and create new activity types from here"
                                        />
                                    </Col>
                                </Row>
                    <Row>
                        
                        <ListActivityTypes activityTypes={activityTypes}
                            onSearch={handleSearch}
                            onSelected={handleSelected}
                            onActivityTypeCreate={handleActivityTypeCreate}
                            onActivityTypeEdit={handleActivityTypeEdit} 
                            pageId={pageId}
                            setPageId={setPageId}
                            onSearch={handleSearch} 
                            recordsPerPage={recordsPerPage}
                            totalNumberOfRecords={totalNumberOfRecords}
                            searchText={searchText}    
                            selectedActivityTypes={selectedActivityTypes}
                        />
                    </Row></>
                )}
            </Container>
        </React.Fragment>
    );
};

export default ActivityTypes;