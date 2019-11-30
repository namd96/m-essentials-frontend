import React, { useEffect, useState } from 'react';
import { requests } from '../../api/agent'
import * as Survey from "survey-react";
import { Button } from 'react-bootstrap'
// var json=[]
const CreateService_ = props => {
    const [categoryList, setCategoryList] = useState({
        elements: [
            { type: "text", name: "product_name", title: "Enter the product name", isRequired: true, },
            // { type: "dropdown", name: "service_list_id", title: "Belongs to", choices: categoryList, isRequired: true, },
            // { type: "text", name: "customerName", title: "What is your name?", isRequired: true, },
        ]
    });
    const [jsonSample, setJson] = useState(false);
    const [model, setModel] = useState(false);
    // const json= {

    // };
    useEffect(() => {
        requests.call("get", "vendor/categories")
            .then((res) => {
                var cats = [];
                // setCategoryList(res.data)
                cats = res.data.map((el) => ({
                    text: el.cat_name,
                    value: el.cat_id,
                })
                )
                console.log(cats)
                setCategoryList(cats)
            })
    }, [])

    useEffect(() => {
        console.log("cat list state changed", categoryList);
        setJson({
            elements: [
                { type: "text", name: "product_name", title: "Enter the product name", isRequired: true, },
                // { type: "dropdown", name: "service_list_id", title: "Belongs to", choices: categoryList, isRequired: true, },
                // { type: "text", name: "customerName", title: "What is your name?", isRequired: true, },
            ]
        })



    }, [categoryList])


    const onComplete = (survey, options) => { console.log("Survey results: " + JSON.stringify(survey.data)); }
    return <div>product
       cats= {JSON.stringify(categoryList)}

        <Survey.Survey model={Survey.Model(jsonSample)} onComplete={onComplete.bind(this)} /></div>
}

export default class CreateService extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            categoryList: false,
            jsonSample: false
        }
    }
    handleGoToServices() {
        console.log("[working going to services]")
    }
    completedHtmlFormatter() {
        return <div>
            Thank you for creating the service, you can also add sub services to it. <Button onClick={this.handleGoToServices.bind(this)}>Go to services</Button>
        </div>
    }


    componentDidMount() {
        requests.call("get", "vendor/categories")
            .then((res) => {
                var cats = [];
                // setCategoryList(res.data)
                cats = res.data.map((el) => ({ text: el.cat_name, value: el.cat_id })
                )
                this.setState({
                    categoryList: cats
                }, function () {
                    this.setState({
                        jsonSample: {
                            "completedHtml": "",
                            elements: [
                                { type: "text", name: "product_name", title: "Mention product name", isRequired: true },
                                { type: "dropdown", name: "cat_id", title: "Belongs to", choices: this.state.categoryList, isRequired: true, },
                                { type: "text", name: "product_description", title: "Description", isRequired: true, },
                                { type: "text", inputType: "number", name: "product_contact_no", title: "Contact number", isRequired: true, },
                                { type: "text", name: "product_location", title: "Location", isRequired: true, },
                                { type: "text", inputType: "number", name: "product_cost", title: "Cost for your service?", isRequired: true, },
                                { type: "text", inputType: "number", name: "quantity", title: "For (quantity)", isRequired: true, },
                                { type: "dropdown", name: "unit", title: "Unit", choices:["mg","lt","pc"], isRequired: true, },                                

                            ]
                        }
                    }, function () {
                        this.setState({
                            model: new Survey.Model(this.state.jsonSample)
                        })
                    })
                })
            })
    }
    onComplete = (survey, options) => {
        console.log("Survey results: " + JSON.stringify(survey.data));
        requests.call("post", "vendor/create-product", survey.data)
            .then((res) => {
                console.log(res)
            survey.clear(true, true); 

            })

    }

    render() {

        var model = new Survey.Model(this.state.jsonSample);
        return <div >
            <div className="form-header"> Create a product</div>
            {this.state.model && <div className="form-container"><Survey.Survey model={this.state.model} onComplete={this.onComplete.bind(this)}></Survey.Survey></div>}
        </div>
    }
}

// export default CreateService;