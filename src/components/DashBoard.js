import React, { Component } from 'react';
import $ from "jquery";
import Cards from "./Cards";
import Trending from "./Trending";
import ModalVideo from "react-modal-video";
import { connect } from "react-redux";
import APP from "../Utils";
import SimpleCard from '@material-ui/core/Card';
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

    }
    componentWillMount() {
        const callbackMethod = response  => {
            this.setState( {data: response}, this.initCarousel );
        };
        APP.getResultsFromTasteDive( { q: this.props.authUser.interest.join(","), info: 1 }, callbackMethod );
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
        var _self = this;
        return (
            <div className="dashboard">
                <ModalVideo
                    channel='youtube'
                    isOpen={this.state.modalOpen}
                    videoId= { this.state.modalURLId }
                    onClose={ this.handleClose }
                />
                <div className="">
                    <Trending data = { this.state.data.Similar }/>
                    { this.props.authUser.preferredMediaType.map( ( value, index ) => {
                        return (<div><div className= "divider" />
                            <h4>{ value }</h4>
                        <div className = "owl-carousel owl-theme" >
                            {_self.state.data.Similar.Results.map((props, index) => {
                                if ( props.Type === value  ) {
                                    return <Cards data={props} key={props.yID} callBack = { this.openModal }/>;
                                }
                            })}
                        </div></div>);
                    } ) }
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
const mapStateToProps = state => {
    return { authUser: state.simpleReducer.authUser};
};
export default connect(mapStateToProps, null)(DashBoard);