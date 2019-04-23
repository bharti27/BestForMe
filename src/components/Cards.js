import React, { Component } from 'react';
import ModalVideo from 'react-modal-video'


export class Cards extends Component {

    constructor( props ) {
        super( props );
        this.likedCard = this.likedCard.bind( this );
        this.cardClicked = this.cardClicked.bind(this);
        this.state = { heart: "far", modalOpen: false };

    }
    componentDidMount() {

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
<<<<<<< HEAD
                <div className="col s4 item">
                    <div className="card" onClick={ this.cardClicked }>
=======
                <div className="col s3 item">
                    <div className="card ">
>>>>>>> feature/cardGrid
                        <div className="card-image">
                            <img src={"http://img.youtube.com/vi/"+this.props.data.yID + "/mqdefault.jpg"}/>
                                <div className="btn-floating halfway-fab waves-effect waves-light pink lighten-1" onClick={ this.likedCard }>
                                    <i className={ this.state.heart + " fa-heart" }/>
                                </div>
                        </div>
                        <div className="card-content">
                            <span className="card-title">{ this.props.data.Name }</span>
                            <p>{ this.props.data.wTeaser.length > 150 ? this.props.data.wTeaser.substring( 0, 100 ) + "..." : this.props.data.wTeaser }</p>
                        </div>
                    </div>
                </div>
        );
    }
    cardClicked() {
        this.props.callBack( this.props.data );
    }
}
export default Cards;