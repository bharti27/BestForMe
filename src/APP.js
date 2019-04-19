import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import DashBoard from "./components/DashBoard";
import {Login} from "./components/Login";
import {Registration} from "./components/Registration";
import {Favorites} from "./components/Favorites";
import {Account} from "./components/Account";
import Header from "./components/Header";

function APP() {
    return (
        <Router>
            <div>
                <Header/>
                <Route exact path="/" component={ Login } />
                <Route path="/dashboard" component={DashBoard} />
                <Route path="/registration" component={Registration} />
                <Route path="/favorites" component={Favorites} />
                <Route path="/account" component={Account} />
            </div>
        </Router>
    );
}

export default APP;
