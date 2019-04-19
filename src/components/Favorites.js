import React, { Component } from 'react';
import M from "materialize-css";

export class Favorites extends Component {

    componentDidMount() {
        // Auto initialize all the things!
        M.AutoInit();
    }

    render() {
        return (
            <h1>Favorites Page Placeholder</h1>
        );
    }
}
export default Favorites;