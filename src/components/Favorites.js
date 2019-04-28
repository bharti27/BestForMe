import React, { Component } from 'react';
import Cards from "./Cards";
import { connect } from "react-redux";
import { withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import { Grid } from '@material-ui/core';

import Paper from '@material-ui/core/Paper';
var _ = require('underscore')


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
  }
});


class Favorites extends Component {
  constructor( props ) {
    super(props);
    this.state  = {
        favorites: {},
        sortBy: "Added",
        sortDirection: "a" // a -> ascending, d -> descending
    };
  }
    componentDidMount() {
    }

    componentWillMount() {
      this.state.favorites = this.props.authUser.favorites;
    }

    // TODO: Added doesn't work as expected with reverse, revise to use a timestamo instead
    sortFavorites = (by, dir) =>{
      if ( by === "Added") { // Added uses the order that they are stored
        if (dir === "d"){
          this.setState({ favorites: this.props.authUser.favorites.reverse()});
        } else {
          // a is default, if dir is a or anything else, sort ascending
          this.setState({ favorites: this.props.authUser.favorites});
        }
      } else {
        if (dir === "d"){
          this.setState({ favorites: _.sortBy(this.state.favorites, by).reverse()})
        } else {
          // a is default, if dir is a or anything else, sort ascending
          this.setState({ favorites: _.sortBy(this.state.favorites, by)})
        }
      }
    }

    handleSort = name => event => {
      // Using temp local vars because setState() is async
      var tempDir = this.state.sortDirection
      var tempBy  = this.state.sortBy

      if (name ===  "sortDirection") {
        tempDir = event.target.value
        this.setState({ sortDirection: tempDir});
      }

      if (name === "sortBy") {
        tempBy = event.target.value
        this.setState({ sortBy: tempBy});
      }

      this.sortFavorites(tempBy, tempDir)
      
    }

    render() {
      const { classes } = this.props;
      let resultsDisplay;
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
              <option value={"Added"}>Added</option>
            </Select>
          </FormControl>
        </div>);

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
              }}
            >
              <option value={"a"}>Ascending</option>
              <option value={"d"}>Decsending</option>
            </Select>
          </FormControl>
        </div>);

      if (JSON.stringify(this.state.favorites)  === "{}" || this.state.favorites  === null || this.state.favorites === undefined){
        resultsDisplay = <p>You don't have any favorites</p>
      } else {
        resultsDisplay =  <div >
                            <div className="row">

                            </div>
                            <div className= "row">
                              {this.state.favorites .map((value, index) => {
                                return <Cards data={value} key={value.yID}/>;
                              })}
                            </div>
                          </div>
      }

      return (
        <div className={classes.root}> 
          <Grid container direction="row"  justify="space-between"> 
            
              <Grid className={classes.favTitle} item container direction="row" ><h2>Favorites </h2></Grid>
              <Grid item container direction="row">
                <Grid item >
                  {sortBySelector}
                </Grid>
                <Grid item >
                  {sortDirectionSelector}
                </Grid>
              </Grid>
              
              
              
            
          </Grid>
          {resultsDisplay}
        </div>
      );
    }
}

const mapStateToProps = state => {
    return { authUser: state.simpleReducer.authUser };
};
export default connect(mapStateToProps, null)(withStyles(styles)(Favorites));