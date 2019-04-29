import React, { Component } from 'react';
import MediaCards from "../MediaCard";
import BookCards from "./BookCards";
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
import _ from 'lodash';
import ModalVideo from "react-modal-video";
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


class Favorites extends Component {
  constructor( props ) {
    super(props);
    this.state  = {
        favorites: {},
        sortBy: "Added",
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
      this.state.favorites = this.props.authUser.favorites;
    }

    sortFavorites = (by, dir) =>{
      if (by === "name") {
          this.setState({favorites: _.orderBy(this.props.authUser.favorites, ['title', 'name'], [dir])})
      } else if (by === "Added"){
          dir === "asc" ? this.setState({favorites: this.props.authUser.favorites}) :
                                    this.setState({favorites: _.reverse(this.props.authUser.favorites)})
      } else {
          this.setState({favorites: _.orderBy(this.props.authUser.favorites, [by], [dir])})
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
              <option value={"Added"}>Added</option>
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
              }}
            >
              <option value={"asc"}>Ascending</option>
              <option value={"desc"}>Decsending</option>
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
                                  if (value.Type === "book" || value.Type === "author") {
                                      return <BookCards data={value} key={value.wUrl+index} callback={this.openModal}/>
                                  } else {
                                      return <MediaCards data={value} key={value.yID} callback={this.openModal}/>;
                                  }
                                }
                                else {
                                    return <Cards data={value} key={value.id} callback={this.openModal}/>;
                                }

                              })}
                            </div>
                          </div>
      }

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
export default connect(mapStateToProps, null)(withStyles(styles)(Favorites));