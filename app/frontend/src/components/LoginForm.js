import React from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";

import axios from "axios";

import { API_URL_LOGIN } from "../constants";

class LoginForm extends React.Component {
    state = {
        username: "",
        password: ""
    };

    checkValidity = e => {
        e.preventDefault();
        axios.post(API_URL_LOGIN, this.state).then(
            res => {
                console.log(res);
            })
    };

    defaultIfEmpty = value => {
        return value === "" ? "" : value;
    };

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };


    render() {
        return (
            <Form onSubmit={this.checkValidity}>
                <FormGroup>
                    <Label for="username">Username:</Label>
                    <Input
                        type="text"
                        name="username"
                        onChange={this.onChange}
                    // value={this.defaultIfEmpty(this.state.username)}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="password">Password:</Label>
                    <Input
                        type="text"
                        name="password"
                        onChange={this.onChange}
                    // value={this.defaultIfEmpty(this.state.password)}
                    />
                </FormGroup>
                <Button>Send</Button>
            </Form>
        );
    }
}

export default LoginForm