import React, { Component } from 'react';
import M from "materialize-css";

export class Registration extends Component {

    componentDidMount() {
        // Auto initialize all the things!
        M.AutoInit();
    }

    render() {
        return (
            <h1>Registration Page Placeholder</h1>
        );
    }
}
export default Registration;