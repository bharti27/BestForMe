import React, { Component } from 'react';
import M from "materialize-css";

export class Header extends Component {

    componentDidMount() {
        // Auto initialize all the things!
        M.AutoInit();
    }
    // TODO: figure out how to use React links with materialize nav (or use material-ui nav)
    // TODO: change what renders based on if a user is logged in
    render() {
        return (
          <div class="navbar-fixed">
            <nav>
              <div class="nav-wrapper deep-purple darken-2">
                <a href="#" class="brand-logo">BestForME Logo</a>
                <ul id="nav-mobile" class="right hide-on-med-and-down">
                  <li><a href="/registration">(temp) Registration</a></li>
                  <li><a href="/">(temp) Login</a></li>
                  <li><a href="/dashboard">Home</a></li>
                  <li><a href="/favorites">Favorites</a></li>
                  <li><a href="/account">Account</a></li>
                </ul>
              </div>
            </nav>
          </div>    
        );
    }
}
export default Header;