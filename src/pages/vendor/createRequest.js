import React, { useEffect, useState } from 'react';
import { requests } from '../../api/agent'
import * as Survey from "survey-react";
import { Button } from 'react-bootstrap'
// var json=[]


export default class CreateService extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            categoryList: false,
            jsonSample: {

                "completedHtml": "",
                elements: [
                    { type: "text", name: "title", title: "Mention the title", isRequired: true },
                    // { type: "dropdown", name: "req_type", title: "Request to create", choices: ["cat", "ser"], isRequired: true, },

                ]

            }
        }
    }



    componentDidMount() {


        this.setState({
            model: new Survey.Model(this.state.jsonSample)
        })



    }
    onComplete = (survey, options) => {
        console.log("Survey results: " + JSON.stringify(survey.data));
        requests.call("post", "vendor/create-request", survey.data)
            .then((res) => {
                console.log(res)
            })

    }

    render() {

        return <div >
            <div className="form-header"> Create a request</div>
            {this.state.model && <div className="form-container"><Survey.Survey model={this.state.model} onComplete={this.onComplete.bind(this)}></Survey.Survey></div>}
        </div>
    }
}

// export default CreateService;