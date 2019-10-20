import React from 'react';
import { Navbar, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';

const Toolbar = props => {
    return <Navbar bg="light" expand="lg" style={{position : "fixed", width : "-webkit-fill-available", zIndex :"1"}}>
            <Navbar.Brand href="/">M-Essentials</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav"   />
            <Navbar.Collapse id="basic-navbar-nav" >

            </Navbar.Collapse>
            <Form inline>
            <FormControl type="text" style={{ marginTop : "4px",width : "325px"}}   placeholder="Search..." className="mr-sm-2 m-essentials-searchbar" />
              
            </Form>
      
        </Navbar>

    
}
export default Toolbar;