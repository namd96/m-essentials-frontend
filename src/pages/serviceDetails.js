import React, { useState } from 'react'
import { Button } from 'react-bootstrap';
import { Redirect } from 'react-router-dom'
import ChatPage from './chatPage';
import { useEffect } from 'react';
import { requests } from '../api/agent';
const ServiceDetails = props => {
    const [redirection, setRedirection] = useState(false);
    const [messages, setMessages] = useState(false)
    const [service, setService] = useState(false);
    const handleChatClick = id => {
        setRedirection(!redirection)
        requests.call("get", `messages/${service.user_id}`)
            .then((res) => {
                console.log(res.data)
                setMessages(res.data)
            })
    }
    useEffect(() => {
        requests.call("get", `service/${props.match.params.id}`)
            .then((res) => {
                console.log(res)
                setService( res.data ? res.data[0] : false)
            })
    }, [])

    return <div>

        {!redirection && !!service && <div>

            <div className="details-cointainer">
                <div className="details-image-container"><img className="service-image" src={service.service_img}></img></div>
                <div className="details-details-container">
                    <div className="service-name">{service.service_name} {` `} <span className="service-cost">Rs {` `}{service.service_cost} {` `} per  {` `} {service.quantity} {` `} {service.unit}</span></div>
                    <div className="service-cost">{service.service_description}</div>
                    <div>
                        <span className="vendor-heading">{"Vendor :"}</span>
                        <div className="service-cost">{service.user_name}</div>
                        <div className="service-cost">{service.user_email}</div>
                        <div className="service-cost">{service.service_contact_no}</div>

                    </div>
                    <Button onClick={handleChatClick.bind(this, props.match.params.id)}>Chat with the vendor</Button>
                </div>
            </div>

        </div>}
        {redirection && <div>
            <Button onClick={handleChatClick.bind(this, props.match.params.id)}>See service details</Button><div className="chat-window-container">
                <ChatPage
                    history={messages}
                    first_id={service.service_contact.vendor_id}
                    second_id={localStorage.getItem("userId")}
                /></div>
        </div>}
    </div>
}

export default ServiceDetails