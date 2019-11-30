import React, { useState } from 'react';
import { Navbar, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';
import SearchBox from '../components/smartInputBox'
import { Redirect } from 'react-router-dom'
const Toolbar = props => {
    const [redirect, setRedirect] = useState(false)
    // const [redirect, setRedirection] = useState(false)
    const handleSearchInput = (query) => {
        console.log(query)

        setRedirect("/search/"+query)

    }
    const handleRedirect = (query) => {
        console.log(query)

        setRedirect(query)

    }
 
    // if (props.vendor) { return <div></div> }
    return (<Navbar bg="light" expand="lg" style={{ position: "fixed", width:  "-webkit-fill-available",paddingLeft : "5%"  ,paddingRight : "5%"   ,zIndex: "1" }}>   
       {/* { props.vendor && <Navbar.Brand style={{marginLeft : "0px"}} href="/vendor">M-Essentials</Navbar.Brand>} */}
       { props.vendor &&  document.documentElement.clientWidth > "768" &&  <Navbar.Brand style={{marginLeft : "0px"}} href="/vendor">M-Essentials</Navbar.Brand>    }
       { props.admin &&  document.documentElement.clientWidth > "768" &&  <Navbar.Brand style={{marginLeft : "0px"}} href="/superadmin">M-Essentials</Navbar.Brand> }
       { !props.admin &&  !document.documentElement.clientWidth > "768" &&  <Navbar.Brand style={{marginLeft : "0px"}} href="/">M-Essentials</Navbar.Brand> }
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" >

        </Navbar.Collapse>
        {props.vendor &&  <Nav className="mr-auto vendor-navbar-links">
                    <Nav.Link  href="#" onClick={handleRedirect.bind(this,"/vendor")}>Home</Nav.Link>
                    <Nav.Link  href="#" onClick={handleRedirect.bind(this,"/vendor/my-services")}>My Services</Nav.Link>
                    <Nav.Link  href="#" onClick={handleRedirect.bind(this,"/vendor/my-products")}>My Products</Nav.Link>
                    <Nav.Link  href="#" onClick={handleRedirect.bind(this,"/vendor/my-messages")}>Messages</Nav.Link>
          
                </Nav>
            }
        {props.admin &&  <Nav className="mr-auto vendor-navbar-links">
                    <Nav.Link  href="#" onClick={handleRedirect.bind(this,"/superadmin")}>Home</Nav.Link>
                    <Nav.Link  href="#" onClick={handleRedirect.bind(this,"/superadmin/my-requests")}>My requests</Nav.Link>
                
                </Nav>
            }
    
        <Form inline>
            {/* <FormControl type="text" style={{ marginTop : "4px",width : "325px"}}    placeholder="Search..." className="mr-sm-2 m-essentials-searchbar" /> */}
            <SearchBox wait={true}
                // handleCheckboxChange={this.handleCheckboxChange.bind(this)}
                callingApiFunction={handleSearchInput.bind(this)}
            // filtered={this.state.filtered} 
            />
        </Form>
        {redirect  && <Redirect push to={`${redirect}`} />}
    </Navbar>
    )


}
export default Toolbar;