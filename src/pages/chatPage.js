import React, { useEffect, useState } from 'react';
import openSocket from 'socket.io-client';
import { Button } from 'react-bootstrap';
import '../styles/chatpage.css'
import { requests } from '../api/agent'
const ChatPage = props => {
    const [listReceived, setListReceived] = useState([])
    console.log("chatpage rendered again",props.history)

    var myId = localStorage.getItem("userId")
    const [message, setMessage] = useState({
        message: "",
        id: props.first_id == myId ? props.second_id : props.first_id
    })
    const [socket, setSocket] = useState(false)
    const token = localStorage.getItem('userData')
    // var socket;

    const onSend = () => {
        socket.emit('chat', message)
        console.log("[track this]", message)
        setListReceived(listReceived => listReceived.concat({ text: message.message, id: message.id }))

        setMessage({
            ...message, message: ""
        })
        requests.call("post", `message/${message.id}`,{message  : message.message})
        .then((res)=>{console.log(res)})

    }
    const handleInputChange = event => {
        let msg = event.target.value;
        setMessage({
            ...message,
            message: msg

        })
    }
    useEffect(() => {
        var socket = openSocket(`${window.location.origin.replace("3000", "8060")}`);
        setSocket(socket)
        socket.emit('auth', token)
        console.log("sent authentication")
        // console.log("[list]", list)
        socket.on('chat', (data) => {
            console.log("message object", data)
            setListReceived(listReceived => listReceived.concat({ text: data.message, id: data.receiver_id }))
        });
    }, [])
    return <div>
        <div className="chat-window">
            <div style={{ color: "black" }}>
            </div>
            {
              props.history && props.history.map((message, idx) => {
                    return <div className="message-displayer"><div className={message.receiver_id != myId ? "text-container-sender" : "text-container-receiver"}>{message.message}</div></div>
                })
            }
            {
                listReceived.map((message, idx) => {
                    return <div className="message-displayer"><div className={message.id != myId ? "text-container-sender" : "text-container-receiver"}>{message.text}</div></div>
                })
            }
        </div>
        <input value={message.message} onChange={handleInputChange.bind(this)}></input>
        <Button onClick={onSend.bind(this)}>SEND</Button>

    </div>
}

// const chatWindowContainer

export default ChatPage;