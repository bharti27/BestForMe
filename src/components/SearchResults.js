import React, { Component } from 'react';
import M from "materialize-css";

export class SearchResults extends Component {

    componentDidMount() {
        // Auto initialize all the things!
        M.AutoInit();
    }

    render() {
        return (
            <h1>Search Result Page Placeholder</h1>
        );
    }
}
export default SearchResults;