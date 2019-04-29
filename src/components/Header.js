import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Icon from "../BFM-nobg.svg";

export class Header extends Component{
    render() {
        return (
            <div className= "header clearfix">
                <h4 className="left-align clearfix header__heading">BestForMe</h4>
                <Link to = "/registration"><p className="waves-effect waves-light btn right-align clearfix">Create Account</p></Link>
            </div>
        );
    }
}