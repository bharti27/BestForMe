import React, { Component } from 'react';
import M from "materialize-css";

export class Account extends Component {

    componentDidMount() {
        // Auto initialize all the things!
        M.AutoInit();
    }

    render() {
        return (
           <h1>Account Page Placeholder</h1>
        );
    }
}
export default Account;