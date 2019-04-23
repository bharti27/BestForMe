import React, { Component } from 'react';
import M from "materialize-css";
import Cards from "./Cards";
import loginDetails from '../usersDetails'

export class Favorites extends Component {
  constructor( props ) {
    super(props);
    this.state = { 
      favorites: []
    };
  }
    componentDidMount() {
        // Auto initialize all the things!
        M.AutoInit();
    }

    componentWillMount() {
      var favorites = JSON.parse(JSON.stringify(loginDetails));
      if (this.props.authenticatedUser !== null && favorites.loginDetails.users[this.props.authenticatedUser] !== null){
        this.state.favorites = favorites.loginDetails.users[this.props.authenticatedUser].favorites;
      } else {
       // window.location.href = '/';
      }
    }

    componentWillUpdate( nextProps, nextState ) { 
      alert("auth= " +this.props.authenticatedUser+"\nprops: "+this.props +"\nnextProps: "+nextProps)
      return true }

    render() {
      let resultsDisplay;

        if (this.state.favorites == null || this.state.favorites == undefined){
          resultsDisplay = <p>You don't have any favorites</p>
          
        } else {
          resultsDisplay =  <div className = "row" >
                              {this.state.favorites.map((value, index) => {
                                return <Cards data={value} key={value.yID}/>;
                              })}
                            </div>
      }

      return (
          <div>
            <h1>Favorites Page</h1>
            {resultsDisplay}
          </div>
      );
    }
}
export default Favorites;