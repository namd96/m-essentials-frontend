import React, { useState,useEffect } from 'react';
import { slide as Menu } from 'react-burger-menu';
import { Redirect } from 'react-router-dom'
import { Nav } from 'react-bootstrap';

const Burger = props => {

    const [navigation, setNavigation] = useState(false)
    const [name, setName] = useState(false)
    const handleClickedNavigation = (path) => {
        // if(logout){localStorage.clear()}
        setNavigation(path)
    }
    const handleClickedNavigationLogout = () => {
        localStorage.clear();
        setNavigation(props.vendor ?  "/vendor" :"/")

    }
    useEffect(()=>{
        setName(localStorage.getItem("userName"))
    },[localStorage.getItem("userName")])
    return <div >
            { !props.vendor &&
        <Menu >
            <div> Hi,</div>
            {/* <div  style={{display : "flex", flexDirection : "column", justifyContent  : "space-evenly"}}> */}
            <Nav.Link href="#" onClick={handleClickedNavigation.bind(this, "/")}>Home</Nav.Link>
            <Nav.Link href="#" onClick={handleClickedNavigation.bind(this, "/edit-profile")}>Edit my profile</Nav.Link>
            <Nav.Link href="#" onClick={handleClickedNavigation.bind(this, "/favorites")}>My favorites</Nav.Link>
            <Nav.Link href="#" onClick={handleClickedNavigation.bind(this, "/messages")}>Messages</Nav.Link>
            <Nav.Link href="#" onClick={handleClickedNavigationLogout.bind(this, "/")}>Log Out</Nav.Link>
            {/* </div> */}
        </Menu>
}
            { props.vendor &&
        <Menu >
            <div> Hi,</div>
            {/* <div  style={{display : "flex", flexDirection : "column", justifyContent  : "space-evenly"}}> */}
            <Nav.Link href="#" onClick={handleClickedNavigation.bind(this, "/vendor")}>Home</Nav.Link>
            <Nav.Link href="#" onClick={handleClickedNavigation.bind(this, "/vendor/my-services")}>My Services</Nav.Link>
            <Nav.Link href="#" onClick={handleClickedNavigation.bind(this, "/vendor/my-products")}>My Products</Nav.Link>
            <Nav.Link href="#" onClick={handleClickedNavigation.bind(this, "/vendor/my-messages")}>My Messages</Nav.Link>
            <Nav.Link href="#" onClick={handleClickedNavigationLogout.bind(this, "/vendor")}>Log Out</Nav.Link>
            {/* </div> */}
        </Menu>
}
        {navigation && <Redirect push to={navigation} />}
    </div>
}


export default Burger;