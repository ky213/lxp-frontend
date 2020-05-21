import React from "react";
import { useIntl } from "react-intl";
import { HeaderMain } from "@/routes/components/HeaderMain";
import { Container, Button, Alert } from "@/components";
import { Loading } from "@/components";
import AcademicYearsList from "./AcademicYearsList";
import EditAcademicYear from "./EditAcademicYear";
import { academicYearService, programService } from "@/services";
import { useAppState } from '@/components/AppState';

const AcademicYears = () => {
  const intl = useIntl();
  
  const [{currentUser, selectedInstitute}, dispatch] = useAppState();
  const [academicYears, setAcademicYears] = React.useState(null);
  const [academicYear, setAcademicYear] = React.useState(null);
  const [showAlert, setShowAlert] = React.useState(false);
  const [alertMessage, setAlertMessage] = React.useState(null);
  const [editForm, setEditForm] = React.useState(false);
  const [programs, setPrograms] = React.useState(null);

  React.useEffect(() => {
    getAcademicYears();
  }, []);

  const getAcademicYears = () => {
    academicYearService.getByLoggedInUser(selectedInstitute.instituteId).then(data => {
      setAcademicYears(data);
    });
  }

  const showAlertMessage = ({ message, type, title }) => {
    setAlertMessage({ title, message, type });
    setShowAlert(true);
  };

  const hideAlertMessage = () => {
    setAlertMessage(null);
    setShowAlert(false);
  };

  const handleAddNew = (e) => {
    e.preventDefault();
    hideAlertMessage();
    setEditForm(true);

    if (!programs) {
      programService.getAll(selectedInstitute.instituteId, 1, 999, null).then(data => setPrograms(data.programs));
    }
  }

  const handleEdit = (e, academicYearId) => {
    e.preventDefault();
    hideAlertMessage();
    
    if (!programs) {
      programService.getAll(selectedInstitute.instituteId, 1, 999, null).then(data => setPrograms(data.programs));
    }

    academicYearService.getById(academicYearId, selectedInstitute.instituteId).then(data => {
      setEditForm(true);
      setAcademicYear(data);
    });
  }

  const handleCancel = () => {
    hideAlertMessage();
    setEditForm(false);
    setAcademicYear(null);
  };

  const createAcademicYear = (ay) => {
    academicYearService
      .create(ay, selectedInstitute.instituteId)
      .then(data => {
        setEditForm(false);
        setAcademicYear(null);
        getAcademicYears();

        showAlertMessage({
          title: intl.formatMessage({ id: 'General.Success'}),
          message: "You have sucessfully created academic year",
          type: "success"
        });
      });
  }

  const updateAcademicYear = (ay) => {
    academicYearService
      .update(ay, selectedInstitute.instituteId)
      .then(data => {
        setEditForm(false);
        setAcademicYear(null);
        getAcademicYears();

        showAlertMessage({
          title: intl.formatMessage({ id: 'General.Success'}),
          message: "You have sucessfully created announcement",
          type: "success"
        });
      });
  }

  const onDelete = () => {
    academicYearService.deleteAcademicYear(academicYear.academicYearId, selectedInstitute.instituteId)
      .then(response => {
        setEditForm(false);
        setAcademicYear(null);
        getAcademicYears();

        showAlertMessage({
          title: intl.formatMessage({ id: 'General.Success'}),
          message: "You have sucessfully deleted the academic year",
          type: "success"
        });
      });
  }

  return (
    <React.Fragment>
      <Container>
      {showAlert && alertMessage && (
        <Alert color={alertMessage.type}>
          <h6 className="mb-1 alert-heading">{alertMessage.title}</h6>
          {alertMessage.message}
          <div className="mt-2">
            <Button color={alertMessage.type} onClick={hideAlertMessage}>
            {intl.formatMessage({ id: 'General.Dismiss'})}
            </Button>
          </div>
        </Alert>
      )}

      {editForm && (
        <React.Fragment>
            <HeaderMain title={intl.formatMessage({ id: 'AcademicYears.Title'})} />
            <EditAcademicYear
              academicYear={academicYear}
              onCancel={handleCancel}
              onDelete={onDelete}
              updateAcademicYear={updateAcademicYear}
              createAcademicYear={createAcademicYear}
              programs={programs}
            />
        </React.Fragment>
      )}

      {!editForm && (
        <React.Fragment>
            <HeaderMain title={intl.formatMessage({ id: 'AcademicYears.Title'})} />
            {!academicYears && <Loading />}
            {academicYears && (
              <AcademicYearsList
                academicYears={academicYears}
                handleEdit={handleEdit}
                handleAddNew={handleAddNew}
                getAcademicYears={getAcademicYears}
              />
            )}
        </React.Fragment>
      )}
      </Container>
    </React.Fragment>
  );
}

export default AcademicYears;