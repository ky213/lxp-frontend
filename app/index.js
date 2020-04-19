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

const locale = 'hr';

const flattenMessages = ((nestedMessages, prefix = '') => {
    if (nestedMessages === null) {
      return {}
    }
    return Object.keys(nestedMessages).reduce((messages, key) => {
      const value       = nestedMessages[key]
      const prefixedKey = prefix ? `${prefix}.${key}` : key
  
      if (typeof value === 'string') {
        Object.assign(messages, { [prefixedKey]: value })
      } else {
        Object.assign(messages, flattenMessages(value, prefixedKey))
      }
  
      return messages
    }, {})
  });

render(
    <IntlProvider locale={locale} messages={flattenMessages(messages[locale])}>
        <App />
    </IntlProvider>,
    document.querySelector('#root')
);