import React, { useEffect, useState } from 'react';
import { requests } from '../../api/agent'
import * as Survey from "survey-react";
import { Button } from 'react-bootstrap'
// var json=[]
const CreateService_ = props => {
    const [categoryList, setCategoryList] = useState({
        elements: [
            { type: "text", name: "meta_service_name", title: "Enter the service name", isRequired: true, },
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
                { type: "text", name: "meta_service_name", title: "Enter the service name", isRequired: true, },
                // { type: "dropdown", name: "service_list_id", title: "Belongs to", choices: categoryList, isRequired: true, },
                // { type: "text", name: "customerName", title: "What is your name?", isRequired: true, },
            ]
        })



    }, [categoryList])

    // const json = {
    //     "completedHtml": "<h3>Thank you for your feedback.</h3> <h5>Your thoughts and ideas will help us to create a great product!</h5>",
    // "completedHtmlOnCondition": [
    //     {
    //         "expression": "{nps_score} > 8",
    //         "html": "<h3>Thank you for your feedback.</h3> <h5>We glad that you love our product. Your ideas and suggestions will help us to make our product even better!</h5>"
    //     }, {
    //         "expression": "{nps_score} < 7",
    //         "html": "<h3>Thank you for your feedback.</h3> <h5> We are glad that you share with us your ideas.We highly value all suggestions from our customers. We do our best to improve the product and reach your expectation.</h5>\n"
    //     }
    // ],
    // "pages": [
    //     {
    //         "name": "page1",
    //         "elements": [
    //             {
    //                 "type": "rating",
    //                 "name": "nps_score",
    //                 "title": "On a scale of zero to ten, how likely are you to recommend our product to a friend or colleague?",
    //                 "isRequired": true,
    //                 "rateMin": 0,
    //                 "rateMax": 10,
    //                 "minRateDescription": "(Most unlikely)",
    //                 "maxRateDescription": "(Most likely)"
    //             }, {
    //                 "type": "checkbox",
    //                 "name": "promoter_features",
    //                 "visibleIf": "{nps_score} >= 9",
    //                 "title": "What features do you value the most?",
    //                 "isRequired": true,
    //                 "validators": [
    //                     {
    //                         "type": "answercount",
    //                         "text": "Please select two features maximum.",
    //                         "maxCount": 2
    //                     }
    //                 ],
    //                 "hasOther": true,
    //                 "choices": [
    //                     "Performance", "Stability", "User Interface", "Complete Functionality"
    //                 ],
    //                 "otherText": "Other feature:",
    //                 "colCount": 2
    //             }, {
    //                 "type": "comment",
    //                 "name": "passive_experience",
    //                 "visibleIf": "{nps_score} > 6  and {nps_score} < 9",
    //                 "title": "What is the primary reason for your score?"
    //             }, {
    //                 "type": "comment",
    //                 "name": "disappointed_experience",
    //                 "visibleIf": "{nps_score} notempty",
    //                 "title": "What do you miss and what was disappointing in your experience with us?"
    //             }
    //         ]
    //     }
    // ],
    // "showQuestionNumbers": "off" 
    // };


    const onComplete = (survey, options) => { console.log("Survey results: " + JSON.stringify(survey.data)); }
    return <div>service
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
                                { type: "text", name: "meta_service_name", title: "Mention service name", isRequired: true },
                                { type: "dropdown", name: "cat_id", title: "Belongs to", choices: this.state.categoryList, isRequired: true, },
                                { type: "text", name: "meta_desc", title: "Description", isRequired: true, },
                                { type: "text", inputType: "number", name: "contact_no", title: "Contact number", isRequired: true, },
                                { type: "text", name: "location", title: "Location", isRequired: true, },
                                { type: "text", inputType: "number", name: "meta_cost", title: "Cost for your service?", isRequired: true, },
                                { type: "boolean", name: "meta_cost_breakdown", title: "Can your service be cost customized ?", isRequired: true, },


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
        requests.call("post", "vendor/meta_service", survey.data)
            .then((res) => {
                console.log(res)
            })

    }

    render() {

        var model = new Survey.Model(this.state.jsonSample);
        return <div >
            <div className="form-header"> Create a service</div>
            {this.state.model && <div className="form-container"><Survey.Survey model={this.state.model} onComplete={this.onComplete.bind(this)}></Survey.Survey></div>}
        </div>
    }
}

// export default CreateService;