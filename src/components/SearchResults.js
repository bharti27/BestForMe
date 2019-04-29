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
            infoOutput: [],
            resultsOutput: [],
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
        if (dir === "d"){
            this.setState({ resultsOutput: _.sortBy(this.state.Results, by).reverse()})
        } else {
        // a is default, if dir is a or anything else, sort ascending
            this.setState({ resultsOutput: _.sortBy(this.state.Results, by)})
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
              <option value={"a"}>Ascending</option>
              <option value={"d"}>Decsending</option>
            </Select>
          </FormControl>
        </div>);

        const infoDisplay = (
            <div className="">
                <div className="row"/>
                <div className= "row ">
                    {this.state.infoOutput.map((value, index) => {
                        if ( value.title === undefined ) {
                            return <MediaCards data={value} key={value.yID}/>;
                        } else {
                            return <Cards data={value} key={value.id}/>;
                        }

                    })}
                </div>
            </div>
        );


        return (
            <div>
                <NavBar />
                <div className={[classes.root, classes.favoritesHeader].join(" ")}>
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
                    <div className="">
                        <div className="row"/>
                        <div className= "row ">
                            {this.state.resultsOutput.map((value, index) => {
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