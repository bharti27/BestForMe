import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import APP from './APP';
import rootReducer from "./rootReducer";
import 'materialize-css/dist/css/materialize.min.css';
import 'owl.carousel/dist/assets/owl.carousel.css';
import Provider from "react-redux/es/components/Provider";
import { ConnectedRouter } from 'connected-react-router'
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

//import createHistory from 'history/createBrowserHistory';
const history = require("history").createBrowserHistory();


const store = createStore( rootReducer, {}, applyMiddleware(thunk) );

ReactDOM.render(
    <Provider store={ store } history = { history }>
        <APP />
    </Provider>,
    document.getElementById('root')
);
export  { store };