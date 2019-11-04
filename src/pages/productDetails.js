import React, { useState } from 'react'
import { Button } from 'react-bootstrap';
import { Redirect } from 'react-router-dom'
import ChatPage from './chatPage';
import { useEffect } from 'react';
import { requests } from '../api/agent';
const ProductDetails = props => {
    const [redirection, setRedirection] = useState(false);
    const [messages, setMessages] = useState(false)
    const [product, setProduct] = useState(false);
    const handleChatClick = id => {
        setRedirection(!redirection)
        requests.call("get", `messages/${product.product_contact.vendor_id}`)
            .then((res) => {
                console.log(res.data)
                setMessages(res.data)
            })
    }
    useEffect(() => {
        requests.call("get", `product/${props.match.params.id}`)
            .then((res) => {
                console.log(res)
                setProduct(res.data[0])
            })
    }, [])

    return <div>

        {!redirection && !!product && <div>

            <div className="details-cointainer">
                <div className="details-image-container"><img className="product-image" src={product.product_img}></img></div>
                <div className="details-details-container">
                    <div className="product-name">{product.product_name} {` `} <span className="product-cost">Rs {` `}{product.product_cost} {` `} per  {` `} {product.quantity} {` `} {product.unit}</span></div>
                    <div className="product-cost">{product.product_description}</div>
                    <div>
                        <span className="vendor-heading">{"Vendor :"}</span>
                        <div className="product-cost">{product.product_contact.vendor_name}</div>
                        <div className="product-cost">{product.product_contact.vendor_email}</div>
                        <div className="product-cost">{product.product_contact.product_contact_no}</div>

                    </div>
                    <Button onClick={handleChatClick.bind(this, props.match.params.id)}>Chat with the vendor</Button>
                </div>
            </div>

        </div>}
        {redirection && <div>
            <Button onClick={handleChatClick.bind(this, props.match.params.id)}>See product details</Button><div className="chat-window-container">
                <ChatPage
                    history={messages}
                    first_id={product.product_contact.vendor_id}
                    second_id={localStorage.getItem("userId")}
                /></div>
        </div>}
    </div>
}

export default ProductDetails