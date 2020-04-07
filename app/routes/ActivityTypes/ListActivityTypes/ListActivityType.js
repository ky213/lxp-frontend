import React from 'react';
import {
    Container,
    Card,
    CardFooter,
    CardBody,
    Col,
    Row,
    Table,
    Input,
    Button,
    ButtonGroup,
    InputGroup,
    InputGroupAddon,
    UncontrolledTooltip,
    ButtonToolbar
} from '@/components';
import { ActivityTypeRow } from "./components/ActivityTypeRow";
import { Paginations } from "@/routes/components/Paginations";

import {
    HeaderDemo
} from "@/routes/components/HeaderDemo";

const ListActivityTypes = ({ activityTypes, onActivityTypeEdit, onActivityTypeCreate, onSearch, onSelected,
    pageId,
    setPageId,
    recordsPerPage,  
    totalNumberOfRecords,
    selectedActivityTypes,
    searchText,
    hideCreateButton }) => {

    
    let paginationContent = "";
    if (totalNumberOfRecords > 0) {
        paginationContent = (
        <CardFooter className="d-flex justify-content-center pb-0">
            <Paginations
            pageId={pageId}
            setPageId={setPageId}
            totalNumber={totalNumberOfRecords}
            recordsPerPage={recordsPerPage}
            />
        </CardFooter>
        );
    }

    return (
        <React.Fragment>
            <Container>
                <Row>
                    <Col lg={12}>
                        <Card className="mb-3">
                            <CardBody>
                                <div className="d-lg-flex justify-content-end">
                                    <div className="mr-auto d-flex align-items-center mb-3 mb-lg-0">
                                        <InputGroup>
                                            <Input onKeyUp={(e) => onSearch(e)} defaultValue={searchText} placeholder="Search for..." />
                                            <InputGroupAddon addonType="append">
                                                <Button color="secondary" outline>
                                                    <i className="fa fa-search"></i>
                                                </Button>
                                            </InputGroupAddon>
                                        </InputGroup>
                                    </div>
                                    <ButtonToolbar>
                                       {selectedActivityTypes && selectedActivityTypes.length > 0 && (
                                        <ButtonGroup className="mr-2">
                                            <Button color="link" className="text-decoration-none align-self-center" id="tooltipDelete">
                                                <i className="fa fa-fw fa-trash"></i>
                                            </Button>
                                            <UncontrolledTooltip placement="bottom" target="tooltipDelete">
                                                Delete
                                            </UncontrolledTooltip>
                                        </ButtonGroup>
                                       )}
                                        
                                        {!hideCreateButton && (
                                            <ButtonGroup className="ml-auto ml-lg-0">
                                                <Button color="primary" className="align-self-center" onClick={onActivityTypeCreate} id="tooltipAddNew">
                                                    <i className="fa fa-fw fa-pencil"></i>
                                                </Button>
                                                <UncontrolledTooltip placement="bottom" target="tooltipAddNew">
                                                    Add New Activity Type
                                                </UncontrolledTooltip>
                                            </ButtonGroup> 
                                        )}
                                        

                                    </ButtonToolbar>
                                </div>
                            </CardBody>

                            <Table className="mb-0" hover responsive>
                                <thead>
                                    <tr>
                                        <th className="align-middle bt-0 text-center">
                                            Actions
                                        </th>
                                        <th className="align-middle bt-0 text-left">Name</th>                                                                              
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        activityTypes && activityTypes.length > 0 && activityTypes.map((activityType) => (
                                            <ActivityTypeRow 
                                                props={activityType}
                                                onSelected={onSelected}
                                                onActivityTypeEdit={onActivityTypeEdit} 
                                                key={activityType.activityTypeId} 
                                                hideDelete={hideCreateButton}
                                            />
                                        )) ||
                                        <tr><td colSpan={2}>No activity type yet.</td></tr>
                                    }
                                </tbody>
                            </Table>

                            { /* END Table */}
                            {paginationContent}
                        </Card>
                    </Col>
                </Row>
            </Container>
        </React.Fragment>
    );
};

export default ListActivityTypes;