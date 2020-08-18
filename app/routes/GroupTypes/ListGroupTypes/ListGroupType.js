import React from 'react';
import { useIntl } from "react-intl";
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
import { GroupTypeRow } from "./components/GroupTypeRow";
import { Paginations } from "@/routes/components/Paginations";

import {
    HeaderDemo
} from "@/routes/components/HeaderDemo";

const ListGroupTypes = ({ groupTypes, onGroupTypeEdit, onGroupTypeCreate, onSearch, onSelected,
    pageId,
    setPageId,
    recordsPerPage,  
    totalNumberOfRecords,
    selectedGroupTypes,
    searchText,
    hideCreateButton }) => {

    const intl = useIntl();
    
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
                                       {selectedGroupTypes && selectedGroupTypes.length > 0 && (
                                        <ButtonGroup className="mr-2">
                                            <Button color="link" className="text-decoration-none align-self-center" id="tooltipDelete">
                                                <i className="fa fa-fw fa-trash"></i>
                                            </Button>
                                            <UncontrolledTooltip placement="bottom" target="tooltipDelete">
                                            {intl.formatMessage({ id: 'General.Delete'})}
                                            </UncontrolledTooltip>
                                        </ButtonGroup>
                                       )}
                                        
                                        {!hideCreateButton && (
                                            <ButtonGroup className="ml-auto ml-lg-0">
                                                <Button color="primary" className="align-self-center" onClick={onGroupTypeCreate} id="tooltipAddNew">
                                                    <i className="fa fa-fw fa-pencil"></i>
                                                </Button>
                                                <UncontrolledTooltip placement="bottom" target="tooltipAddNew">
                                                    Add New Group Type
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
                                        groupTypes && groupTypes.length > 0 && groupTypes.map((groupType) => (
                                            <GroupTypeRow 
                                                props={groupType}
                                                onSelected={onSelected}
                                                onGroupTypeEdit={onGroupTypeEdit} 
                                                key={groupType.groupTypeId} 
                                                hideDelete={hideCreateButton}
                                            />
                                        )) ||
                                        <tr><td colSpan={2}>No group type yet.</td></tr>
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

export default ListGroupTypes;