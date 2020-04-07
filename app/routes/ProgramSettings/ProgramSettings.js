import React from "react";
import EditProgram from "./components/EditProgram";
import { Container, Card, CardFooter, Col, Row, Table } from "@/components";
import { HeaderMain } from "@/routes/components/HeaderMain";
import ListPrograms from '@/routes/Programs/ListPrograms';
import { authenticationService, programService } from '@/services';
import { Role } from '@/helpers';
import { HeaderDemo } from "@/routes/components/HeaderDemo";
import { CustomMessage } from './components/CustomMessage';
import { Loading } from "@/components";
import { useAppState } from '@/components/AppState';

const ProgramSettings = () => {
  const [{currentUser, selectedInstitute}, dispatch] = useAppState();
  const isProgramDirector = currentUser && currentUser.user && currentUser.user.role == Role.ProgramDirector;

  const [count, setCount] = React.useState(0);
  const [pageNumber, setPageNumber] = React.useState(1);
  const [programs, setPrograms] = React.useState(null);
  const [filteredPrograms, setFilteredPrograms] = React.useState(null);
  const [selectedProgram, setSelectedProgram] = React.useState(null);
  const [selectedProgramId, setSelectedProgramId] = React.useState(null);
  const [alertMessage, setAlertMessage] = React.useState(null);
  const [searchText, setSearchText] = React.useState(null);
  const [pageId, setPageId] = React.useState(1);
  const [recordsPerPage, setRecordsPerPage] = React.useState(15);
  const [totalNumberOfRecords, setTotalNumberOfRecords] = React.useState(0);


  const getPrograms = () => {
    programService.getAll(selectedInstitute && selectedInstitute.instituteId, pageId, recordsPerPage, searchText).then((data) => {
        setPrograms(data.programs);
        setTotalNumberOfRecords(data.totalNumberOfRecords);
        if (data.totalNumberOfRecords == 1) {
          setSelectedProgramId(data.programs[0].programId);
        }
    });
  }

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  }

  const handleProgramCreate = () => {
    /*  console.log("Handle institute create"); */
    setSelectedProgramId(null);
  }

  const handleProgramEdit = (programId) => {
    /*  console.log("Handle program edit"); */
    setAlertMessage(null);
    setSelectedProgramId(programId);

    //setSelectedProgramId(programId);
    //if (!isProgramDirector) setIsVisible(true);
  }

  const handleEdited = (message) => {
    setAlertMessage(message);
    /* if (!isProgramDirector) setIsVisible(false); */
    getPrograms();
  }

  const handleCancelUpdate = () => {
    setSelectedProgramId(null);
    getPrograms();
  }

  const handleSelected = (programId, e) => {
    /* console.log("Handle selected!", e.target.checked) */
  }

  React.useEffect(() => {
    getPrograms();
  }, [pageId, searchText]);


  return (
    <React.Fragment>
      <Container>
        <HeaderMain title="Program Settings" />

        <Row>
          <Col lg={12}>
            <HeaderDemo
              title="Edit programs"
              subTitle="You can change existing program settings below"
            />
            <CustomMessage message={alertMessage} />
          </Col>
        </Row>
        <Row>
          {selectedProgramId && <EditProgram programId={selectedProgramId} programs={programs} onEdited={handleEdited} onCancelUpdate={handleCancelUpdate} />}
          {!selectedProgramId && (
              programs && (
                <ListPrograms
                  programs={programs}
                  onSelected={handleSelected}
                  onProgramCreate={handleProgramCreate}
                  onProgramEdit={handleProgramEdit}
                  pageId={pageId}
                  setPageId={setPageId}
                  onSearch={handleSearch} 
                  recordsPerPage={recordsPerPage}
                  totalNumberOfRecords={totalNumberOfRecords}
                  searchText={searchText}
                  hideCreateButton={true}  
                />
              ) || <Loading />
          )}
      </Row>
      </Container>
    </React.Fragment>
  );
};

export default ProgramSettings;
