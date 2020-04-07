import React from 'react';

import {
    Container,
    Row,
    Col,
    Card,
    Button,
    UncontrolledModal,
    ModalHeader,
    CardBody,
    CardTitle,
    CardGroup,
    ModalBody,
    ModalFooter
} from '@/components'


const AlertModal = (props) => {
    const alertType = props.variant || 'success';

    return (
        <UncontrolledModal target={props.target} className={`modal-${alertType}`}>
            <ModalHeader className="py-3" />
            <ModalBody className={`table-${alertType} text-center px-5`}>
                {props.title && <h6>{props.title}</h6>}
                {props.message}
                <UncontrolledModal.Close color="link" className={`text-${alertType}`}>
                    Close
                </UncontrolledModal.Close>
            </ModalBody>
            <ModalFooter className="py-3" />
        </UncontrolledModal>
    )
}

export default AlertModal;