import React, { Component } from 'react';
import LoginDetails from '../usersDetails'
import App from '../Utils'
import * as M from "materialize-css";
import {addCardToFav, removeCardFromFav} from "../actions";
import { connect } from "react-redux";


export class Cards extends Component {

    constructor( props ) {
        super( props );
        this.likedCard = this.likedCard.bind( this );
        this.cardClicked = this.cardClicked.bind(this);
        this.isLiked = this.isLiked.bind( this );
        this.state = { heart: this.isLiked(), modalOpen: false };
    }
    isLiked(  ) {
        var result = "far";
         this.props.store.favorites.map( (value, index) => {
            if ( value.title === this.props.data.title ) {
                result = "fa";
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
            M.toast({html: 'You have liked '+this.props.data.title + ' .' } );
            this.props.cardLiked( this.props.data );
        } else {
            this.setState( {
                heart: "far"
            } );
            M.toast({html: 'You have disliked '+this.props.data.title + ' .' } );
            this.props.cardDisLiked( this.props.data );
        }


    }
    render() {

        return (
                <div className="col  item ">
                    <div className="card hoverable" onClick={ this.cardClicked }>
                        <div className="card-image">
                            {/*<img src={"http://img.youtube.com/vi/"+this.props.data.yID + "/mqdefault.jpg"}/>*/}
                            <img src={"https://image.tmdb.org/t/p/original"+this.props.data.backdrop_path }/>
                                <div className="btn-floating halfway-fab waves-effect waves-light pink lighten-1" onClick={ this.likedCard }>
                                    <i className={ this.state.heart + " fa-heart" }/>
                                </div>
                        </div>
                        <div className="card-content">
                            <span className="card-title">{ this.props.data.title }</span>
                            <p>{ this.props.data.overview.substring( 0, 100 ) + "..." }</p>
                        </div>
                    </div>
                </div>
        );
    }
    cardClicked( event ) {
        event.preventDefault();
        event.stopPropagation();
        this.props.callBack( this.props.data );
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
export default connect( mapStateToProps, mapDispatchToProps )(Cards);