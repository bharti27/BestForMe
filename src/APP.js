import React, { Component }from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import DashBoard from "./components/DashBoard";
import {Login} from "./components/Login";
import {Registration} from "./components/Registration";
import {Favorites} from "./components/Favorites";
import {Account} from "./components/Account";
import NavBar from "./components/NavBar";

class APP extends Component {
    constructor(props) {
        super(props);

        this.state = {
            authenticatedUserName : ""
        }
    }
    render() {
        return (
            <Router>
                <div>
                    <NavBar/>
                    <ul>
                        <li>
                            <Link to="/">index</Link>
                        </li>
                        <li>
                            <Link to="/Dashboard">Dashboard</Link>
                        </li>
                        <li>
                            <Link to="/registration">Registration</Link>
                        </li>
                        <li>
                            <Link to="/Favorites">Favorites</Link>
                        </li>
                    </ul>
                    
                    <hr />
                    <Route exact path="/" component={ Login } />
                    <Route path="/dashboard" component={DashBoard} />
                    <Route path="/registration" component={Registration} />
                    <Route path="/favorites" component={Favorites} />
                    <Route path="/account" component={Account} />
                </div>
            </Router>
        );
    }
    
}

export default APP;
