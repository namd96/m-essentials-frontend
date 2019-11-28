import React, { useState } from 'react';
import Login from '../../components/login'
import { Button } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';

const VendorLogin = props => {
    const [login, setLogin] = useState(false)
    const [form, setForm] = useState(false)
    const loginCalled = () => {
        setLogin(true)
    }
    const handleFormOpen = (key) => {
        setForm(key)
    }

    if (form) {
       return <Redirect push to={`/vendor/create-a-${form}`} />
    }

    if (localStorage.hasOwnProperty("userData") || login) {
        return <div>
            <Button onClick={handleFormOpen.bind(this, "product")}>Create A Product</Button>
            <Button onClick={handleFormOpen.bind(this, "service")}>Create A Service</Button>
            <Button onClick={handleFormOpen.bind(this, "request")}>Create A request</Button>
        </div>
    }

    return <div>
        <Login vendor={true} loginCalled={loginCalled.bind(this)} />
    </div>
}

export default VendorLogin;