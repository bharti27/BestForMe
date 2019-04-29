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