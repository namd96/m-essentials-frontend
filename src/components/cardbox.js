import React, { useState, useContext, Profiler, useEffect } from 'react';
import '../styles/productCard.css';
import '../styles/productdetails.css';
// import { Card, Button } from 'react-bootstrap'
import GlobalContext from '../context/globalContext'
import ServiceCardSingle from './serviceCardSingle'
import ProductCardSingle from './productCardSingle'
import SubServiceCardSingle from './subSeriveCardSingle'
import { Card, Button } from 'react-bootstrap'
import { Redirect } from 'react-router-dom';
import Slider from "react-slick";
var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1
};

const ServiceCard = props => {
    const globalContext = useContext(GlobalContext);

    const bull = <span >•</span>;
    const [viewPortWidth, setViewPortWidth] = useState(false);
    // const classes = useStyles();
    const [redirection, setRedirection] = useState(false)
    const [serviceData, setserviceData] = useState(false)
    const [expanded, setExpanded] = React.useState(false);
    // const useStyles = makeStyles(theme => ({

    //     expand: {
    //       transform: 'rotate(0deg)',
    //       marginLeft: 'auto',
    //       transition: theme.transitions.create('transform', {
    //         duration: theme.transitions.duration.shortest,
    //       }),
    //     },
    //     expandOpen: {
    //       transform: 'rotate(180deg)',
    //     },
    //     avatar: {
    //       backgroundColor: red[500],
    //     },
    //   }));
    // const classes = useStyles();
    useEffect(() => {
        setViewPortWidth(document.documentElement.clientWidth)

    }, [])

    const handleViewDetailsClick = (id,key) => {
        console.log("setting to", id)
        setRedirection({id,key})
    }
    if (redirection) {
        console.log("redirecting to", redirection)
        return (
            <Redirect push to={`/${redirection.key}/${redirection.id}`} />

        )
    }
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    if (viewPortWidth < "768") {
        return (
            <div className="product-card-box">
                <p className="product-card-title">{props.title}</p>
                <div className="product-card-container">
                     { props.serviceCard ?  
                        !!props.serviceData && props.serviceData.map((service, idx) => {
                            return <Card key={idx} className="product-card">
                                <Card.Img variant="top" src={service.service_img} className="product-card-image" />
                                <Card.Body>
                                    <Card.Title style={{ color: "black", fontSize: "24px" }}>{service.meta_service_name}</Card.Title>
                                    <span className="product-card-list-headings clamp-1">{"- "}{service.user_name}</span>
                                    <div style={{ display: "flex", marginTop: "6px", marginBottom: "6px" }}><icon class="material-icons-outlined black" >room</icon>      <span className="product-card-list-headings clamp-1">{service.service_location}</span></div>
                                    <Card.Text style={{ color: "black", fontSize: "18px" }}>
                                        {/* <span className="product-card-list-headings" >{"Description :"}</span> */}
                                        <span className="product-card-list-text">{service.meta_desc}</span>


                                    </Card.Text>
                                    <div>
                                        <Button variant="primary" onClick={handleViewDetailsClick.bind(this, service.meta_service_id,"service")}>View Details </Button>


                                    </div>
                                </Card.Body>
                            </Card>
                        })
                     : props.productCard ? 

                        !!props.productData && props.productData.map((product, idx) => {
                            return <Card key={idx} className="product-card">
                                <Card.Img variant="top" src={product.product_img} className="product-card-image" />
                                <Card.Body>
                                    <Card.Title style={{ color: "black", fontSize: "24px" }}>{product.product_name}</Card.Title>
                                    <span className="product-card-list-headings clamp-1">{"- "}{product.product_contact.vendor_name}</span>
                                    <div style={{ display: "flex", marginTop: "6px", marginBottom: "6px" }}><icon class="material-icons-outlined black" >room</icon>      <span className="product-card-list-headings clamp-1">{product.product_location}</span></div>
                                    <Card.Text style={{ color: "black", fontSize: "18px" }}>
                                        {/* <span className="product-card-list-headings" >{"Description :"}</span> */}
                                        <span className="product-card-list-text">{product.product_description}</span>
                                    </Card.Text>
                                    <div>
                                        <Button variant="primary" onClick={handleViewDetailsClick.bind(this, product.product_id, "product")}>View Details </Button>
                                    </div>
                                </Card.Body>
                            </Card>
                        })
                    : props.subServiceCard ?  
                        !!props.serviceData && props.serviceData.map((service, idx) => {
                            return <Card key={idx} className="product-card">
                                <Card.Img variant="top" src={service.service_img} className="product-card-image" />
                                <Card.Body>
                                    <Card.Title style={{ color: "black", fontSize: "24px" }}>{service.service_name}</Card.Title>
                                    <span className="product-card-list-headings clamp-1">{"- "}{service.user_name}</span>
                                    <div style={{ display: "flex", marginTop: "6px", marginBottom: "6px" }}><icon class="material-icons-outlined black" >room</icon>      <span className="product-card-list-headings clamp-1">{service.location}</span></div>
                                    <Card.Text style={{ color: "black", fontSize: "18px" }}>
                                        {/* <span className="product-card-list-headings" >{"Description :"}</span> */}
                                        <span className="product-card-list-text"> { service.menu && 
                                        service.menu.map((item, idx)=>{
                                           return idx ? ", " + item.name__ : item.name__ 
                                        })
                                        
                                        }</span>
                                    </Card.Text>
                                    <div>
                                        {/* <Button variant="primary" onClick={handleViewDetailsClick.bind(this, service.meta_service_id)}>View Details </Button> */}


                                    </div>
                                </Card.Body>
                            </Card>
                        }) 
                        : ""
                    }
                
                </div>
            </div>
        )
    }

    return <div className="product-card-box">
        <p className="product-card-title">{props.title}</p>
        <hr />


        {
            (props.serviceCard) ?
            <Slider {...settings}>
                {
                    !!props.serviceData && props.serviceData.map((service, idx) => {

                        return <div style={{ padding: "8%" }}>
                            <ServiceCardSingle service={service} />
                        </div>
                    })
                }
            </Slider> : props.productCard ?     <Slider {...settings}>
            {
                !!props.productData && props.productData.map((product, idx) => {

                    return <div style={{ padding: "8%" }}>
                        <ProductCardSingle product={product} />
                    </div>
                })
            }
        </Slider> :  props.subServiceCard ? 
         <Slider {...settings}>
            {
                !!props.serviceData && props.serviceData.map((service, idx) => {

                    return <div style={{ padding: "8%" }}>
                            <SubServiceCardSingle service={service} />
                        </div>
                })
            }
        </Slider>
         : ""

        }



    </div>
}

export default ServiceCard;