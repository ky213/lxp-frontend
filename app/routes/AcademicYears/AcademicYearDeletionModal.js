import React from "react";
import { useIntl } from "react-intl";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Row,
  Col,
  Input
} from "@/components";
import ThemedButton from "@/components/ThemedButton";

const AcademicYearDeletionModal = ({isOpen, handleDeletion, cancelDeletion}) => {
  const intl = useIntl();

  return (
    <React.Fragment>
      <Modal isOpen={isOpen} className="modal-outline-primary">
        <ModalHeader tag="h6">{intl.formatMessage({ id: 'AcademicYears.TitleDeletion'})}</ModalHeader>
        <ModalBody>
          <Row>
            <Col>
              <p>
              {intl.formatMessage({ id: 'AcademicYears.DeleteConfirmationMessage'})}
              </p>              
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter>
          <Button onClick={handleDeletion} type="button" color="danger">{intl.formatMessage({ id: 'General.Delete'})}</Button>
          <Button type="button" color="light" onClick={cancelDeletion}>
            {intl.formatMessage({ id: 'General.Cancel'})}
          </Button>
        </ModalFooter>
      </Modal>
    </React.Fragment>
  );
};

export default AcademicYearDeletionModal;
