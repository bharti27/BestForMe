import React, { Component } from 'react';
import Cards from "../MediaCard";
import { connect } from "react-redux";
import NavBar from "./NavBar";
import $ from "jquery";
import { withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
var _ = require('underscore')


const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
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
      this.state.favorites = this.props.authUser.favorites;
    }

    // TODO: Added doesn't work as expected with reverse, revise
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
          this.setState({ favorites: _.sortBy(this.props.authUser.favorites, by).reverse()})
        } else {
          // a is default, if dir is a or anything else, sort ascending
          this.setState({ favorites: _.sortBy(this.props.authUser.favorites, by)})
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
        <div className="row">
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
        <div className="row">
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
        resultsDisplay =  <div className= "container" >
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
          <div>
              <NavBar />
            <h1>Favorites Page</h1>
          <div className={classes.root}>
            <div className="row"><h1>Favorites Page</h1></div>
            {sortBySelector}
            {sortDirectionSelector}

            {resultsDisplay}
          </div>
      );
    }
}

const mapStateToProps = state => {
    return { authUser: state.simpleReducer.authUser };
};
export default connect(mapStateToProps, null)(withStyles(styles)(Favorites));