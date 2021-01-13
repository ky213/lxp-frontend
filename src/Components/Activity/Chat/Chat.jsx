import React, { useRef, useState } from 'react';
import { connect } from 'react-redux';
import classes from './Chat.module.css';
import { useTranslation } from 'react-i18next';
import send from '../../../Assets/Images/send.svg';
import attach from '../../../Assets/Images/attach.svg';
import Message from './Message/Message';

const Chat = (props) => {
    const {t, i18n} = useTranslation();
    const fileInputRef = useRef(null);

    const [file, setFile] = useState(null);
    const [message, setMessage] = useState("");

    const onTargetClick = () => {
        fileInputRef.current.click();
    }

    const onFileInputChange = (event) => {
        setFile(event.target.files[0]);
    }

    const [tmpMessages, setTmpMessages] = useState([
        {
            text: "Hello",
            user: props.currentUser,
            itsMe: true
        },
        {
            text: "Muerto.",
            user: props.currentUser,
            itsMe: true
        },
        {
            text: "Muerto.",
            user: props.currentUser,
            itsMe: false
        }
    ])


    const sendMessage = (text) => {
        const newTmpMessages = [...tmpMessages];
        newTmpMessages.push({
            text,
            user: props.currentUser,
            itsMe: true
        });
        setTmpMessages(newTmpMessages);
        setMessage("");
    }

    let messages = tmpMessages.map(msg => {
        return <Message message={msg}/>
    })

    return(
        <div className={classes.main}>
            <div className={classes.messageList}>
                {messages}
            </div>
            <div className={classes.inputBlock}>
                <input placeholder={t("chat.messagePlaceholder")} onChange={e => setMessage(e.target.value)} value={message}/>
                
                <div className={classes.buttons}>
                    <button onClick={()=>{sendMessage(message)}}>
                        <img src={send}/>
                    </button>
                    <button onClick={()=>{onTargetClick()}}>
                        <img src={attach}/>
                    </button>
                </div>
                <input type="file" ref={fileInputRef} onChange={onFileInputChange} className={classes.hidden}/>
            </div>
        </div>
    );
}

let mapStateToProps = (state) => ({

});

export default connect(mapStateToProps, {})(Chat);