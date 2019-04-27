import React, { Component } from 'react';
import * as M from "materialize-css";
import Cards from "./Cards";
import utils from "../Utils";

export class Trending extends Component {
    constructor( props ) {
        super(props);
        this.onSuccess = this.onSuccess.bind( this );
        this.state = {
            data: []
        };
        this.sendCallBAck = this.sendCallBAck.bind( this );
    }
    componentDidMount() {


    }
    onSuccess( response ) {
        this.setState( {
            data: response.results
        }, this.initCarousel );
    }
    componentWillMount() {

        utils.getTrending( this.onSuccess );
    }
    sendCallBAck( event ) {
        event.preventDefault();
        event.stopPropagation();
        var title = event.target.dataset.title;
        this.props.callback( { title: title } );
    }
    render() {
        return (
            <div className= "" >
                <div className="carousel">
                    {this.state.data.map((value, index) => {
                            return <img className="carousel-item" src={ "https://image.tmdb.org/t/p/original" + value.poster_path } data-title= { value.title } onClick={ this.sendCallBAck }/>

                    })}
                </div>
                <h4 className= "center trending__heading">Trending in your World!</h4>
            </div>
        );
    }
    componentDidUpdate( prevProps ) {

    }
    initCarousel() {
        M.AutoInit();
        var elems = document.querySelectorAll('.carousel');
        const instance = M.Carousel.getInstance(elems, { fullWidth: true, loop:true, duration: 200 });
    }
}
export default Trending;
