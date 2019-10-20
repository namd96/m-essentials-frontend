import React, { useState } from 'react';
import '../styles/productCard.css';
import { Card, Button } from 'react-bootstrap'
import { Redirect } from 'react-router-dom';
const productData = [
    {
        product_name: "Pud chatni",
        _id: "1",
        description: "It is a nutritious and delicious chutney made from multi grains and pulses originated in south India typically topped on Dosa.",
        location: "Nashik",
        img: "https://isingcakes.files.wordpress.com/2010/08/image1.jpeg",
        contact: {
            vendor_name: "Sadhana Dharurkar",
            vendor_id: "1",
            contact_number: "1234567890"
        }
    },
    {
        product_name: "Metkut",
        _id: "2",
        description: "It is a nutritious and delicious chutney made from multi grains and pulses originated in Maharashtra.",
        location: "Nashik",
        img: "https://cdn.shopify.com/s/files/1/1012/9358/products/Metkut_300x300.jpg?v=1498462238",
        contact: {
            vendor_name: "Sadhana Dharurkar",
            vendor_id: "1",
            contact_number: "1234567890"
        }
    },
    {
        product_name: "Original Ghee",
        _id: "3",
        description: "I make ghee from scratch at home with no preservatives whatsoever.",
        img: "http://milkuncle.com/wp-content/uploads/2016/11/cowsghee_milkuncle.jpg",
        location: "Nashik",
        contact: {
            vendor_name: "Sadhana Dharurkar",
            vendor_id: "1",
            contact_number: "1234567890"
        }
    },
]
const ProductCard = props => {
    const [redirection, setRedirection] = useState(false)
    const handleViewDetailsClick = id => {
        setRedirection(id)
    }
    if (redirection) {
        return (
            <Redirect push to={`/product/${redirection}`} />

        )
    }
    return <div className="product-card-box">
        <p className="product-card-title">{"Reccomended for you"}</p>
        <div className="product-card-container">
            {
                !!productData && productData.map((product, idx) => {
                    return <Card key={idx} className="product-card">
                        <Card.Img variant="top" src={product.img} className="product-card-image" />
                        <Card.Body>
                            <Card.Title style={{ color: "black", fontSize: "24px" }}>{product.product_name}</Card.Title>
                            <Card.Text style={{ color: "black", fontSize: "18px" }}>
                                <span className="product-card-list-headings" >{"Description :"}</span><span className="product-card-list-text">{product.description}</span><br />
                                <span className="product-card-list-headings" >{"Location :"}</span><span className="clamp-1">{product.location}</span><br />
                                <span className="product-card-list-headings" >{"Vendor :"}</span><span className="clamp-1">{product.contact.vendor_name}</span>
                            </Card.Text>
                            <div>
                                <Button variant="primary" onClick={handleViewDetailsClick.bind(this, product._id)}>View Details</Button>
                                <i class="material-icons-outlined"  >thumb_up</i>
                                {/* <icon >thumb_up</icon> */}
                            </div>
                        </Card.Body>
                    </Card>
                })
            }
        </div>
    </div>
}

export default ProductCard;