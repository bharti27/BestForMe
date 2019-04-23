import React, { Component } from 'react';
import $ from "jquery";
import Cards from "./Cards";
import Utils from "../Utils";
window.jQuery = window.$ = $;
require( 'owl.carousel' );

export class DashBoard extends Component {
    constructor( props ) {
        super(props);
        this.state = { data: { Similar:{ info: [],Results:[] } } };
    }
    componentDidMount() {
        // Auto initialize all the things!

    }
    componentWillMount() {

        const callbackMethod = response  => {
            this.setState( {data: response}, this.initCarousel );
        };
        Utils.getResultsFromTasteDive( { q: "Red Hot Chili Peppers, Pulp Fiction", info: 1 }, callbackMethod );
    }

    initCarousel() {
        $('.owl-carousel').owlCarousel( {
            loop:false,
            margin:30,
            nav:true,
            responsive:{
                0:{
                    items:1
                },
                600:{
                    items:3
                },
                1000:{
                    items:5
                }
            } } );
    }

    render() {
        return (
            <div className="dashboard">
                <div className="">
                    <div className= "divider" />
                    <h4>Movies</h4>
                    <div className = "owl-carousel owl-theme" >
                    {this.state.data.Similar.Results.map((value, index) => {
                        if ( value.Type === "movie"  ) {
                            return <Cards data={value} key={value.yID}/>;
                        }
                    })}
                    </div>
                    <div className= "divider" />
                    <h4>Music</h4>
                    <div className = "owl-carousel owl-theme" >
                            {this.state.data.Similar.Results.map((value, index) => {
                                if ( value.Type === "music"  ) {
                                    return <Cards data={value} key={value.yID}/>;
                                }
                            })}
                    </div>
                </div>
            </div>
        );
    }
}
export default DashBoard;