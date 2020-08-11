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
import { ProgramRow } from "./components/ProgramRow";
import { Paginations } from "@/routes/components/Paginations";
import { useAppState } from '@/components/AppState';
import { Role } from '@/helpers';
import {
    HeaderDemo
} from "@/routes/components/HeaderDemo";

const ListPrograms = ({ programs, onProgramEdit, onProgramCreate, onSearch, onSelected, onDelete,
    pageId,
    setPageId,
    recordsPerPage,  
    totalNumberOfRecords,
    selectedPrograms,
    searchText,
    hideCreateButton }) => {

    const [{currentUser, selectedOrganization}, dispatch] = useAppState();
    const isProgramDirector = currentUser && currentUser.user && currentUser.user.role == Role.ProgramDirector;

    const intl = useIntl();

    if (isProgramDirector)
        hideCreateButton = true;

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
                                       {selectedPrograms && selectedPrograms.length > 0 && (
                                        <ButtonGroup className="mr-2">
                                            <Button color="link" onClick={onDelete} className="text-decoration-none align-self-center" id="tooltipDelete">
                                                <i className="fa fa-fw fa-trash"></i>
                                            </Button>
                                            <UncontrolledTooltip placement="bottom" target="tooltipDelete">
                                            {intl.formatMessage({ id: 'General.Delete'})}
                                            </UncontrolledTooltip>
                                        </ButtonGroup>
                                       )}
                                        
                                        {!hideCreateButton && (
                                            <ButtonGroup className="ml-auto ml-lg-0">
                                                <Button color="primary" className="align-self-center" onClick={onProgramCreate} id="tooltipAddNew">
                                                    <i className="fa fa-fw fa-pencil"></i>
                                                </Button>
                                                <UncontrolledTooltip placement="bottom" target="tooltipAddNew">
                                                    Add New Program
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
                                        <th className="align-middle bt-0 text-left">Program director/s</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        programs && programs.length > 0 && programs.map((program) => (
                                            <ProgramRow 
                                                props={program}
                                                onSelected={onSelected}
                                                onProgramEdit={onProgramEdit} 
                                                key={program.programId} 
                                                hideDelete={hideCreateButton}
                                            />
                                        )) ||
                                        <tr><td colSpan={3}>No programs yet.</td></tr>
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

export default ListPrograms;