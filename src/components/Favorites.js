import React, { Component } from 'react';
import M from "materialize-css";

export class Favorites extends Component {

    componentDidMount() {
        // Auto initialize all the things!
        M.AutoInit();
    }

    render() {
        return (
            <div className="header">
                <header className="header card-panel cyan">
                    <h1>
                        BestForME
                    </h1>
                </header>

            </div>
        );
    }
}
export default Favorites;