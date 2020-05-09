import React, {useState, useEffect} from 'react';
import {
    Container,
    Card,    
    CardFooter,
    Col,
    Row,
    Table,
    Loading,
    CardBody,
    Form,
    FormGroup
} from '@/components';

import { HeaderMain } from "@/routes/components/HeaderMain";
import { HeaderDemo } from "@/routes/components/HeaderDemo";
import { Paginations } from "@/routes/components/Paginations";
import { Typeahead } from "react-bootstrap-typeahead";
import moment from 'moment';

import { reportingService, programService, residentService } from '@/services';
import {  TinCanLaunch } from '@/helpers';
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
    const [experiences, setExperiences] = React.useState([]);
    const [selectedExperiences, setSelectedExperiences] = React.useState(null);
    const [loading, setLoading] = React.useState(false);

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
            setLoading(true);
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
            
            setLoading(false);
        }
        
        fetchData();
    }, []);

    React.useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
     
            const exp = await reportingService.getExperiences({programId:selectedProgram.programId});
            setExperiences(exp.filter((v,i,a)=>a.findIndex(t=>(t === v))===i).map(e => {
                    const val = e && e.experience && JSON.parse(e.experience);
                    return {
                        name: val['en'] || val['en-US'],
                        value: val['en'] || val['en-US'],
                    }
                }
            ))
            setLoading(false);
        }
        
        fetchData();
    }, [selectedProgram]);


    const getStatements = async (program, learner, experiences) => {
        const filter = {selectedInstituteId: selectedInstitute.instituteId, limit: 100, take: 100, page: pageId};
        if(program && program.programId) {
            filter.registration = program.programId;
        }

        if(learner) {
            filter.agent = TinCanLaunch.getActor(learner);
        }

        if(experiences && experiences.length > 0) {
            filter.experiences = JSON.stringify(experiences);
        }

        const data = await reportingService.getAll(filter);
        console.log("Got statements:", data)

        setStatements(data.statements);
    }

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            await getStatements(selectedProgram, selectedLearner, selectedExperiences);
            setLoading(false);
        }
        
        fetchData();
    }, [selectedProgram, selectedLearner, selectedExperiences])

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

    const handleExperienceChange = e => {
        if (e && e.length > 0) {
            setSelectedExperiences(e);
        } else {
            setSelectedExperiences(null);
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
                                        <Typeahead
                                            clearButton
                                            id="experience"
                                            labelKey="name"
                                            options={experiences}
                                            multiple
                                            placeholder="Select experience..."
                                            onChange={handleExperienceChange}
                                        />
                                        </FormGroup>
                                        {/*
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
                                      
                                        */}
                                    </Form>
                                    </div>
                                </div>
                            </CardBody>
                            {!loading && (
                                <Table className="mb-0" hover striped responsive>
                                <thead>
                                    <tr>
                                        <th className="align-middle bt-0 text-center" width="20%">Time</th>
                                        <th className="align-middle bt-0 text-left" width="15%">Learner</th>
                                        <th className="align-middle bt-0 text-left" width="20%">Activity name</th>
                                        <th className="align-middle bt-0 text-left" width="20%">Activity description</th>
                                        <th className="align-middle bt-0 text-center" width="10%">Experience</th>
                                        <th className="align-middle bt-0 text-right" width="5%">Result</th>
                                        <th className="align-middle bt-0 text-center" width="10%">Success</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {statements && statements.map(statement => (
                                        <tr>
                                        <td className="align-middle bt-0">{moment(statement.timestamp).format('LLL')}</td>
                                        <td className="align-middle bt-0">{statement.actor.name}</td>
                                        
                                        <td className="align-middle bt-0">{statement.object.definition.name.und}</td>
                                        <td className="align-middle bt-0">{statement.object.definition.name.description}</td>
                                        <td className="align-middle bt-0">{statement.verb && statement.verb.display && (statement.verb.display.en || statement.verb.display["en-US"]) }</td>
                                        {/*"result":{"success":false,"score":{"scaled":0.36,"raw":9,"min":0,"max":25}}, */}
                                        <td className="align-middle bt-0">{statement.result && statement.result.score && statement.result.score.scaled && `${statement.result.score.scaled*100}%` || ''}</td>
                                        <td className="align-middle bt-0">{statement.result && statement.result.success }</td>
                                    </tr>
                                    ))} 
                                </tbody>
                                </Table>
                            )}
                            {loading && (
                                <Loading />
                            )}
                        
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