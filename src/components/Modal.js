import React, { Component } from 'react';
import M from "materialize-css";

export class Modal extends Component {

    componentDidMount() {

    }

    render() {
        return (
            <Modal open={false}>
              <TableComponent />
            </Modal>
        );
    }
}
export default Modal;