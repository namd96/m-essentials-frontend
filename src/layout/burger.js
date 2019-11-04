import React, { useState } from 'react';
import { slide as Menu } from 'react-burger-menu';
import { Redirect } from 'react-router-dom'
import { Nav } from 'react-bootstrap';

const Burger = props => {

    const [navigation, setNavigation] = useState(false)
    const handleClickedNavigation = (path) => {
        // if(logout){localStorage.clear()}
        setNavigation(path)
    }
    const handleClickedNavigationLogout = () => {
        localStorage.clear();
        setNavigation("/")

    }

    return <div >
        <Menu >
            <div> {"Hi, Namrata"}</div>
            {/* <div  style={{display : "flex", flexDirection : "column", justifyContent  : "space-evenly"}}> */}

            <Nav.Link href="#" onClick={handleClickedNavigation.bind(this, "/")}>Home</Nav.Link>
            <Nav.Link href="#" onClick={handleClickedNavigation.bind(this, "/edit-profile")}>Edit my profile</Nav.Link>
            {/* <Nav.Link href="#" onClick={handleClickedNavigation.bind(this, "/favorites")}>My favorites</Nav.Link> */}
            <Nav.Link href="#" onClick={handleClickedNavigation.bind(this, "/favorites")}>My favorites</Nav.Link>
            <Nav.Link href="#" onClick={handleClickedNavigation.bind(this, "/messages")}>Messages</Nav.Link>
            <Nav.Link href="#" onClick={handleClickedNavigationLogout.bind(this, "/")}>Log Out</Nav.Link>

            {/* </div> */}
        </Menu>
        {navigation && <Redirect push to={navigation} />}
    </div>
}


export default Burger;