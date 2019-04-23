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
            // The username of the authenticated user
            authenticatedUser : null
        }

        this.updateAuthenticatedUser = this.updateAuthenticatedUser.bind(this);
    }

    updateAuthenticatedUser = function(username) {
        alert("state =" +JSON.stringify(this.state)+"\nusername = "+username)
        
        //this.state.authenticatedUser = username
        this.setState({
            authenticatedUser: {username}
        })
        alert("state =" +JSON.stringify(this.state)+"\nusername = "+username)
    }

    render() {
        return (
            <Router>
                <div>
<<<<<<< HEAD
                    <NavBar/>
                    <Route exact path="/" component={ Login } />
                    <Route path="/dashboard" component={DashBoard}/>
                    <Route path="/registration" component={Registration} />
                    <Route path="/favorites" component={Favorites} />
                    <Route path="/account" component={Account} />
=======
                    <NavBar authenticatedUser={this.state.authenticatedUser}/>
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
                    <Route exact path="/" render={(props) => <Login {...props} authenticatedUser={this.state.authenticatedUser} updateAuthenticatedUser={this.updateAuthenticatedUser}/>} />
                    <Route path="/dashboard" render={(props) => <DashBoard {...props} authenticatedUser={this.state.authenticatedUser}/>} />
                    <Route path="/registration" render={(props) => <Registration {...props} authenticatedUser={this.state.authenticatedUser}/>} />
                    <Route path="/favorites" render={(props) => <Favorites {...props} authenticatedUser={this.state.authenticatedUser}/>} />
                    <Route path="/account" render={(props) => <Account {...props} authenticatedUser={this.state.authenticatedUser}/>} />
>>>>>>> feature/cardGrid
                </div>
            </Router>
        );
    }
    
}

export default APP;
