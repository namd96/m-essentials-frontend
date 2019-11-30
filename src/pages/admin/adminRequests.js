import React, { useState, useEffect } from 'react';
import Login from '../../components/login'
import { Redirect } from 'react-router-dom';
import { requests } from '../../api/agent';
import * as Survey from "survey-react";
import { Table, Button, Modal, FormControl, OverlayTrigger, Popover } from 'react-bootstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
var columns = []
const VendorLogin = props => {
    const [login, setLogin] = useState(false)
    const [reqs, setReqs] = useState(false)

    const loginCalled = () => {
        setLogin(true)
    }

    useEffect(() => {
        fetchCategories();
         columns = [
            {
                dataField: 'req_id',
                text: '#'
            },
            {
                dataField: 'title',
                text: 'title'
            },
            {
                dataField: '',
                text: 'Approve',
                formatter: approveFormatter
            },
        ]
    }, [])
    const fetchCategories = () => {
        requests.call("get", "superadmin/requests")
            .then((res) => {
                setReqs(res.data)
            })
    }

    const approve = (req) => {
        requests.call("post", "superadmin/category",req)
            .then((res) => {
               
            })
    }

    const approveFormatter = (cell, row) => {
        return <Button>Approve</Button>
    }

    if (localStorage.hasOwnProperty("userData") || login) {
        return <div>
            <div style= {{ width : "90%", margin : "0px auto"}}>
                Requests
         

            {!!reqs && <BootstrapTable bordered={false} keyField='id' data={reqs} columns={columns} pagination={paginationFactory()} />}
            </div>

        </div>
    }

    return <div>
        <Login vendor={true} loginCalled={loginCalled.bind(this)} />
    </div>
}

export default VendorLogin;