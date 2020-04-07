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
import { InstituteRow } from "./components/InstituteRow";
import { Paginations } from "../../components/Paginations";

import {
    HeaderDemo
} from "../../components/HeaderDemo";

const ListInstitutes = ({
        institutes, 
        onInstituteEdit, 
        onInstituteCreate, 
        onSearch, 
        onSelected,
        onDelete, 
        selectedInstitutes,
        pageId,
        setPageId,
        recordsPerPage,  
        totalNumberOfRecords,
        searchText
    }) => {


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
                            title="Institutes" 
                            subTitle="You can select your working institute, edit existing and enter new institutes from here"
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
                                            <Input onKeyUp={(e) => onSearch(e)} defaultValue={searchText} placeholder="Search for..." />
                                            <InputGroupAddon addonType="append">
                                                <Button color="secondary" outline>
                                                    <i className="fa fa-search"></i>
                                                </Button>
                                            </InputGroupAddon>
                                        </InputGroup>
                                    </div>
                                    <ButtonToolbar>
                                     
                                        <ButtonGroup className="mr-2">
                                            {selectedInstitutes && selectedInstitutes.length > 0 && (
                                                <>
                                                    <Button color="link" className="text-decoration-none align-self-center" id="tooltipDelete"
                                                        onClick={onDelete}>
                                                        <i className="fa fa-fw fa-trash"></i>
                                                    </Button>
                                                    <UncontrolledTooltip placement="bottom" target="tooltipDelete">
                                                        Delete
                                                    </UncontrolledTooltip>
                                                </>
                                            )}
                                            
                                            
                                        </ButtonGroup>
                                      
                                        <ButtonGroup className="ml-auto ml-lg-0">
                                            <Button color="primary" className="align-self-center" onClick={() => onInstituteCreate()} id="tooltipAddNew">
                                                <i className="fa fa-fw fa-pencil"></i>
                                            </Button>
                                            <UncontrolledTooltip placement="bottom" target="tooltipAddNew">
                                                Add New Institute
                                            </UncontrolledTooltip>
                                        </ButtonGroup>
                                    </ButtonToolbar>
                                </div>
                            </CardBody>
                            
                            <Table className="mb-0" hover responsive>
                                <thead>
                                    <tr>
                                        <th className="align-middle bt-0 text-center">
                                            Actions
                                        </th>
                                        <th className="align-middle bt-0">Name</th>
                                        <th className="align-middle bt-0">Foreground color</th>
                                        <th className="align-middle bt-0">Background color</th>
                                        <th className="align-middle bt-0">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        institutes && institutes.length > 0 && institutes.map((institute) => <InstituteRow props={institute} 
                                             key={institute.instituteId} onInstituteEdit={onInstituteEdit} onSelected={onSelected} />) || 
                                            <tr><td colSpan={5}>No institutes have been created yet.</td></tr>
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

export default ListInstitutes;