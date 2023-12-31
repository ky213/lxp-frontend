import React, { useState, useEffect } from 'react';
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
  FormGroup,
  ButtonToolbar,
  UncontrolledTooltip,
} from '@/components';
import ThemedButton from '@/components/ThemedButton';

import { HeaderMain } from '@/routes/components/HeaderMain';
import { HeaderDemo } from '@/routes/components/HeaderDemo';
import { Paginations } from '@/routes/components/Paginations';
import { Typeahead } from 'react-bootstrap-typeahead';
import moment from 'moment';
import { CSVLink } from 'react-csv';

import { reportingService, programService, learnerService } from '@/services';
import { TinCanLaunch } from '@/helpers';
import { useAppState } from '@/components/AppState';

const Reporting = () => {
  const [{ currentUser, selectedOrganization }, dispatch] = useAppState();
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
  const [csvData, setCsvData] = React.useState([]);
  const csvLink = React.useRef();

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
      const data = await programService.getByCurrentUser(
        selectedOrganization.organizationId
      );
      setPrograms(data);
      /*
            if(data && data.length == 1) {
                setSelectedProgram(data[0])
            }
            */

      try {
        const learners = await learnerService.getAllActive(
          1,
          999,
          null,
          selectedOrganization.organizationId,
          (selectedProgram && selectedProgram.programId) || null
        );
        setLearners(
          learners.users.map((usr) => ({
            employeeId: usr.employeeId,
            email: usr.email,
            fullName: `${usr.name} ${usr.surname}`,
          }))
        );
      } catch (error) {
        console.log('Error while fetching learners:', error);
      }

      setLoading(false);
    };

    fetchData();
  }, []);

  React.useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      const exp = await reportingService.getExperiences({
        programId: (selectedProgram && selectedProgram.programId) || null,
      });
      setExperiences(
        exp
          .filter((v, i, a) => a.findIndex((t) => t === v) === i)
          .map((e) => {
            const val = e && e.experience && JSON.parse(e.experience);
            return {
              name: val['en'] || val['en-US'],
              value: val['en'] || val['en-US'],
            };
          })
      );
      setLoading(false);
    };

    fetchData();
  }, [selectedProgram]);

  /*
    React.useEffect(() => {
        if(csvData && csvData.length > 1) {
            csvLink.current.link.click()
        }
    }, [csvData])
    */

  const getExport = async (program, learner, experiences) => {
    const filter = {
      selectedOrganizationId: selectedOrganization.organizationId,
      page: 1,
    };
    if (program && program.programId) {
      filter.registration = program.programId;
    }

    if (learner) {
      filter.agent = TinCanLaunch.getActor(learner);
    }

    if (experiences && experiences.length > 0) {
      filter.experiences = JSON.stringify(experiences);
    }

    const data = await reportingService.getAll(filter);

    let exportData = [];
    exportData.push([
      'Time',
      'Learner',
      'Program',
      'Activity name',
      'Activity description',
      'Experience',
      'Result',
      'Success',
    ]);

    if (data.statements) {
      data.statements.map((statement) =>
        exportData.push([
          moment(statement.timestamp).format('LLL'),
          statement.actor.name,
          (selectedProgram && selectedProgram.name) || '',
          statement.object.definition.name.und,
          statement.object.definition.name.description,
          statement.verb &&
            statement.verb.display &&
            (statement.verb.display.en || statement.verb.display['en-US']),
          (statement.result &&
            statement.result.score &&
            statement.result.score.scaled &&
            `${decimalAdjust(
              'round',
              statement.result.score.scaled * 100,
              -2
            )}%`) ||
            '',
          statement.result && statement.result.success,
        ])
      );

      setCsvData(exportData);
      csvLink.current.link.click();
    }
  };

  const getStatements = async (program, learner, experiences) => {
    const filter = {
      selectedOrganizationId: selectedOrganization.organizationId,
      limit: 100,
      take: 100,
      page: pageId,
    };
    if (program && program.programId) {
      filter.registration = program.programId;
    }

    if (learner) {
      filter.agent = TinCanLaunch.getActor(learner);
    }

    if (experiences && experiences.length > 0) {
      filter.experiences = JSON.stringify(experiences);
    }

    const data = await reportingService.getAll(filter);

    setStatements(data.statements);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await getStatements(
        selectedProgram,
        selectedLearner,
        selectedExperiences
      );
      setLoading(false);
    };

    fetchData();
  }, [selectedProgram, selectedLearner, selectedExperiences]);

  const handleProgramChange = (e) => {
    if (e && e.length > 0) {
      setSelectedProgram(e[0]);
    } else {
      setSelectedProgram(null);
    }
  };

  const handleLearnerChange = (e) => {
    if (e && e.length > 0) {
      setSelectedLearner(e[0]);
    } else {
      setSelectedLearner(null);
    }
  };

  const handleExperienceChange = (e) => {
    if (e && e.length > 0) {
      setSelectedExperiences(e);
    } else {
      setSelectedExperiences(null);
    }
  };

  function decimalAdjust(type, value, exp) {
    // If the exp is undefined or zero...
    if (typeof exp === 'undefined' || +exp === 0) {
      return Math[type](value);
    }
    value = +value;
    exp = +exp;
    // If the value is not a number or the exp is not an integer...
    if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
      return NaN;
    }
    // Shift
    value = value.toString().split('e');
    value = Math[type](+(value[0] + 'e' + (value[1] ? +value[1] - exp : -exp)));
    // Shift back
    value = value.toString().split('e');
    return +(value[0] + 'e' + (value[1] ? +value[1] + exp : exp));
  }

  /*
    if(!statements) {
        return <Loading />;
    }
    */

  const handleClickExport = async () => {
    await getExport(selectedProgram, selectedLearner, selectedExperiences);
  };

  return (
    <React.Fragment>
      <Container>
        <HeaderMain title="Learner Reporting" />

        <React.Fragment>
          <Row>
            <Col lg={12}>
              <HeaderDemo
                no={1}
                title="Reporting"
                subTitle="You can view learners results from here"
              />
            </Col>
          </Row>
          <Row>
            <Col lg={12}>
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
                            selected={
                              (selectedProgram &&
                                programs &&
                                programs.filter(
                                  (p) =>
                                    p.programId == selectedProgram.programId
                                )) ||
                              []
                            }
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
                    <ButtonToolbar>
                      <ThemedButton
                        className="align-self-center"
                        onClick={handleClickExport}
                      >
                        <i className="fa fa-fw fa-file-excel-o"></i>
                      </ThemedButton>

                      <CSVLink
                        data={csvData}
                        filename="report.csv"
                        className="hidden"
                        ref={csvLink}
                        target="_blank"
                      />
                    </ButtonToolbar>
                  </div>
                </CardBody>
                {!loading && (
                  <Table className="mb-0" hover striped responsive>
                    <thead>
                      <tr>
                        <th
                          className="align-middle bt-0 text-center"
                          width="20%"
                        >
                          Time
                        </th>
                        <th className="align-middle bt-0 text-left" width="15%">
                          Learner
                        </th>
                        <th className="align-middle bt-0 text-left" width="20%">
                          Activity name
                        </th>
                        <th className="align-middle bt-0 text-left" width="20%">
                          Activity description
                        </th>
                        <th
                          className="align-middle bt-0 text-center"
                          width="10%"
                        >
                          Experience
                        </th>
                        <th className="align-middle bt-0 text-right" width="5%">
                          Result
                        </th>
                        <th
                          className="align-middle bt-0 text-center"
                          width="10%"
                        >
                          Success
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {statements &&
                        statements.map((statement) => (
                          <tr>
                            <td className="align-middle bt-0">
                              {moment(statement.timestamp).format('LLL')}
                            </td>
                            <td className="align-middle bt-0">
                              {statement.actor.name}
                            </td>

                            <td className="align-middle bt-0">
                              {statement.object.definition.name.und}
                            </td>
                            <td className="align-middle bt-0">
                              {statement.object.definition.name.description}
                            </td>
                            <td className="align-middle bt-0">
                              {statement.verb &&
                                statement.verb.display &&
                                (statement.verb.display.en ||
                                  statement.verb.display['en-US'])}
                            </td>
                            {/*"result":{"success":false,"score":{"scaled":0.36,"raw":9,"min":0,"max":25}}, */}
                            <td className="align-middle bt-0">
                              {(statement.result &&
                                statement.result.score &&
                                statement.result.score.scaled &&
                                `${decimalAdjust(
                                  'round',
                                  statement.result.score.scaled * 100,
                                  -2
                                )}%`) ||
                                ''}
                            </td>
                            <td className="align-middle bt-0">
                              {statement.result && statement.result.success}
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </Table>
                )}
                {loading && <Loading />}

                {/* END Table */}
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
