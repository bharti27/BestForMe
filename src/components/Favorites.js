import React, { Component } from 'react';
import Cards from "../MediaCard";
import { connect } from "react-redux";
import NavBar from "./NavBar";
import $ from "jquery";

class Favorites extends Component {
  constructor( props ) {
    super(props);
    this.state  = {

    };
  }
    componentDidMount() {
        $( 'body' ).css( {
            background: this.props.authUser.primaryColor,
            color: this.props.authUser.secondaryColor
        } );
        $( 'nav' ).css( {
            background: this.props.authUser.secondaryColor,
            color: this.props.authUser.primaryColor
        } )
    }

    componentWillMount() {
    }

    render() {
      let resultsDisplay;
        if (JSON.stringify(this.props.authUser.favorites) === "{}" || this.props.authUser.favorites === null || this.props.authUser.favorites === undefined){
          resultsDisplay = <p>You don't have any favorites</p>
          
        } else {
          resultsDisplay =  <div className = "row" >
                              {this.props.authUser.favorites.map((value, index) => {
                                return <Cards data={value} key={value.yID}/>;
                              })}
                            </div>
      }

      return (
          <div>
              <NavBar />
            <h1>Favorites Page</h1>
            {resultsDisplay}
          </div>
      );
    }
}

const mapStateToProps = state => {
    return { authUser: state.simpleReducer.authUser };
};
export default connect(mapStateToProps, null)(Favorites);