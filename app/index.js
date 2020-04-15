import '@babel/polyfill';

import React from 'react';
import { render } from 'react-dom';

import App from './components/App';
import TinCan from 'tincanjs';

render(
    <App />,
    document.querySelector('#root')
);