import React, { Component } from 'react';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';

export class Cards extends Component {

    constructor( props ) {
        super( props );
        this.likedCard = this.likedCard.bind( this );
        this.state = { heart: "far" }
    }
    componentDidMount() {
        // Auto initialize all the things!
    }
    likedCard(  ) {
        if ( this.state.heart === "far" ) {
            this.setState( {
                heart: "fa"
            } );
        } else {
            this.setState( {
                heart: "far"
            } );
        }

    }
    render() {

        return (
                <div className="col s4 item">
                    <div className="card ">
                        <div className="card-image">
                            <img src={"http://img.youtube.com/vi/"+this.props.data.yID + "/mqdefault.jpg"}/>
                                <span className="card-title">{ this.props.data.Name }</span>
                                <div className="btn-floating halfway-fab waves-effect waves-light pink lighten-1" onClick={ this.likedCard }>
                                    <i className={ this.state.heart + " fa-heart" }/>
                                </div>
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