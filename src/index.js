import React from 'react';
import ReactDOM from 'react-dom';
import "./css/trees.css";
import App from "./js/App";

import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

ReactDOM.render(
    <App />,
    document.getElementById('root')
);