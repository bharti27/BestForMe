import React, { Component } from 'react';
import $ from "jquery";
import Cards from "./Cards";
import Trending from "./Trending";
import ModalVideo from "react-modal-video";
import { connect } from "react-redux";
import APP from "../Utils";
import SimpleCard from '@material-ui/core/Card';
import {BookCards} from "./BookCards";
import MediaCards from "../MediaCard";
import NavBar from "./NavBar";
window.jQuery = window.$ = $;
require( 'owl.carousel' );

export class DashBoard extends Component {
    constructor( props ) {
        super(props);
        this.state = {
            data: {
                Similar:{
                    Info: [],
                    Results:[]}
                },
            modalOpen: false,
            modalURLId: "",
            modalType: "",
            media: [],
            trending: []
        };
        this.openModal = this.openModal.bind( this );
        this.handleClose = this.handleClose.bind( this );
        this.onSuccess = this.onSuccess.bind( this );
        this.renderMovies = this.renderMovies.bind( this );
        this.getMovieList = this.getMovieList.bind( this );
        this.getTrending = this.getTrending.bind( this );
        this.renderMovies2 = this.renderMovies2.bind( this );
    }
    componentDidMount() {
        $( 'body' ).css( {
            background: this.props.authUser.primaryColor,
            color: this.props.authUser.secondaryColor
        } );
        $( 'nav' ).css( {
            background: this.props.authUser.secondaryColor,
            color: this.props.authUser.primaryColor
        } );
    }
    onSuccess( response ) {
        this.setState( {media: response.results}, this.initCarousel );
    }
    componentWillMount() {
        const callbackMethod = response  => {
            this.setState( {data: response}, this.getMovieList );
        };
        APP.getResultsFromTasteDive( { q: this.props.authUser.similar.join(","), info: 1 }, callbackMethod  );

    }
    getMovieList() {
        APP.getMovieListWithGeners( this.onSuccess, {
        with_genres: this.props.authUser.genres.join(",")
        } );
    }
    getTrending() {
        const success = response  => {
            this.setState( {trending: response.results}  );
        };
        APP.getTrending( success, {
            with_genres: this.props.authUser.genres.join(",")
        } );
    }

    initCarousel() {
        $('.owl-carousel').owlCarousel( {
            loop:false,
            margin:30,
            nav:true,
        items: 4});
        $( '.owl-prev' ).css( {
            background: this.props.authUser.secondaryColor,
            color: this.props.authUser.primaryColor
        } );
        $( '.owl-next' ).css( {
            background: this.props.authUser.secondaryColor,
            color: this.props.authUser.primaryColor
        } );
    }

    render() {
        var _self = this;
        return (
            <div>
                <NavBar />
            <div className="dashboard">
                <ModalVideo
                    channel='youtube'
                    isOpen={this.state.modalOpen}
                    videoId= { this.state.modalURLId }
                    onClose={ this.handleClose }
                />
                <div className="">
                    <Trending callback = { this.openModal }/>
                    { this.props.authUser.preferredMediaType.map( ( value, index ) => {
                        if ( value === "movie" ) {
                            return (<div>
                                <div className= "divider" />
                                <h4>{ value.toUpperCase() }</h4>
                                <div className = "owl-carousel owl-theme" >
                                    {this.renderMovies()}
                                    {this.renderMovies2()}
                                </div>
                            </div>);
                        }
                        if ( value === "book" ) {
                            return (<div>
                                <div className= "divider" />
                                <h4>{ value.toUpperCase() }</h4>
                                <div className = "owl-carousel owl-theme" >
                                    {this.renderBooks()}
                                </div>
                            </div>);
                        }
                        if ( value === "music" ) {
                            return (<div>
                                <div className= "divider" />
                                <h4>{ value.toUpperCase() }</h4>
                                <div className = "owl-carousel owl-theme" >
                                    {this.renderMusic()}
                                </div>
                            </div>);
                        }
                        if ( value === "show" ) {
                            return (<div>
                                <div className= "divider" />
                                <h4>{ value.toUpperCase() }</h4>
                                <div className = "owl-carousel owl-theme" >
                                    {this.renderTvseries()}
                                </div>
                            </div>);
                        }
                        if ( value === "podcast" ) {
                            return (<div>
                                <div className= "divider" />
                                <h4>{ value.toUpperCase() }</h4>
                                <div className = "owl-carousel owl-theme" >
                                    {this.renderPodcast()}
                                </div>
                            </div>);
                        }

                    } ) }
                </div>
            </div>
            </div>
        );
    }

    renderMovies() {
        return this.state.media.map((props, index) => {
            return <Cards data={props} key={props.id} callBack={this.openModal}/>;
        });
    }

    renderMovies2(){
        return this.state.data.Similar.Results.map((props, index) => {
            if ( props.Type === "movie"  ) {
                return <MediaCards data={props} key={props.yID} callBack={this.openModal}/>;
            }
        });
    }

    renderBooks() {
        return this.state.data.Similar.Results.map((props, index) => {
            if ( props.Type === "book"  ) {
                return <BookCards data={props} key={props.yID} callBack={this.openModal}/>;
            }
        });
    }
    renderMusic() {
        return this.state.data.Similar.Results.map((props, index) => {
            if ( props.Type === "music"  ) {
                return <MediaCards data={props} key={props.yID} callBack={this.openModal}/>;
            }

        });
    }
    renderPodcast() {
        return this.state.data.Similar.Results.map((props, index) => {
            if ( props.Type === "podcast"  ) {
                return <Cards data={props} key={props.id} callBack={this.openModal}/>;
            }
        });
    }
    renderTvseries() {
        return this.state.data.Similar.Results.map((props, index) => {
            if ( props.Type === "show"  ) {
                return <MediaCards data={props} key={props.yID} callBack={this.openModal}/>;
            }
        });
    }
    openModal( p ) {
        var _self = this;
        const onVideoDetails = function( response ) {
            _self.setState( {modalOpen: true, modalURLId: response.items[0].id.videoId, modalType: "" } );
        };
        if ( p.title === undefined ) {
            APP.getResultsFromYouTube( { q: p.Name + " Official Trailer" },onVideoDetails );
        } else {
            APP.getResultsFromYouTube( { q: p.title + " Official Trailer" },onVideoDetails );
        }


    }
    handleClose() {
        this.setState( {modalOpen: false, modalURLId: "", modalType: "" } );
        $('.owl-carousel').trigger('refresh.owl.carousel');
    }
}
const mapStateToProps = state => {
    return { authUser: state.simpleReducer.authUser};
};
export default connect(mapStateToProps, null)(DashBoard);