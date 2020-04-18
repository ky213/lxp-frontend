import '@babel/polyfill';

import React from 'react';
import { render } from 'react-dom';

import App from './components/App';

import {IntlProvider, FormattedMessage} from 'react-intl';

import en from "./translations/en";
import hr from "./translations/hr";

const messages = {
    en,
    hr
  };

const locale = 'en';

render(
    <IntlProvider locale={locale} messages={messages[locale]}>
        <App />
    </IntlProvider>,
    document.querySelector('#root')
);