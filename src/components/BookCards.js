import React, { Component } from 'react';
import LoginDetails from '../usersDetails'
import App from '../Utils'
import * as M from "materialize-css";
import {addCardToFav, removeCardFromFav} from "../actions";
import { connect } from "react-redux";


class BookCards extends Component {

    constructor( props ) {
        super( props );
        this.likedCard = this.likedCard.bind( this );

        this.isLiked = this.isLiked.bind( this );
        this.state = { heart: this.isLiked(), modalOpen: false };
    }
    isLiked(  ) {
        var result = "far";

        this.props.store.favorites.map( (value, index) => {
                    if ( value.Name === this.props.data.Name ) {
                        result =  "fa";
                    }
                } );
        return result;
    }
    componentDidMount() {
    }
    likedCard( event ) {

        event.preventDefault();
        event.stopPropagation();
        if ( this.state.heart === "far" ) {
            this.setState( {
                heart: "fa"
            } );
            M.toast({html: 'You have liked '+this.props.data.Name + ' .' } );
            this.props.cardLiked( this.props.data );
        } else {
            this.setState( {
                heart: "far"
            } );
            M.toast({html: 'You have disliked '+this.props.data.Name + ' .' } );
            this.props.cardDisLiked(  this.props.data  );
        }

    }
    render() {

        return (
            <div className="col item">
                    <div className="card hoverable">
                        <div className="card-content ">
                            <span className="card-title">{ this.props.data.Name }</span>
                            <p>{ this.props.data.wTeaser.length > 400 ? this.props.data.wTeaser.substring( 0, 400 ) + "..." : this.props.data.wTeaser }</p>
                        </div>
                        <div className="card-action">
                            <div className="btn-floating halfway-fab halfway-fab-2 waves-effect waves-light pink lighten-1" onClick={ this.likedCard }>
                                <i className={ this.state.heart + " fa-heart" }/>
                            </div>
                            <a href={ this.props.data.wUrl } target= "_blank">Explore More about it!</a>
                        </div>
                    </div>
                </div>
        );
    }

}
const mapStateToProps = state => {
    return { store: state.simpleReducer.authUser};
};

function mapDispatchToProps(dispatch) {
    return {
        cardLiked: payload => dispatch( addCardToFav(payload)),
        cardDisLiked: payload => dispatch( removeCardFromFav(payload))
    };
}
export default connect( mapStateToProps, mapDispatchToProps )(BookCards);