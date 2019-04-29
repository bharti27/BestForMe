import React, { Component } from 'react';
import { Link } from "react-router-dom";
import logo from '../logo.png'

export class Header extends Component{
    render() {
        return (
            <div className= "header valign-wrapper clearfix">
                <img src={logo} alt = "logo" className="logo"/>
                <h4 className="left-align clearfix header__heading">BestForMe</h4>
                <Link to = "/registration"><p className="waves-effect waves-light btn right-align clearfix">Create Account</p></Link>
            </div>
        );
    }
}