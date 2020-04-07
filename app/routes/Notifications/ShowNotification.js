import React from 'react';
import {
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    Row,
    Col,
    Card,
    CardBody,
    FormGroup,
    Label,
    CustomInput,
    InputGroup,
    InputGroupAddon,
    InvalidFeedback,
    Table,
    TabPane,
    Badge,
    Nav,
    NavItem,
    UncontrolledTabs
  } from "@/components";

import moment from 'moment';
import {notificationService} from '@/services';
import { useAppState } from '@/components/AppState';
import ThemedButton from "@/components/ThemedButton";

const notificationIcons = [
    {
        type: "WARNING",
        icon: (<i className="fa fa-5x fa-exclamation fa-fw modal-icon mb-3"></i>),
        className: 'warning'
    },
    {
        type: "ERROR",
        icon: <i className="fa fa-5x fa-close fa-fw modal-icon mb-3"></i>,
        className: 'danger'
    },
    {
        type: "INFO",
        icon: (<i className="fa fa-5x fa-info fa-fw modal-icon mb-3"></i>),
        className: 'primary'
    }
  ];

export const ShowNotification = ({toggle, isOpen, selectedNotification, onSuccess}) => {
    if(!selectedNotification) return null;

    const [{currentUser}, dispatch] = useAppState();

    const setNotificationRead = async (read) => {
        try {
            await notificationService.setRead({notificationId:selectedNotification.notificationId, isRead: read});
            alert(`You have successfully marked this notification as ${read  && "read" ||  "unread"}!`);
            onSuccess();
        }
        catch(error) {
            console.log("Error while updating read status of the notification:", error)
            alert("We're sorry but something went wrong while we were updating this notification!");
        }
        
        toggle();
    }

    const notificationInfo = selectedNotification && notificationIcons.filter(x => x.type == selectedNotification.notificationType)[0]; 

    return (<>
        {selectedNotification && (
            <Modal toggle={toggle} isOpen={isOpen} className={`modal-${notificationInfo.className}`} size="lg">
                <ModalHeader className="py-3" />
                <ModalBody  className={`table-${notificationInfo.className} text-center px-5`}>
                    {notificationInfo.icon}
                    <h6>{selectedNotification.notificationTypeName}</h6>
                    <p className="modal-text" dangerouslySetInnerHTML={{ __html: selectedNotification.text }} />  
                    <p className="modal-text"><small>{moment(selectedNotification.generated).format('LLLL')}</small></p>                                         
                </ModalBody>
                <ModalFooter className="py-3">
                    <Button type="button" className="mr-2" color={notificationInfo.className} 
                        onClick={() => setNotificationRead(!selectedNotification.isRead)}>{selectedNotification.isRead && "Mark as unread" || "Mark as read"}
                    </Button>
                    <Button type="button" onClick={toggle} color="link">Close</Button>
                </ModalFooter>
            </Modal>
        )}
    </>)   
}
