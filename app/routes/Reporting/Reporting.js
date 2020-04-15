import React, {useState, useEffect} from 'react';
import {
    Container,
    Card,    
    CardFooter,
    Col,
    Row,
    Table,
    Button, 
    InputGroup,
    Input,
    InputGroupAddon,
    CardBody
} from '@/components';

import { reportingService } from '@/services';
import { HeaderMain } from "@/routes/components/HeaderMain";
import { HeaderDemo } from "@/routes/components/HeaderDemo";
import { Paginations } from "@/routes/components/Paginations";
import moment from 'moment';

import { authenticationService } from '@/services';
import { Role } from '@/helpers';
import { useAppState } from '@/components/AppState';

const Reporting = () => {
    const [{currentUser, selectedInstitute}, dispatch] = useAppState();
    const [statements, setStatements] = useState(null);
    const [count, setCount] = React.useState(0);
    const [pageId, setPageId] = React.useState(1);
    const [totalNumberOfRecords, setTotalNumberOfRecords] = React.useState(100);  

    let paginationContent = null;
    if (totalNumberOfRecords > 0) {
      paginationContent = (
        <CardFooter className="d-flex justify-content-center pb-0">
          <Paginations
            pageId={pageId}
            setPageId={setPageId}
            totalNumber={totalNumberOfRecords}
            recordsPerPage={100}
          />
        </CardFooter>
      );
    }

    const onSearch = (e) => {
        //console.log("Handle edited!")
       
        
    }

    const getStatements = async () => {
        const data = await reportingService.getAll({selectedInstituteId: selectedInstitute.instituteId, limit: 100, take: 100, page: pageId});
        console.log("Got statements:", data)
        setStatements(data.statements);
    }

    useEffect(() => {
        const fetchData = async () => {
            await getStatements();
        }

        fetchData();
    }, [])
    
    /*
    if(!statements) {
        return <Loading />;
    }
    */
 
    return (
        <React.Fragment>
            <Container>
                <HeaderMain title="Reporting" />

                <React.Fragment>

                <Row>
                    <Col lg={ 12 }>
                        <HeaderDemo 
                            no={1} 
                            title="Learner Reporting" 
                            subTitle="You can view learners results from here"
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
                                </div>
                            </CardBody>
                            
                            <Table className="mb-0" hover striped responsive>
                                <thead>
                                    <tr>
                                        <th className="align-middle bt-0 text-center">Time</th>
                                        <th className="align-middle bt-0 text-left">Learner</th>
                                       
                                        <th className="align-middle bt-0">Activity name</th>
                                        <th className="align-middle bt-0">Activity description</th>
                                        <th className="align-middle bt-0">Experience</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {statements && statements.map(statement => (
                                        <tr>
                                        <td className="align-middle bt-0 text-center">{moment(statement.timestamp).format('LLL')}</td>
                                        <td className="align-middle bt-0 text-left">{statement.actor.name}</td>
                                        
                                        <td className="align-middle bt-0">{statement.object.definition.name.und}</td>
                                        <td className="align-middle bt-0">{statement.object.definition.name.description}</td>
                                        <td className="align-middle bt-0">{statement.verb && statement.verb.display && (statement.verb.display.en || statement.verb.display["en-US"]) }</td>
                                    </tr>
                                    ))} 
                                </tbody>
                            </Table>
                        
                            { /* END Table */}
                            {paginationContent}
                        </Card>
                    </Col>
                </Row>

                </React.Fragment>
            </Container>
        </React.Fragment>
    );
};

export default Reporting;