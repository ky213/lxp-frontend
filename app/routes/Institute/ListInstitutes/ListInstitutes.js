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

const ListInstitutes = ({institutes, onInstituteEdit, onInstituteCreate, onSearch}) => {
    const [count, setCount] = React.useState(0);
    const [pageNumber, setPageNumber] = React.useState(1);


    return (
        <React.Fragment>

                <Row>
                    <Col lg={ 12 }>
                        <HeaderDemo 
                            no={1} 
                            title="Institutes" 
                            subTitle="Only for Super Admin, you can edit and enter new institutes from here"
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
                                            <Input onKeyUp={(e) => onSearch(e)} placeholder="Search for..." />
                                            <InputGroupAddon addonType="append">
                                                <Button color="secondary" outline>
                                                    <i className="fa fa-search"></i>
                                                </Button>
                                            </InputGroupAddon>
                                        </InputGroup>
                                    </div>
                                    <ButtonToolbar>
                                        {/*
                                        <ButtonGroup className="mr-2">
                                            <Button color="link" className="text-decoration-none align-self-center" id="tooltipRefresh">
                                                <i className="fa fa-fw fa-refresh"></i>
                                            </Button>
                                            <UncontrolledTooltip placement="bottom" target="tooltipRefresh">
                                                Refresh
                                            </UncontrolledTooltip>
                                            <Button color="link" className="text-decoration-none align-self-center" id="tooltipFav">
                                                <i className="fa fa-fw fa-star"></i>
                                            </Button>
                                            <UncontrolledTooltip placement="bottom" target="tooltipFav">
                                                Add to Favorites
                                            </UncontrolledTooltip>
                                            <Button color="link" className="text-decoration-none align-self-center" id="tooltipTag">
                                                <i className="fa fa-fw fa-tag"></i>
                                            </Button>
                                            <UncontrolledTooltip placement="bottom" target="tooltipTag">
                                                Tag
                                            </UncontrolledTooltip>
                                            <Button color="link" className="text-decoration-none align-self-center" id="tooltipBan">
                                                <i className="fa fa-fw fa-ban"></i>
                                            </Button>
                                            <UncontrolledTooltip placement="bottom" target="tooltipBan">
                                                Ban this User
                                            </UncontrolledTooltip>
                                            <Button color="link" className="text-decoration-none align-self-center" id="tooltipDelete">
                                                <i className="fa fa-fw fa-trash"></i>
                                            </Button>
                                            <UncontrolledTooltip placement="bottom" target="tooltipDelete">
                                                Delete
                                            </UncontrolledTooltip>
                                        </ButtonGroup>
                                        */}
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
                                        <th className="align-middle bt-0"></th>
                                        <th className="align-middle bt-0 text-right">
                                            Actions
                                        </th>
                                        <th className="align-middle bt-0"></th>
                                        <th className="align-middle bt-0">Name</th>
                                        <th className="align-middle bt-0">Foreground color</th>
                                        <th className="align-middle bt-0">Background color</th>
       
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        institutes && institutes.length > 0 && institutes.map((institute) => <InstituteRow props={institute} 
                                            onInstituteEdit={onInstituteEdit} key={institute.instituteId} />) || 
                                            <tr><td colSpan={6}>No institutes yet.</td></tr>
                                    } 
                                </tbody>
                            </Table>
                           
                            { /* END Table */}
                            <CardFooter className="d-flex justify-content-center pb-0">
                                <Paginations />
                            </CardFooter>
                        </Card>
                    </Col>
                </Row>
   
        </React.Fragment>
    );
};

export default ListInstitutes;