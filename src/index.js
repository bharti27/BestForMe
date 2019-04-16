import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Main from './main';
import * as serviceWorker from './serviceWorker';
import 'materialize-css/dist/css/materialize.min.css'

ReactDOM.render(<Main />, document.getElementById('root'));

serviceWorker.unregister();
