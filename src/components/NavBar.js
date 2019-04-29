<<<<<<< HEAD
import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Favorite from '@material-ui/icons/Favorite';
import MoreIcon from '@material-ui/icons/MoreVert';
import Home from '@material-ui/icons/Home';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import {
    Link
} from "react-router-dom";
const styles = theme => ({
  root: {
    width: '100%',
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing.unit * 2,
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit * 3,
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200,
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
});

class NavBar extends React.Component {
  state = {
    anchorEl: null,
    mobileMoreAnchorEl: null,
  };

  handleProfileMenuOpen = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuClose = () => {
    this.setState({ anchorEl: null });
    this.handleMobileMenuClose();
  };

  handleMobileMenuOpen = event => {
    this.setState({ mobileMoreAnchorEl: event.currentTarget });
  };

  handleMobileMenuClose = () => {
    this.setState({ mobileMoreAnchorEl: null });
  };

  navToHome = event =>{
    this.props.history.push('/dashboard');
    if(this.state.anchorEl !== null){
      this.handleMenuClose();
    }
    if(this.state.mobileMoreAnchorEl !== null){
      this.handleMobileMenuClose();
    }
  };

  navToFavorites = event =>{
      //this.props.history.push('/favorites');
    if(this.state.anchorEl !== null){
      this.handleMenuClose();
    }
    if(this.state.mobileMoreAnchorEl !== null){
      this.handleMobileMenuClose();
=======
import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
import $ from "jquery";
import searchResults from './SearchResults';
import * as ReactDOM from "react-dom";
class NavBar extends Component{
    constructor( props ) {
        super( props );
        this.state = {
          query: ""
        };
        this.submit  = this.submit.bind(this);
>>>>>>> d969351230c7f3af3530182e0bf8dad05b93028a
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    submit (event) {
      event.preventDefault();
      event.stopPropagation();
      if (this.state.query !== undefined  && this.state.query !== "" ) {
         // ReactDOM.unmountComponentAtNode( searchResults );
        this.props.history.push('/search?filter=' + this.state.query );
      }
    }

    render() {
        return (
            <nav className=" header clearfix">
            <div className = "nav-wrapper">
            <h4 className = "left-align clearfix header__heading__nav"> BestForMe </h4>
              
                <div className="input-field">
                  <form onSubmit = { this.submit }>
                    <i className="material-icons search_icon">search</i>
                    <input id="search" type="text" className="" placeholder="Search" value = {this.state.query} onChange={ this.handleChange( 'query' )} />
                  </form>
                
                </div>
            <ul className="right hide-on-med-and-down">
                <li><Link to = "/dashboard">
                    <i className="waves-effect waves-light right-align clearfix small material-icons icons">refresh</i>
                </Link></li>
                <li><Link to = "/dashboard">
                    <i className=" waves-effect waves-light right-align clearfix small material-icons icons">home</i>
                </Link></li>
                <li><Link to = "/favorites">
                    <i className=" waves-effect waves-light right-align clearfix small material-icons icons">favorite</i>
                </Link></li>

                <li>
                    <Link to="/login">
                        <i  className=" waves-effect waves-light right-align clearfix small material-icons icons">power_settings_new</i>
                    </Link>
                </li>
            </ul>
          </div>
          </nav>
        );
    }   
}

export default withRouter(NavBar);