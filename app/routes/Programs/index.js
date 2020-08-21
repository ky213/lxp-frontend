import React from 'react';
import { Container, Card, CardFooter, Col, Row, Table } from '@/components';

import { HeaderMain } from '@/routes/components/HeaderMain';
import AddEditProgram from './AddEditProgram';
import ListPrograms from './ListPrograms';
import { programService } from '@/services';
import { Role } from '@/helpers';

import { HeaderDemo } from '@/routes/components/HeaderDemo';
import { useAppState } from '@/components/AppState';

const Programs = () => {
  const [{ currentUser, selectedOrganization }, dispatch] = useAppState();
  const isSuperAdmin =
    currentUser && currentUser.user && currentUser.user.role == Role.SuperAdmin;

  const [programs, setPrograms] = React.useState([]);
  const [selectedProgramId, setSelectedProgramId] = React.useState(null);

  const [showProgramForm, setShowProgramForm] = React.useState(false);
  const [searchText, setSearchText] = React.useState(null);
  const [pageId, setPageId] = React.useState(1);
  const [recordsPerPage, setRecordsPerPage] = React.useState(15);
  const [totalNumberOfRecords, setTotalNumberOfRecords] = React.useState(0);
  const [selectedPrograms, setSelectedPrograms] = React.useState([]);

  const getPrograms = () => {
    programService
      .getAll(
        selectedOrganization && selectedOrganization.organizationId,
        pageId,
        recordsPerPage,
        searchText
      )
      .then((data) => {
        setPrograms(data.programs);
        setTotalNumberOfRecords(data.totalNumberOfRecords);
      });
  };

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  const handleDelete = async () => {
    const message =
      selectedPrograms.length == 1 ? 'this program' : 'these programs';
    if (confirm(`Are you sure you want to delete ${message}?`)) {
      try {
        await programService.deletePrograms(selectedPrograms);
        getPrograms();
        setSelectedPrograms([]);
      } catch (error) {
        console.log('Error while deleting programs:', error);
        alert(`Something went wrong while deleting ${message}!`);
      }
    }
  };

  const handleProgramCreate = () => {
    setSelectedProgramId(null);
    setShowProgramForm(true);
  };

  const handleCancelCreate = () => {
    /* console.log("Handle cancel create"); */
    setSelectedProgramId(null);
    setShowProgramForm(false);
    //setSelectedProgramId(currentUser && currentUser.user && currentUser.user.organizationId);
  };

  const handleProgramEdit = (programId) => {
    setSelectedProgramId(programId);
    setShowProgramForm(true);
  };

  const handleEdited = () => {
    getPrograms();
    setSelectedProgramId(null);
    setShowProgramForm(false);
  };

  const handleSelected = (programId, e) => {
    if (e.target.checked) {
      setSelectedPrograms([...selectedPrograms, programId]);
    } else {
      setSelectedPrograms(selectedPrograms.filter((p) => p != programId));
    }
  };

  React.useEffect(() => {
    getPrograms();
  }, [pageId, searchText]);

  return (
    <React.Fragment>
      <Container>
        <HeaderMain title={`${(showProgramForm && 'Program') || 'Programs'}`} />

        {showProgramForm && (
          <>
            <Row>
              <Col lg={12}>
                <HeaderDemo
                  title="Create/Edit program"
                  subTitle="You can create a new program or change existing program settings like the name, program director, etc. here"
                />
              </Col>
            </Row>
            <Row>
              <AddEditProgram
                programId={selectedProgramId}
                onEdited={handleEdited}
                onCancelCreate={handleCancelCreate}
              />
            </Row>
          </>
        )}

        {!showProgramForm && (
          <>
            <Row>
              <Col lg={12}>
                <HeaderDemo
                  no={1}
                  title="Programs"
                  subTitle="You can search, edit and create new programs from here"
                />
              </Col>
            </Row>
            <Row>
              <ListPrograms
                programs={programs}
                onSearch={handleSearch}
                onDelete={handleDelete}
                onSelected={handleSelected}
                onProgramCreate={handleProgramCreate}
                onProgramEdit={handleProgramEdit}
                pageId={pageId}
                setPageId={setPageId}
                onSearch={handleSearch}
                recordsPerPage={recordsPerPage}
                totalNumberOfRecords={totalNumberOfRecords}
                searchText={searchText}
                selectedPrograms={selectedPrograms}
              />
            </Row>
          </>
        )}
      </Container>
    </React.Fragment>
  );
};

export default Programs;
