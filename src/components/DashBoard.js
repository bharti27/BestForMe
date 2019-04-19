import React, { Component } from 'react';
import M from "materialize-css";
import Cards from "./Cards";
import APP from "../Utils";
import Header from "./Header";

export class DashBoard extends Component {
    constructor( props ) {
        super(props);
        this.state = { data: { Similar:{ info: [],Results:[] } } };
    }
    componentDidMount() {
        // Auto initialize all the things!

    }
    componentWillMount() {

        const callbackMethod = response  => {
            this.setState( {data: response} );
        };
        APP.getResultsFromTasteDive( { q: "Red Hot Chili Peppers, Pulp Fiction", info: 1 }, callbackMethod );
    }
    render() {
        return (
            <div className="Dashboard">
                <div className="">
                    <h4>Movies</h4>
                    <div className = "row" >
                    {this.state.data.Similar.Results.map((value, index) => {
                        if ( value.Type === "movie"  ) {
                            return <Cards data={value} key={value.yID}/>;
                        }
                    })}
                    </div>
                    <h4>Music</h4>
                    <div className = "row" >
                            {this.state.data.Similar.Results.map((value, index) => {
                                if ( value.Type === "music"  ) {
                                    return <Cards data={value} key={value.yID}/>;
                                }
                            })}
                    </div>
                </div>

            </div>
        );
    }
}
export default DashBoard;