import React, { useState } from 'react'
import { Button } from 'react-bootstrap';
import { Redirect } from 'react-router-dom'
import ChatPage from './chatPage';
import CardBox from '../components/cardbox';
import { useEffect } from 'react';
import { requests } from '../api/agent';
const ServiceDetails = props => {
    const [redirection, setRedirection] = useState(false);
    const [messages, setMessages] = useState(false)
    const [service, setService] = useState(false);
    const [services, setServices] = useState(false);
    const handleChatClick = id => {
        setRedirection(!redirection)
        requests.call("get", `messages/${service.user_id}`)
            .then((res) => {
                console.log(res.data)
                setMessages(res.data)
            })
    }
    useEffect(() => {
        requests.call("get", `meta-service/${props.match.params.id}`)
            .then((res) => {
                console.log(res)
                setService( res.data ? res.data[0] : false)
            })
        requests.call("get", `services/${props.match.params.id}`)
            .then((res) => {
                console.log(res)
                setServices( res.data ? res.data : false)
            })
    }, [])

    return <div>
        {!redirection && !!service && <div style= {{ paddingBottom : "2%"}}>

            <div className="details-cointainer">
                <div className="details-image-container"><img className="product-image" src={service.meta_service_img}></img></div>
                <div className="details-details-container">
                    <div className="product-name">{service.meta_service_name} {` `} <span className="product-cost">Rs {` `}{service.meta_cost}</span></div>
                    <div className="product-cost">{service.meta_desc}</div>
                    <div>
                        <span className="vendor-heading">{"Vendor :"}</span>
                        <div className="product-cost">{service.user_name}</div>
                        <div className="product-cost">{service.user_email}</div>
                        <div className="product-cost">{service.user_contact_no}</div>

                    </div>
                    <Button onClick={handleChatClick.bind(this, props.match.params.id)}>Chat with the vendor</Button>
                </div>  
            </div>

        </div>}
     {!redirection && !!services &&   <CardBox serviceData={services} title={"What are you looking for?"}  subServiceCard={true} />
       }
        {redirection && <div>
            <Button onClick={handleChatClick.bind(this, props.match.params.id)}>See service details</Button><div className="chat-window-container">
                <ChatPage
                    history={messages}
                    first_id={service.user_id}
                    second_id={localStorage.getItem("userId")}
                /></div>
        </div>}
    </div>
}

export default ServiceDetails