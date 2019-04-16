import React, { Component } from 'react';
import M from "materialize-css";

class main extends Component {

  componentDidMount() {
    // Auto initialize all the things!
    M.AutoInit();
}

  render() {
    return (
      <div className="App">
        <header className="header card-panel cyan">
          <h1>
            BestForME
          </h1>
        </header>
              <a href = "login.html" >Login Page</a>
              <a href = "Dashboard.html" >Dashboard Page</a>
              <a href = "Users.html" >Users Page</a>
      </div>
    );
  }
}

export default main;