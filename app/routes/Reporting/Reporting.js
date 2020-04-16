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
    CardBody,
    Form,
    FormGroup
} from '@/components';

import { HeaderMain } from "@/routes/components/HeaderMain";
import { HeaderDemo } from "@/routes/components/HeaderDemo";
import { Paginations } from "@/routes/components/Paginations";
import { Typeahead } from "react-bootstrap-typeahead";
import moment from 'moment';

import { reportingService, programService, residentService, userService } from '@/services';
import { Role, TinCanLaunch } from '@/helpers';
import { useAppState } from '@/components/AppState';

const Reporting = () => {
    const [{currentUser, selectedInstitute}, dispatch] = useAppState();
    const [statements, setStatements] = useState(null);
    const [count, setCount] = React.useState(0);
    const [pageId, setPageId] = React.useState(1);
    const [totalNumberOfRecords, setTotalNumberOfRecords] = React.useState(100);  
    const [programs, setPrograms] = React.useState(null);
    const [selectedProgram, setSelectedProgram] = React.useState(null);
    const [learners, setLearners] = React.useState([]);
    const [selectedLearner, setSelectedLearner] = React.useState(null);

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

    React.useEffect(() => {
        const fetchData = async () => {
            const data = await programService.getByCurrentUser(selectedInstitute.instituteId);
            setPrograms(data);
            
            if(data && data.length == 1) {
                setSelectedProgram(data[0])
            }
            
            try {
                const learners = await residentService.getAllActive(1, 999, null, selectedInstitute.instituteId, selectedProgram && selectedProgram.programId || null);
                setLearners(learners.users.map(usr => ({employeeId: usr.employeeId, email: usr.email, fullName: `${usr.name} ${usr.surname}`})));
            }
            catch(error) {
                console.log("Error while fetching learners:", error)
            }
        }
        
        fetchData();
    }, []);

    const onSearch = (e) => {
        //console.log("Handle edited!")

    }

    const getStatements = async (program, learner) => {
        const filter = {selectedInstituteId: selectedInstitute.instituteId, limit: 100, take: 100, page: pageId};
        if(program && program.programId) {
            filter.registration = program.programId;
        }

        if(learner) {
            filter.agent = TinCanLaunch.getActor(learner);
        }

        const data = await reportingService.getAll(filter);
        console.log("Got statements:", data)
        setStatements(data.statements);
    }

    useEffect(() => {
        const fetchData = async () => {
            await getStatements(selectedProgram, selectedLearner);
        }
        
        fetchData();
    }, [selectedProgram, selectedLearner])

    const handleProgramChange = e => {
        if (e && e.length > 0) {
          setSelectedProgram(e[0]);
        } else {
            setSelectedProgram(null);
        }
    };

    const handleLearnerChange = e => {
        if (e && e.length > 0) {
          setSelectedLearner(e[0]);
        } else {
            setSelectedLearner(null);
        }
    };
    
    /*
    if(!statements) {
        return <Loading />;
    }
    */
 
    return (
        <React.Fragment>
            <Container>
                <HeaderMain title="Learner Reporting" />

                <React.Fragment>

                <Row>
                    <Col lg={ 12 }>
                        <HeaderDemo 
                            no={1} 
                            title="Reporting" 
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
                                    <Form inline>
                                        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                            <Typeahead
                                                clearButton
                                                id="programs"
                                                labelKey="name"
                                                selected={selectedProgram && programs && programs.filter(p => p.programId == selectedProgram.programId) || []}
                                                options={programs}
                                                placeholder="Program..."
                                                onChange={handleProgramChange}
                                            />
                                        </FormGroup>
                                        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                        <Typeahead
                                            clearButton
                                            id="learners"
                                            labelKey="fullName"
                                            options={learners}
                                            multiple
                                            placeholder="Select learners..."
                                            onChange={handleLearnerChange}
                                        />
                                        </FormGroup>
                                        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                           
                                            <InputGroup>
                                                <Input onKeyUp={(e) => onSearch(e)} placeholder="Search for..." />
                                                <InputGroupAddon addonType="append">
                                                    <Button color="secondary" outline>
                                                        <i className="fa fa-search"></i>
                                                    </Button>
                                                </InputGroupAddon>
                                            </InputGroup>
                                            </FormGroup>
                                        </Form>
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