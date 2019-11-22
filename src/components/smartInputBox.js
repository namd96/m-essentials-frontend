import React from 'react'
// import { timeout } from 'q';
import {  FormControl } from 'react-bootstrap';


export default class smartInputBox extends React.Component {
    constructor(props) {
        super(props)
    }

    handleInputChange(event) {
        var _scope = this;
        var query = event.target.value;

        this.setState({
            latestUpdatedOn: new Date().getTime()
        })
        setTimeout(function () {
            if (_scope.props.wait && new Date().getTime() - _scope.state.latestUpdatedOn >= 900) {
                _scope.props.callingApiFunction(query)
            }
        }, 900)
    }

    render() {
        return (
            <div className="search-box-mobile">
                <FormControl type="text" style={{ marginTop : "4px"}}  onChange={this.handleInputChange.bind(this)} placeholder="Search..." className="mr-sm-2" />                
            </div>
        )
    }
}