import React, { Component } from 'react';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';

export class Cards extends Component {

    constructor( props ) {
        super( props );
    }
    componentDidMount() {
        // Auto initialize all the things!
    }

    render() {

        return (
                <div className="col s4">
                    <div className="card ">
                        <div className="card-image">
                            <img src={"http://img.youtube.com/vi/"+this.props.data.yID + "/mqdefault.jpg"}/>
                                <span className="card-title">{ this.props.data.Name }</span>
                                <a className="btn-floating halfway-fab waves-effect waves-light red"><i
                                    className="material-icons">heart</i></a>
                        </div>
                        <div className="card-content">
                            <p>{ this.props.data.wTeaser.length > 150 ? this.props.data.wTeaser.substring( 0, 150 ) : this.props.data.wTeaser }</p>
                        </div>
                    </div>
                </div>
        );
    }
}
export default Cards;