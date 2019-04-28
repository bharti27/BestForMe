import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
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
import { Link } from "react-router-dom";
import { connect } from "react-redux";
const styles = theme => ({
  spacing: {
    unit: 8
  },
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
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit,
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
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 200,
      },
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
  }
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
    }
  }

  navToAccount = event => {
      //this.props.history.push('/account');
    if(this.state.anchorEl !== null){
      this.handleMenuClose();
    }
    if(this.state.mobileMoreAnchorEl !== null){
      this.handleMobileMenuClose();
    }
  }

  logout = event => {
    // TODO: Clear current user
      //this.props.history.push('/');
    if(this.state.anchorEl !== null){
      this.handleMenuClose();
    }
    if(this.state.mobileMoreAnchorEl !== null){
      this.handleMobileMenuClose();
    }
  }


  render() {
    const { anchorEl, mobileMoreAnchorEl } = this.state;
    const { classes } = this.props;
    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    // Menu for Account Icon
    const renderMenu = (
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMenuOpen}
        onClose={this.handleMenuClose}
      >
        <MenuItem onClick={this.navToAccount}>
          <AccountCircle />
          <p>Profile</p>
        </MenuItem>
        <MenuItem onClick={this.logout}>
          <FontAwesomeIcon icon={faSignOutAlt}/>
          <p>Logout</p>
        </MenuItem>
      </Menu>
    );

    // Menu for when NavBar is Mobile size
    const renderMobileMenu = (
      <Menu
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMobileMenuOpen}
        onClose={this.handleMenuClose}
      >
          <Link to="/dashboard">
        <MenuItem >
            <Home/>
          <p>Home</p>
        </MenuItem>
          </Link>
          <Link to="/favorites">
        <MenuItem>
            <Favorite />
          <p>Favorites</p>
        </MenuItem>
          </Link>
          <Link to="/account">
        <MenuItem >
            <AccountCircle />
          <p>Profile</p>
        </MenuItem>
          </Link>
      </Menu>
    );

    // Toolbar for when there is an autheticated user
    const renderAuthNav = (
      <Toolbar>
        <Typography className={classes.title} variant="h6" color="inherit" noWrap>
          BestForMe
        </Typography>
        
          <div className={classes.grow} />
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
                }}
            />
          </div>
          <div className={classes.sectionDesktop}>-
              <Link to="/dashboard">
                <IconButton color="inherit" >
                    <Home/>
                </IconButton>
              </Link>
              <Link to="/favorites">
                <IconButton color="inherit" >
                    <Favorite />
                </IconButton>
              </Link>
              <div className={classes.Link} onClick={this.handleProfileMenuOpen} >
                <IconButton color="inherit" >
                  <AccountCircle />
                </IconButton>
              </div>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton aria-haspopup="true"
              onClick={this.handleMobileMenuOpen}
              color="inherit">
              <MoreIcon />
            </IconButton>
          </div>
      </Toolbar>
    );

    // Toolbar for when there is no authenticated user
    const renderNoAuthNav = (
      <Toolbar>
            <Typography className={classes.title} variant="h6" color="inherit" noWrap>
              BestForMe
            </Typography>
            
              <div className={classes.grow} />
              <p>[Register]</p>
            
          </Toolbar>
    );
    
    
    let nav;
    // alert("authUser=    " + JSON.stringify(this.props.authUser) + "\nthis.props.authUser == {}    " 
    // + JSON.stringify(JSON.stringify(this.props.authUser)  === {}) + "\nthis.props.authUser === {}    " 
    // + JSON.stringify(JSON.stringify(this.props.authUser) === {}));
    

    if (JSON.stringify(this.props.authUser) !== "{}" || this.props.authUser === null || this.props.authUser === undefined){
      alert("renderNoAuthNav");
      
      nav = renderNoAuthNav;
    } else {
      alert("renderAuthNav");
      nav = renderAuthNav;
    }

    return (
      <div className={classes.root}>
        <AppBar position="static">
          {nav}

        </AppBar>
        {renderMenu}
        {renderMobileMenu}
      </div>
    );
    
    
  }
}

NavBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
  return { authUser: state.simpleReducer.authUser };
};

export default connect(mapStateToProps, null)(withStyles(styles)(NavBar));
// export default withStyles(styles)(NavBar);
