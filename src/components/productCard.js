import React, { useState, useContext } from 'react';
import '../styles/productCard.css';
import '../styles/productdetails.css';
import { Card, Button } from 'react-bootstrap'
import { Redirect } from 'react-router-dom';
import GlobalContext from '../context/globalContext'
import Icon from '@material-ui/core/Icon'
   
const ProductCard = props => {
    const globalContext = useContext(GlobalContext);
        
    const [redirection, setRedirection] = useState(false)
    const [productData, setProductData] = useState(false)
    const handleViewDetailsClick = id => {
        console.log("setting to", id)
        setRedirection(id)
    }
    if (redirection) {
        console.log("redirecting to", redirection)
        return (
            <Redirect push to={`/product/${redirection}`} />

        )
    }
    return <div className="product-card-box">
        <p className="product-card-title">{props.title}</p>
        <div className="product-card-container">
            {
                !!props.productData && props.productData.map((product, idx) => {
                    return <Card key={idx} className="product-card">
                        <Card.Img variant="top" src={product.product_img} className="product-card-image" />
                        <Card.Body>
                            <Card.Title style={{ color: "black", fontSize: "24px" }}>{product.product_name}</Card.Title>
                            <span className="product-card-list-headings clamp-1">{"- "}{product.product_contact.vendor_name}</span>
                       <div style={{display : "flex", marginTop : "6px", marginBottom : "6px"}}><icon class="material-icons-outlined black" >room</icon>      <span className="product-card-list-headings clamp-1">{product.product_location}</span></div>
                            <Card.Text style={{ color: "black", fontSize: "18px" }}>
                                {/* <span className="product-card-list-headings" >{"Description :"}</span> */}
                                <span className="product-card-list-text">{product.product_description}</span>
             
                 
                            </Card.Text>
                            <div>
                                <Button variant="primary" onClick={handleViewDetailsClick.bind(this, product.product_id)}>View Details </Button>
                              
                              
                            </div>
                        </Card.Body>
                    </Card>
                })
            }
        </div>
    </div>
}

export default ProductCard;