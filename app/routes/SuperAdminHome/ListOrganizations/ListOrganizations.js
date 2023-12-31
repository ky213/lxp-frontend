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
import { OrganizationRow } from "./components/OrganizationRow";
import { Paginations } from "../../components/Paginations";

import {
    HeaderDemo
} from "../../components/HeaderDemo";

const ListOrganizations = ({
        organizations, 
        onOrganizationEdit, 
        onOrganizationCreate, 
        onSearch, 
        onSelected,
        onDelete, 
        selectedOrganizations,
        pageId,
        setPageId,
        recordsPerPage,  
        totalNumberOfRecords,
        searchText
    }) => {

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
                <Row>
                    <Col lg={ 12 }>
                        <HeaderDemo 
                            no={1} 
                            // title={useIntl.formatMessage({ id: 'SuperAdminHome.Organizations'})}
                            subTitle={intl.formatMessage({ id: 'SuperAdminHome.ListOrganizations.Subtitle'})}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col lg={ 12 }>  
                        <Card className="mb-3">
                            <CardBody>
                                <div className="d-lg-flex justify-content-end">
                                    <div className="mr-auto d-flex align-items-center mb-3 mb-lg-0">
                                        <InputGroup>
                                            <Input onKeyUp={(e) => onSearch(e)} defaultValue={searchText} placeholder={intl.formatMessage({ id: 'General.SearchFor'})} />
                                            <InputGroupAddon addonType="append">
                                                <Button color="secondary" outline>
                                                    <i className="fa fa-search"></i>
                                                </Button>
                                            </InputGroupAddon>
                                        </InputGroup>
                                    </div>
                                    <ButtonToolbar>
                                     
                                        <ButtonGroup className="mr-2">
                                            {selectedOrganizations && selectedOrganizations.length > 0 && (
                                                <>
                                                    <Button color="link" className="text-decoration-none align-self-center" id="tooltipDelete"
                                                        onClick={onDelete}>
                                                        <i className="fa fa-fw fa-trash"></i>
                                                    </Button>
                                                    <UncontrolledTooltip placement="bottom" target="tooltipDelete">
                                                        {intl.formatMessage({ id: 'General.Delete'})}
                                                    </UncontrolledTooltip>
                                                </>
                                            )}
                                            
                                            
                                        </ButtonGroup>
                                      
                                        <ButtonGroup className="ml-auto ml-lg-0">
                                            <Button color="primary" className="align-self-center" onClick={() => onOrganizationCreate()} id="tooltipAddNew">
                                                <i className="fa fa-fw fa-pencil"></i>
                                            </Button>
                                            <UncontrolledTooltip placement="bottom" target="tooltipAddNew">
                                            {intl.formatMessage({ id: 'SuperAdminHome.ListOrganizations.AddNewOrganization'})}
                                            </UncontrolledTooltip>
                                        </ButtonGroup>
                                    </ButtonToolbar>
                                </div>
                            </CardBody>
                            
                            <Table className="mb-0" hover responsive>
                                <thead>
                                    <tr>
                                        <th className="align-middle bt-0 text-center">
                                            {intl.formatMessage({ id: 'General.Actions'})}
                                        </th>
                                        <th className="align-middle bt-0">{intl.formatMessage({ id: 'General.Name'})}</th>
                                        <th className="align-middle bt-0">{intl.formatMessage({ id: 'SuperAdminHome.ForegroundColor'})}</th>
                                        <th className="align-middle bt-0">{intl.formatMessage({ id: 'SuperAdminHome.BackgroundColor'})}</th>
                                        <th className="align-middle bt-0">{intl.formatMessage({ id: 'General.Status'})}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        organizations && organizations.length > 0 && organizations.map((organization) => <OrganizationRow props={organization} 
                                             key={organization.organizationId} onOrganizationEdit={onOrganizationEdit} onSelected={onSelected} />) || 
                                            <tr><td colSpan={5}>{intl.formatMessage({ id: 'SuperAdminHome.ListOrganizations.NoOrganizations'})}</td></tr>
                                    } 
                                </tbody>
                            </Table>
                           
                            { /* END Table */}
                            {paginationContent}
                        </Card>
                    </Col>
                </Row>
   
        </React.Fragment>
    );
};

export default ListOrganizations;