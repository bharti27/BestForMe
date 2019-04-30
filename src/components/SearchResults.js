import React, { Component } from 'react';
import M from "materialize-css";
import MediaCards from "../MediaCard";
import Cards from "./Cards";
import BookCards from "./BookCards";
import { connect } from "react-redux";
import NavBar from "./NavBar";
import $ from "jquery";
import queryString from 'query-string';
import { withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import _ from 'lodash';
import APP from "../Utils";
import ModalVideo from "react-modal-video";

const styles = theme => ({
    root: {
      flexGrow: 1
    },
    formControl: {
      margin: theme.spacing.unit,
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing.unit * 2,
    },
    favTitle: {
      marginLeft: theme.spacing.unit * 2
    },
    results: {
      marginLeft: theme.spacing.unit * -1.5,
      marginRight: theme.spacing.unit * -1.5
    },
    favoritesHeader: {
      margin: theme.spacing.unit * 4
    },
    sectionHeader: {
      display: 'flex',
    },
    grow: {
      flexGrow: 1,
    },
    noResults: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
    }
  });

class SearchResults extends Component {
    constructor( props ) {
        super(props);
        this.state  = {
            query: "",
            Info: [],
            Results:[],
            infoOutput: [],
            resultsOutput: [],
            sortBy: "Relevance",
            sortDirection: "asc", // asc -> ascending, desc -> descending
            modalOpen: false,
            modalURLId: "",
            modalType: ""
        };
        this.openModal = this.openModal.bind( this );
        this.handleClose = this.handleClose.bind( this );
      }

    componentDidMount() {
        $( 'body' ).css( {
            background: this.props.authUser.primaryColor,
            color: this.props.authUser.secondaryColor
        } );
        $( 'nav' ).css( {
            background: this.props.authUser.secondaryColor,
            color: this.props.authUser.primaryColor
        } )
    }
    componentWillMount() {
        this.retrieveData();
    }

    componentWillReceiveProps() {
        this.retrieveData();
    }

    retrieveData()  {
        const values = queryString.parse(this.props.history.location.search);
        var _self = this;
        let callbackMethod = response  => {
            //alert(JSON.stringify(response));
            let nowUpdate = ()  => {
                _self.setState( {
                    Results: response.Similar.Results,
                    infoOutput: response.Similar.Info,
                    resultsOutput: response.Similar.Results
                } );
            };
            
            if (response !== undefined && response !== null){
                _self.setState( {
                    Results: [],
                    infoOutput: [],
                    resultsOutput:[],
                    query: values.filter
                }, nowUpdate);
            }
            
        };
        APP.getResultsFromTasteDive( { q: values.filter, info: 1 }, callbackMethod  );
    }

    
    sortResults = (by, dir) =>{
        if (by === "name") {
            this.setState({resultsOutput: _.orderBy(this.state.Results, ['title', 'name'], [dir])})
        } else if (by === "Relevance"){
            dir === "asc" ? this.setState({resultsOutput: this.state.Results}) :
                                      this.setState({resultsOutput: _.reverse(this.state.Results)})
        } else {
            this.setState({resultsOutput: _.orderBy(this.state.Results, [by], [dir])})
        }
    };

    handleSort = name => event => {
        // Using temp local vars because setState() is async
        var tempDir = this.state.sortDirection;
        var tempBy  = this.state.sortBy;

        if (name ===  "sortDirection") {
          tempDir = event.target.value;
          this.setState({ sortDirection: tempDir});
        }

        if (name === "sortBy") {
          tempBy = event.target.value;
          this.setState({ sortBy: tempBy});
        }
        this.sortResults(tempBy, tempDir)
      };

      // "Not Found" response looks like this
      // {"Similar":{"Info":[{"Name":"xdx","Type":"unknown"},{"Name":"xdx","Type":"unknown"}],"Results":[]}}
      foundValidResults = () => {
          try {
              if(this.state.infoOutput === undefined || this.state.infoOutput === [] || _.first(this.state.infoOutput).Type === "unknown") {
                  return false;
              }
              if(this.state.resultsOutput === undefined || this.state.resultsOutput === [] ) {
                return false;
                }
              return true;
          } catch {
            return false;
          }
      };

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


