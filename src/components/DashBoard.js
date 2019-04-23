import React, { Component } from 'react';
import $ from "jquery";
import Cards from "./Cards";
import APP from "../Utils";
import Trending from "./Trending";
import ModalVideo from "react-modal-video";
window.jQuery = window.$ = $;
require( 'owl.carousel' );

export class DashBoard extends Component {
    constructor( props ) {
        super(props);
        this.state = { data: { Similar:{ Info: [],Results:[] } }, modalOpen: false, modalURLId: "", modalType: ""  };
        this.openModal = this.openModal.bind( this );
        this.handleClose = this.handleClose.bind( this );
    }
    componentDidMount() {
        // Auto initialize all the things!

    }
    componentWillMount() {

        const callbackMethod = response  => {
            this.setState( {data: response}, this.initCarousel );
        };
        APP.getResultsFromTasteDive( { q: "Red Hot Chili Peppers, Pulp Fiction", info: 1 }, callbackMethod );
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
                <ModalVideo
                    channel='youtube'
                    isOpen={this.state.modalOpen}
                    videoId= { this.state.modalURLId }
                    onClose={ this.handleClose }
                />
                <div className="">
                    <Trending />
                    <div className= "divider" />
                    <h4>Movies</h4>
                    <div className = "owl-carousel owl-theme" >
                        {this.state.data.Similar.Info.map((value, index) => {
                            if ( value.Type === "movie"  ) {
                                return <Cards data={value} key={value.yID} callBack = { this.openModal }/>;
                            }
                        })}
                    {this.state.data.Similar.Results.map((value, index) => {
                        if ( value.Type === "movie"  ) {
                            return <Cards data={value} key={value.yID} callBack = { this.openModal }/>;
                        }
                    })}
                    </div>
                    <div className= "divider" />
                    <h4>Music</h4>
                    <div className = "owl-carousel owl-theme" >
                        {this.state.data.Similar.Info.map((value, index) => {
                            if ( value.Type === "music"  ) {
                                return <Cards data={value} key={value.yID} callBack = { this.openModal }/>;
                            }
                        })}
                            {this.state.data.Similar.Results.map((value, index) => {
                                if ( value.Type === "music"  ) {
                                    return <Cards data={value} key={value.yID} callBack = { this.openModal }/>;
                                }
                            })}
                    </div>
                </div>
            </div>
        );
    }
    openModal( { yID, Type, Name, yUrl } ) {
        this.setState( {modalOpen: true, modalURLId: yID, modalType: Type } );
    }
    handleClose() {
        this.setState( {modalOpen: false, modalURLId: "", modalType: "" } );
    }
}
export default DashBoard;