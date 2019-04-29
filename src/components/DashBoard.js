import React, { Component } from 'react';
import $ from "jquery";
import Cards from "./Cards";
import Trending from "./Trending";
import ModalVideo from "react-modal-video";
import { connect } from "react-redux";
import APP from "../Utils";
import BookCards from "./BookCards";
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
        this.getTasteDiveResult();
    }
    getTasteDiveResult = () => {
        const callbackMethod = response  => {
            this.setState( {data: response}, this.getMovieList );
        };
        APP.getResultsFromTasteDive( { q: this.props.authUser.similar.join(","), info: 1 }, callbackMethod  );
    };
    getMovieList() {
        APP.getMovieListWithGeners( this.onSuccess, {
            with_genres: this.props.authUser.genres.join(","),
            sort_by: "popularity.desc"
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
        var owl =  $('.owl-carousel');
        // if ( owl.length !== 0 ) {
        //     owl.owlCarousel('destroy');
        // }

        owl.owlCarousel( {
            loop:false,
            margin:30,
            nav:true,
        items: 4});
        var _self = this;
        setTimeout( () => {
            $( '.owl-prev' ).css( {
                backgroundColor: _self.props.authUser.secondaryColor,
                color: _self.props.authUser.primaryColor
            } );
            $( '.owl-next' ).css( {
                backgroundColor: _self.props.authUser.secondaryColor,
                color: _self.props.authUser.primaryColor
            } );
        }, 100 );

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
        var mov = this.state.data.Similar.Results.map((props, index) => {
            if ( props.Type === "movie"  ) {
                return <MediaCards data={props} key={props.yID} callBack={this.openModal}/>;
            }
        });

        mov.push( this.state.data.Similar.Info.map((props, index) => {
            if ( props.Type === "movie"  ) {
                return <MediaCards data={props} key={props.yID} callBack={this.openModal}/>;
            }
        }) );
        return mov;

    }

    renderBooks() {
        var books = this.state.data.Similar.Results.map((props, index) => {
            if ( props.Type === "book" || props.Type === "author"  ) {
                return <BookCards data={props} key={props.wUrl+index} callBack={this.openModal}/>;
            }
        });
        books.push( this.state.data.Similar.Info.map((props, index) => {
            if ( props.Type === "book" || props.Type === "author"  ) {
                return <BookCards data={props} key={props.wUrl+index} callBack={this.openModal}/>;
            }
        }) );
        return books;
    }
    renderMusic() {
        var music = this.state.data.Similar.Results.map((props, index) => {
            if ( props.Type === "music"  ) {
                return <MediaCards data={props} key={props.yID} callBack={this.openModal}/>;
            }

        });
        music.push( this.state.data.Similar.Info.map((props, index) => {
            if ( props.Type === "music"  ) {
                return <MediaCards data={props} key={props.yID} callBack={this.openModal}/>;
            }

        }) );
        return music;
    }
    renderPodcast() {
        return this.state.data.Similar.Results.map((props, index) => {
            if ( props.Type === "podcasts"  ) {
                return <Cards data={props} key={props.id} callBack={this.openModal}/>;
            }
        });
    }
    renderTvseries() {
        var show = this.state.data.Similar.Results.map((props, index) => {
            if ( props.Type === "show"  ) {
                return <MediaCards data={props} key={props.yID} callBack={this.openModal}/>;
            }
        });

        show.push( this.state.data.Similar.Results.map((props, index) => {
            if ( props.Type === "show"  ) {
                return <MediaCards data={props} key={props.yID} callBack={this.openModal}/>;
            }
        }) );
        return show;
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