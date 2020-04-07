import React, { useState } from 'react';
import {
    Button,
    Alert
} from "@/components";

export const CustomMessage = (message) => {

    const [showAlert, setShowAlert] = React.useState(false);
    const [alertMessage, setAlertMessage] = React.useState(null);

    const dismissAlert = () => {
        setAlertMessage(null);
        setShowAlert(false);
    }

    React.useEffect(() => {
        if (message.message) {

            setAlertMessage(message.message);
            setShowAlert(true);
        } else {
            setShowAlert(false);
        }
    }, [message]);


    return (

        showAlert && alertMessage && (
            <Alert color={alertMessage.type}>
                <h6 className="mb-1 alert-heading">
                    {alertMessage.title}
                </h6>
                {alertMessage.message}
                <div className="mt-2">
                    <Button
                        color={alertMessage.type}
                        onClick={dismissAlert}
                    >
                        Dismiss
                </Button>
                </div>
            </Alert>
        )
    )
}

export default CustomMessage;