import React, { Component } from 'react';
import M from "materialize-css";

export class Login extends Component {

    componentDidMount() {
        // Auto initialize all the things!
        M.AutoInit();
    }

    render() {
        return (
            <h1>Login Page Placeholder</h1>
        );
    }
}
export default Login;