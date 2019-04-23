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

        // TODO: figure out how to share state or props in a 
        //       way that child components (pages) have access
        this.state = {
            // the username of the authenticated user
            authenticatedUser : "mamoke88"
        }
    }
    render() {
        return (
            <Router>
                <div>
                    <NavBar/>
                    <Route exact path="/" component={ Login } />
                    <Route path="/dashboard" component={DashBoard}/>
                    <Route path="/registration" component={Registration} />
                    <Route path="/favorites" component={Favorites} />
                    <Route path="/account" component={Account} />
                </div>
            </Router>
        );
    }
    
}

export default APP;
