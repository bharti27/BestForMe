<<<<<<< HEAD

=======
import React, { Component } from 'react';
import * as M from "materialize-css";
import Cards from "./Cards";

export class Trending extends Component {
    constructor( props ) {
        super(props);
        this.state = {

        };
    }
    componentDidMount() {

        // M.AutoInit();
        // var elems = document.querySelectorAll('.carousel');
        // const instance = M.Carousel.getInstance(elems);
        //instance.next();
    }

    componentWillMount() {

    }

    render() {
        return (
            <div className= "" >
                <div className="carousel">
                    {this.props.data.Results.map((value, index) => {
                            return <a className="carousel-item" href="" key = { value.yID }>
                                <img src={"http://img.youtube.com/vi/"+value.yID + "/mqdefault.jpg"} height= "300" width="500"/>
                            </a>
                    })}
                </div>
                <h4 className= "center">Trending in your World!</h4>
            </div>
        );
    }
    componentDidUpdate( prevProps ) {
        M.AutoInit();
        var elems = document.querySelectorAll('.carousel');
        const instance = M.Carousel.getInstance(elems, { fullWidth: true });
    }
}
export default Trending;
>>>>>>> e01c6129f09375c86c61c0ad372ea34aa0c8e95a
