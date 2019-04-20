import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import APP from './APP';
import * as serviceWorker from './serviceWorker';
import 'materialize-css/dist/css/materialize.min.css';
import 'owl.carousel/dist/assets/owl.carousel.css';

ReactDOM.render(
    <APP />,
    document.getElementById('root')
);
serviceWorker.unregister();