    render() {
        const { classes } = this.props;

        // Dropdown to select what to sort by
      const sortBySelector = (
        <div className="">
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="age-native-simple">Sort By</InputLabel>
            <Select
              native
              value={this.state.sortBy}
              onChange={this.handleSort('sortBy')}
              inputProps={{
                name: 'sortBy',
                id: 'sort-by-selector',
              }}
            >
              <option value={"Relevance"}>Default</option> {/*Changed to default because API return order != relevance */}
              <option value={"Name"}>Name</option>
              <option value={"Type"}>Type</option>
            </Select>
          </FormControl>
        </div>);

      // Dropdown to select sort direction
      const sortDirectionSelector = (
        <div className="">
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="age-native-simple">Sort Direction</InputLabel>
            <Select
              native
              value={this.state.sortDirection}
              onChange={this.handleSort('sortDirection')}
              inputProps={{
                name: 'sortDirection',
                id: 'sort-dir-selector',
              }}>
              <option value={"asc"}>Ascending</option>
              <option value={"desc"}>Decsending</option>
            </Select>
          </FormControl>

        </div>);
        let isUnknown = false;
        const infoDisplay = (
            <div className="">
                <div className="row"/>
                <div className= "row ">
                    {this.state.infoOutput.map((value, index) => {
                        if ( value.Type !== "unknown"  ) {
                            if ( value.title === undefined ) {
                                if (value.Type === "book" || value.Type === "author") {
                                    return <BookCards data={value} key={value.wUrl+index} callBack={this.openModal}/>;
                                } else {
                                    return <MediaCards data={value} key={value.yID} callBack={this.openModal}/>;
                                }
                            }
                            else {
                                return <Cards data={value} key={value.id} callBack={this.openModal}/>;
                            }
    
                        } else {
                            if ( !isUnknown ) {
                                isUnknown = true;
                                return (
                                    
                                    <div className="row">
                                        <Paper className="center" elevation={1} color="inherit">
                                            <Typography variant="h5" component="h3" align="center" >
                                                No results for {this.state.query}
                                            </Typography>
                                        </Paper>
                                    </div>
                                );
                            }
                            
                        }
                        
                    })}
                </div>
            </div>
        );
        

        const resultsDisplay = (
            <div className="">
                <div className="row"/>
                <div className= "row ">
                    {this.state.resultsOutput.map((value, index) => {
                        if ( value.title === undefined ) {
                            if (value.Type === "book" || value.Type === "author") {
                                return <BookCards data={value} key={value.wUrl+index} callBack={this.openModal}/>;
                            } else {
                                return <MediaCards data={value} key={value.yID} callBack={this.openModal}/>;
                            }
                        }
                        else {
                            return <Cards data={value} key={value.id} callBack={this.openModal}/>;
                        }

                    })}
                </div>
            </div>
        );

        return (
            <div>
                <NavBar />
                <div className={[classes.root, classes.favoritesHeader].join(" ")}>
                    <ModalVideo
                        channel='youtube'
                        isOpen={this.state.modalOpen}
                        videoId= { this.state.modalURLId }
                        onClose={ this.handleClose }
                    />
                <AppBar position="static" color="default">
                    <Toolbar>
                        <Typography variant="h6" color="inherit">
                        Search Result
                        </Typography>
                    </Toolbar>
                    </AppBar>
                    {infoDisplay}
                    <AppBar position="static" color="default">
                    <Toolbar>
                        <Typography variant="h6" color="inherit">
                        Similar Media
                        </Typography>
                        <div className={classes.grow} />
                        <div className={classes.sectionHeader}>
                            {sortBySelector}
                            {sortDirectionSelector}
                        </div>
                    </Toolbar>
                    </AppBar>
                    {resultsDisplay}
                </div>
            </div>
        
        );
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
    }
}
const mapStateToProps = state => {
    return { authUser: state.simpleReducer.authUser };
};
export default connect(mapStateToProps, null)(withStyles(styles)(SearchResults));