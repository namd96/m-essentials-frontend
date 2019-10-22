import React, { useEffect, useState } from 'react';
import openSocket from 'socket.io-client';
import { Button } from 'react-bootstrap';
import '../styles/chatpage.css'

const ChatPage = props => {
    const [listReceived, setListReceived] = useState([])

    const [message, setMessage] = useState({
        message: "",
        id: props.match.params.id
    })

    var socket = openSocket(`${window.location.origin.replace("3000", "8060")}`);
    const onSend = () => {
        socket.emit('chat', message)
        setMessage({
            ...message , message : ""
        })
    }
    const handleInputChange = event => {
        setMessage({
            ...message,
            message: event.target.value
        })
    }
    useEffect(() => {
        // console.log("[list]", list)
        socket.on('chat', (data) => {
            console.log(data)
           
                setListReceived(listReceived => listReceived.concat({ text: data.message , id : data.id}))
            

        });
    }, [])
    return <div  className="chat-window-container">
        <div  className="chat-window">
       
        {

            listReceived.map((message, idx) => {
                return <div className="message-displayer"><div  className={message.id==props.match.params.id ? "text-container-sender" : "text-container-receiver"}>{message.text}</div></div>
            })
        }
        </div>
        <input value={message.message} onChange={handleInputChange.bind(this)}></input>
        <Button onClick={onSend.bind(this)}>SEND</Button>
     
    </div>
}

export default ChatPage;