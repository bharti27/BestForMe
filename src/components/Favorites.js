import React, { Component } from 'react';
import Cards from "./Cards";
import { connect } from "react-redux";

class Favorites extends Component {
  constructor( props ) {
    super(props);
    this.state  = {

    };
  }
    componentDidMount() {
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