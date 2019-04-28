import React, { Component } from 'react';
import MediaCards from "../MediaCard";
import Cards from "./Cards";
import { connect } from "react-redux";
import NavBar from "./NavBar";
import $ from "jquery";
import { withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

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

      this.sortFavorites(tempBy, tempDir)

    };

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
        resultsDisplay =  <div className={classes.results}>
                            <div className="row"/>
                            <div className= "row ">
                              {this.state.favorites .map((value, index) => {
                                  if ( value.title === undefined ) {
                                      return <MediaCards data={value} key={value.yID}/>;
                                  } else {
                                      return <Cards data={value} key={value.id}/>;
                                  }

                              })}
                            </div>
                          </div>
      }
      return (
        <div className={[classes.root, classes.favoritesHeader].join(" ")}> 
          <AppBar position="static" color="default">
            <Toolbar>
              <Typography variant="h6" color="inherit">
                Favorites
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
      );
    }
}

const mapStateToProps = state => {
    return { authUser: state.simpleReducer.authUser };
};
export default connect(mapStateToProps, null)(withStyles(styles)(Favorites));