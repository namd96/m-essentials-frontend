import React, { useState, useEffect } from 'react';
import Login from '../../components/login'
import { Button } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import { requests } from '../../api/agent';
import * as Survey from "survey-react";

const VendorLogin = props => {
    const [login, setLogin] = useState(false)
    const [cats, setCats] = useState(false)

    const loginCalled = () => {
        setLogin(true)
    }

    useEffect(() => {
        fetchCategories();
    }, [])
    const fetchCategories = () => {
        requests.call("get", "vendor/categories")
            .then((res) => {
                setCats(res.data)
            })
    }
    const jsonSample = {
        // "completedHtml": "<h3>Thank you for your feedback.</h3> <h5>Your thoughts and ideas will help us to create a great product!</h5>",
        elements: [

            { type: "text", name: "cat_name", title: "Enter category name", isRequired: true },

        ]
    }
    const onComplete = (survey, options) => {
        requests.call("post", "superadmin/category", survey.data)
            .then((res) => {
                setCats(res.data)
                survey.clear(true, true);
            })
    }
    const model = new Survey.Model(jsonSample)



    if (localStorage.hasOwnProperty("userData") || login) {
        return <div>
            <Survey.Survey model={model} onComplete={onComplete.bind(this)} />
            <div style= {{ width : "95%", margin : "0px auto"}}>
                Categories
            {cats && cats.map(cat => {
                    return <li>{cat.cat_name}</li>
                })}
            </div>
        </div>
    }

    return <div>
        <Login vendor={true} loginCalled={loginCalled.bind(this)} />
    </div>
}

export default VendorLogin;