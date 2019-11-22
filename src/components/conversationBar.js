import React, { useEffect, useState } from 'react';
import { requests } from '../api/agent';
import { Button } from 'react-bootstrap';
import '../styles/conversationPage.css';
import ChatPage from '../pages/chatPage';
const ConversationBar = props => {
    const [messages, setMessages] = useState(false)
    const [userId, setIds] = useState(false)
    const [message, setMessage] = useState(false)
    const [curr_id, setCurr_id] = useState(false)
    const [latestMessage, setLatestMessage] = useState({ 5: "test" })
    const [messengers, setMessengers] = useState(false)
    useEffect(() => {
        requests.call("get", `messengers`)
            .then((res) => {
                setMessengers(res.data)
                var promises = res.data.map((el) => {
                    return requests.call("get", `latest-message/${el.sender_id}`)
                        .then((res) => {
                            console.log("latest", res.data[0].message, el.sender_id)
                            setLatestMessage({
                                ...latestMessage,
                                [el.sender_id]: res.data[0].message
                            })
                            return { [el.sender_id]: res.data[0].message }
                        })

                })
                Promise.all(promises).then(function (results) {
                    console.log(results);
                    setLatestMessage(results)

                })
            })
    }, [])

    const handleCurrentChatSelector = sender_id => {
        setCurr_id(sender_id)
        requests.call("get", `messages/${sender_id}`)
            .then((res) => {
                console.log(res.data)
                setMessages(res.data)
            })
    }

    const handleLatestMessage = (id) => {


    }
    var cmdsm = 0;
    var cmdsma = 2;
    var myId = localStorage.getItem("userId");
    return (
        <div className="chat-container">
            {/* {JSON.stringify(latestMessage)} */}
            <div className="conversation-list">
                {/* {JSON.stringify(latestMessage[cmdsm])} */}
                {
                    messengers && latestMessage && messengers.map((message, idx) => {
                        return ( message.sender_id == myId ? "" :
                              <div className="conversation-bar" onClick={() => handleCurrentChatSelector(message.sender_id)}>
                                <div className="sender-name clamp-1" >{message.sender}</div>
                    <div className="latest-message" >{message.sender} : {` `}{(latestMessage[idx]) ? latestMessage[idx][message.sender_id] : ""}</div> 
                                <hr className="conversaton-separator" />
                            </div>
                        )
                    })
                }
            </div>
            <div className="current-conversation">
                {curr_id && <ChatPage history={messages} first_id={curr_id} second_id={myId} />}
                {!curr_id && <div className="sender-name" style={{padding : "3%"}}>Please click on convrsations to see the messages</div>}
                {/* <div className="messages-conversation">
                    {
                        messages && messages.map((message) => {
                            return (<div className="message-displayer">
                                <div className={message.id == localStorage.getItem("userId") ? "text-container-sender" : "text-container-receiver"}>
                                    {message.message}
                                </div>
                            </div>)
                        })
                    }
                </div>
                {messages && <div style={{ marginTop: "2%" }}> <input className="message-in"></input>
                    <Button className="message-send" >SEND</Button>

                </div>} */}

            </div>

        </div>
    )

}

export default ConversationBar;