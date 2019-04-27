import React, { Component } from 'react';
import { Link } from "react-router-dom";
import $ from "jquery";
class NavBar extends Component{
    constructor( props ) {
        super( props );
    }
    render() {
        return (
            <nav className=" header clearfix">
            <div className = "nav-wrapper">
            <h4 className = "left-align clearfix header__heading__nav"> BestForMe </h4>
                <div className="input-field">
                    <i className="material-icons search_icon">search</i>
                    <input id="search" type="text" className="" placeholder="Search"/>
                </div>
            <ul className="right hide-on-med-and-down">
                <li><Link to = "/dashboard">
                    <i className=" waves-effect waves-light right-align clearfix small material-icons">home</i>
                </Link></li>
                <li><Link to = "/favorites">
                    <i className=" waves-effect waves-light right-align clearfix small material-icons">favorite</i>
                </Link></li>

                <li>
                    <Link to="/login">
                        <i  className=" waves-effect waves-light right-align clearfix small material-icons">power_settings_new</i>
                    </Link>
                </li>
            </ul>
          </div>
          </nav>
        );
    }
}

export default NavBar;