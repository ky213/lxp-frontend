import React from "react";
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
  return (
    <React.Fragment>
      <Modal isOpen={isOpen} className="modal-outline-primary">
        <ModalHeader tag="h6">Academic year deletion</ModalHeader>
        <ModalBody>
          <Row>
            <Col>
              <p>
                Are you sure you want to delete this academic year?
              </p>              
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter>
          <Button onClick={handleDeletion} type="button" color="danger">Delete</Button>
          <Button type="button" color="light" onClick={cancelDeletion}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </React.Fragment>
  );
};

export default AcademicYearDeletionModal;
