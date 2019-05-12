import React, { Component }from "react";
// //import { BrowserRouter as Router, Route, Link,
//     Redirect,
//     withRouter } from "react-router-dom";
import DashBoard from "./components/DashBoard";
import Login from "./components/Login";
import Registration from "./components/Registration";
import Favorites from "./components/Favorites";
import SearchResults from "./components/SearchResults";
import connect from "react-redux/es/connect/connect";
import {
    BrowserRouter as Router,
    Route,
    Link,
    Redirect,
    withRouter
} from "react-router-dom";
import {PrivateRoute} from "./PrivateRoute";

class APP extends Component {
    render () {
        return (
            <Router>
            <div>
                <Route path="/" exact key = "login" component={Login} />
                <PrivateRoute path="/dashboard" key ="dashboard" component={ DashBoard} auth = { this.props.authUser }/>
                <Route path="/registration" key ="registration" component={Registration} auth = { this.props.authUser }/>
                <PrivateRoute path="/favorites"  key ="favorites" component={Favorites} auth = { this.props.authUser } />
                <PrivateRoute path="/search" key ="search" component={SearchResults} auth = { this.props.authUser } />
            </div>
        </Router> );
    }
}

const mapStateToProps = state => {
    return { authUser: state.simpleReducer.authUser};
};
export default connect(mapStateToProps, null)( APP );
