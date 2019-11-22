import React, { useEffect, useState } from 'react';
import { requests } from '../../api/agent'
import { Card, Accordion, Button } from 'react-bootstrap';
import * as Survey from "survey-react";

const Products = props => {
    const [serviceList, setServiceList] = useState(false)
    const [subServiceList, setSubServiceList] = useState(false)
    const [jsonSample, setJsonSample] = useState(false)
    const [model, setModel] = useState(false)
    const [subMenu, setSubMenu] = useState(true)
    const [choices, setChoices] = useState(true)
    // const [serviceList, setServiceList] = useState(false)

    const addMenuBtn = {
        elements: {

        }
    }
    useEffect(() => {
        console.log("doing this again")
       
getData()
    }, [])
const getData =()=>{
    requests.call("get", "vendor/meta_service")
    .then((result) => {
        console.log("meta choice", result)
        setServiceList(result.data)
        requests.call("get", `vendor/metamenu/${result.data[0].meta_service_id}`)
            .then((res) => {
                console.log(res)
                var menu = [];
                console.log("check", jsonSample)

                menu = res.data.map((el) => ({ text: el.name, value: el.sub_service_id }))
                setChoices(menu)
                setJsonSample({
                    "completedHtml": "",
                    elements: [
                        { type: "text", name: "service_name", title: "Mention sub service name", isRequired: true },
                        { type: "text", name: "descr", title: "Description", isRequired: true, },
                        { type: "text", name: "location", title: "Location", isRequired: true, },
                        { type: "text", inputType: "number", name: "meta_cost", title: "Cost for your service?", isRequired: true, },
                        { type: "boolean", name: "cost_breakdown", title: "Can your service be cost customized ?", isRequired: true, },
                        { type: "boolean", name: "add_menu", title: "Add menu items to this service", isRequired: true, },
                        { type: "dropdown", name: "menu", choices: menu, isRequired: true, },
                    ]

                })

            })
        setModel(new Survey.Model(jsonSample));

    })
}
    useEffect(() => {
        setModel(new Survey.Model(jsonSample));
    }, [jsonSample])


    const handleSubServiceClick = (id) => {

        console.log("see sub service", id)
        requests.call("get", `vendor/services/${id}`)
            .then((res) => {
                console.log(res)
                setSubServiceList({
                    ...subServiceList,
                    [id]: res.data
                })
            })


        requests.call("get", `vendor/metamenu/${id}`)
            .then((res) => {
                console.log(res)
                var menu = [];
                console.log("check", jsonSample)

                menu = res.data.map((el) => ({ text: el.name, value: el.sub_service_id }))

                setJsonSample({

                    "completedHtml": "",
                    elements: [
                        { type: "text", name: "service_name", title: "Mention sub service name", isRequired: true },
                        { type: "text", name: "descr", title: "Description", isRequired: true, },
                        { type: "text", name: "location", title: "Location", isRequired: true, },
                        { type: "text", inputType: "number", name: "meta_cost", title: "Cost for your service?", isRequired: true, },
                        { type: "boolean", name: "cost_breakdown", title: "Can your service be cost customized ?", isRequired: true, },
                        { type: "boolean", name: "add_menu", title: "Add menu items to this service", isRequired: true, },
                        { type: "dropdown", name: "menu", choices: menu, isRequired: true, },
                    ]


                })
            })



    }
    const handleAddSubServiceClick = (survey, options, id) => {
        console.log("adding sub service", survey.data, id)

    }
    console.log("rendering")
    const handleSubmenuClick = (id) => {
        requests.call("get", `vendor/menu/${id}`)
            .then((res) => {
                console.log(res)
                setSubMenu({
                    ...subMenu,
                    [id]: res.data
                })
            })
    }
    const handleMakeMenuInactive = (id, status, service_id) => {
        console.log("[checkbox]", id);
        requests.call("put", `vendor/toggle-menu/${id}/${status ? 0 : 1}`)
            .then((res) => {
                console.log(res)
               getData()
            })

    }
    const handleServiceInactive = (id, status) => {
        requests.call("put", `vendor/toggle-meta-service/${id}/${status ? 0 : 1}`)
            .then((res) => {
                console.log(res)
            getData()
            })
    }
    // var model = new Survey.Model(jsonSample)
    // var radio = new Survey.Model(json);
    return <div>
        <Accordion defaultActiveKey="0">
            {
                serviceList && serviceList.map((service, idx) => {
                    return <Card className="form-header">
                        <Card.Header>
                            <Accordion.Toggle as={Button} variant="link" eventKey={idx}>
                                {service.meta_service_name} &nbsp; ( {` ${service.meta_status ? "Active" : "Inactive"} `} ) &nbsp;
                                <Button onClick={handleServiceInactive.bind(this, service.meta_service_id, service.meta_status)}>Make it {!service.meta_status ? "Active" : "Inactive"}</Button>
                                {/* <Button style={{width : "20%", margin : "0px auto"}} onClick={handleServiceInactive.bind(this, service.meta_service_id, service.meta_status)}>Make it {!service.meta_status ? "Active" : "Inactive"}</Button> */}
                            </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey={idx}>
                            <Card.Body>
                                <div >
                                    <div style={{ display: "flex", justifyContent: "center" }}>
                                        <icon class="material-icons-outlined black" >room</icon> <span className="product-card-list-headings clamp-1">{service.location}</span>
                                        <div className="product-card-list-headings" >
                                            &nbsp; | contact:   {service.contact_no}
                                        </div>
                                    </div>
                                    <div>
                                        <div style={{ marginTop: "2%" }}><Button onClick={handleSubServiceClick.bind(this, service.meta_service_id)}>See and add Sub-services</Button></div>

                                    </div>
                                    {/* {JSON.stringify(subServiceList)} */}
                                    <hr />

                                    {subServiceList && subServiceList[service.meta_service_id] &&

                                        subServiceList[service.meta_service_id].map((el, idx) => {
                                            return (
                                                <div className="product-card-list-headings-no-clamp">
                                                    {el.service_name} <br />
                                                    {`Cost  :` + el.cost}  <br />
                                                    {el.descr}<br />
                                                    <Button onClick={handleSubmenuClick.bind(this, el.sub_id)}>See the menu</Button><br />
                                                    <div >
                                                        {subMenu[el.sub_id] && subMenu[el.sub_id].map((item) => {
                                                            return <div>
                                                                <input type="checkbox" onChange={handleMakeMenuInactive.bind(this, item.menu_id, item.status, el.sub_id)} name={item.menu_id} checked={item.status ? true : false} />{item.name}
                                                            </div>
                                                        })}
                                                    </div>
                                                    <hr />
                                                    {/* { service.meta_cost_breakdown ?  `Cost  :` + el.service_breakdown ? el.service_cost : false :"" } */}
                                                </div>
                                            )
                                        })
                                    }
                                    {subServiceList && subServiceList[service.meta_service_id] &&
                                        <div>
                                            {/* "jsonsample"{JSON.stringify(jsonSample)} */}
                                            <div className="form-header">  Add a Sub-services to this service </div>
                                            <div className="form-container">
                                                <Survey.Survey model={model} onComplete={(survey, options) => handleAddSubServiceClick.bind(survey, options, service.meta_service_id)}>
                                                </Survey.Survey>

                                            </div>
                                        </div>}
                                </div>
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                })
            }

        </Accordion>
    </div>
}

export default Products