import React, { Component } from 'react';
import M from "materialize-css";

export class Modal extends Component {

    componentDidMount() {
        // Auto initialize all the things!
        M.AutoInit();
    }

    render() {
        return (
            <div className="stepper">
            </div>
        );
    }
}
export default Modal;