import React from 'react'
import { Card, Form, Button } from 'react-bootstrap';
import { requests } from '../api/agent';
import {
    validateIfInputIsEmail
} from "../helpers/validationChecks";
export default class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            authCreds: {
                handle: false,
                password: false,
                user_name: false,
                user_type: false,
                user_contact_no: false,
                user_email: false
            }
        }
    }

    toggleRegister() {
        this.setState({
            openRegister: !this.state.openRegister
        })
    }
    handleInputChange = event => {
        this.setState({
            authCreds: {
                ...this.state.authCreds,
                [event.target.name]: event.target.value
            }
        })
    }
    handleSubmit = (endpoint) => {
        this.setState({
            authCreds: {
                ...this.state.authCreds,
                user_type: this.state.authCreds.user_type ? 1 : 2
            }
        }, function () {
            if (!this.state.authCreds.handle) { alert("Please enter username!"); return; }
            if (!this.state.authCreds.password) { alert("Please enter password!"); return; }
            // if (validateIfInputIsEmail(this.state.authCreds.email)) {
            requests.rawCall("post", endpoint, this.state.authCreds)
                .then((res) => {
                    if (!res.err && endpoint == "login") {
                        localStorage.setItem("userData", res.token)
                        this.props.loginCalled()
                    } else if ((!res.err && endpoint == "register")) {
                        alert("Yay,registered successfully! please login again.")
                        this.toggleRegister()
                    } else {
                        alert(res.msg)
                    }
                })
            // }
        })

    }

    handelCilacToggle() {
        this.setState({
            authCreds: {
                ...this.state.authCreds,
                user_type: !this.state.authCreds.user_type
            }
        })
    }

    render() {
        if (this.state.openRegister) {
            return (
                <Card style={{ width: '28rem', color: "black" }}>

                    <Card.Body>
                        <Card.Title>Register</Card.Title>
                        <Form>
                            <Form.Group controlId="formBasicEmail">
                                <Card.Subtitle className="mb-2" style={{ textAlign: "left" }}>
                                    Name
                            </Card.Subtitle>
                                <Form.Control type="text" placeholder="Enter name"
                                    onChange={this.handleInputChange.bind(this)}
                                    name="user_name"
                                />
                            </Form.Group>
                            <Form.Group controlId="formBasicEmail">
                                <Card.Subtitle className="mb-2" style={{ textAlign: "left" }}>
                                    Username
                            </Card.Subtitle>
                                <Form.Control type="text" placeholder="Enter email"
                                    onChange={this.handleInputChange.bind(this)}
                                    name="handle"
                                />
                            </Form.Group>
                            <Form.Group controlId="formBasicEmail">
                                <Card.Subtitle className="mb-2" style={{ textAlign: "left" }}>
                                    Email
                            </Card.Subtitle>
                                <Form.Control type="text" placeholder="Enter email"
                                    onChange={this.handleInputChange.bind(this)}
                                    name="user_email"
                                />
                            </Form.Group>
                            <Form.Group controlId="formBasicEmail">
                                <Card.Subtitle className="mb-2" style={{ textAlign: "left" }}>
                                    Contact Number
                            </Card.Subtitle>
                                <Form.Control type="number" placeholder="Enter email"
                                    onChange={this.handleInputChange.bind(this)}
                                    name="user_contact_no"
                                />
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                                <Card.Subtitle className="mb-2" style={{ textAlign: "left" }}>Password</Card.Subtitle>
                                <Form.Control type="password" placeholder="Password"
                                    onChange={this.handleInputChange.bind(this)}
                                    name="password"
                                />
                            </Form.Group>
                            <div style={{ marginBottom: "3%" }}>

                                <Card.Subtitle className="mb-2" style={{ textAlign: "left" }}>Are you offering a service?</Card.Subtitle>

                                <div className="toggle-button">
                                    <div onClick={() => this.handelCilacToggle()}
                                        className="toggle-button-box">
                                        <div className="toggle-button-oval" style={{
                                            float: (this.state.authCreds.user_type) ? "right" : "left",
                                            backgroundColor: (this.state.authCreds.user_type) ? "#BEA57C" : "#BDBDBD"
                                        }}>
                                        </div>
                                    </div >
                                </div>
                            </div>
                            <Button
                                onClick={this.handleSubmit.bind(this, "register")}
                                variant="primary">
                                Submit
                            </Button>

                            <Card.Subtitle className="mb-2" style={{ marginTop: "7px", textAlign: "center" }} onClick={this.toggleRegister.bind(this)}>Already have an account? Register</Card.Subtitle>
                        </Form>
                    </Card.Body>
                </Card>
            )
        } else return (
            <Card style={{ width: '28rem', color: "black" }}>

                <Card.Body>
                    <Card.Title>Login</Card.Title>
                    <Form>
                        <Form.Group controlId="formBasicEmail">
                            <Card.Subtitle className="mb-2" style={{ textAlign: "left" }}>
                                Username
                            </Card.Subtitle>
                            <Form.Control type="text" placeholder="Enter email"
                                onChange={this.handleInputChange.bind(this)}
                                name="handle"
                            />
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword">
                            <Card.Subtitle className="mb-2" style={{ textAlign: "left", marginTop: "3px" }}>Password</Card.Subtitle>
                            <Form.Control type="password" placeholder="Password"
                                onChange={this.handleInputChange.bind(this)}
                                name="password"
                            />
                        </Form.Group>
                        <Button
                            onClick={this.handleSubmit.bind(this, "login")}
                            variant="primary">
                            Submit
                        </Button>
                        <Card.Subtitle className="mb-2" style={{ marginTop: "7px", textAlign: "center" }} onClick={this.toggleRegister.bind(this)}>Don't have an account? Register</Card.Subtitle>
                    </Form>
                </Card.Body>
            </Card>
        )
    }
}