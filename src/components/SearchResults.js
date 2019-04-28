import React, { Component } from 'react';
import M from "materialize-css";
import MediaCards from "../MediaCard";
import Cards from "./Cards";
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
import _ from 'lodash';
import APP from "../Utils";

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
  });

class SearchResults extends Component {
    constructor( props ) {
        super(props);
        this.state  = {
            query: "",
            Info: [],
            Results:[],
            sortBy: "Added",
            sortDirection: "a" // a -> ascending, d -> descending
        };
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
    componentWillUnmount() {
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
            let nowUpdate = ()  => {
                _self.setState( {
                    Results: response.Similar.Results
                } );
            };
            if (response !== undefined && response !== null){
                _self.setState( {
                    Results: [],
                    query: values.filter
                }, nowUpdate );
            }

        };
        APP.getResultsFromTasteDive( { q: values.filter, info: 1 }, callbackMethod  );
    }

    
    render() {
        const { classes } = this.props;
        
        // let resultsDisplay = (
        //
        // );

        return (
            <div>
                <NavBar />
                <div className={[classes.root, classes.favoritesHeader].join(" ")}> 
                    <AppBar position="static" color="default">
                    <Toolbar>
                        <Typography variant="h6" color="inherit">
                        Search Results
                        </Typography>
                        <div className={classes.grow} />
                        <div className={classes.sectionHeader}>
                        </div>
                    </Toolbar>
                    </AppBar>
                    <div className="">
                        <div className="row"/>
                        <div className= "row ">
                            {this.state.Results.map((value, index) => {
                                if ( value.title === undefined ) {
                                    return <MediaCards data={value} key={value.yID}/>;
                                } else {
                                    return <Cards data={value} key={value.id}/>;
                                }

                            })}
                        </div>
                    </div>
                </div>
            </div>
        
        );
    }
}
const mapStateToProps = state => {
    return { authUser: state.simpleReducer.authUser };
};
export default connect(mapStateToProps, null)(withStyles(styles)(SearchResults));