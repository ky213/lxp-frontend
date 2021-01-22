import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@material-ui/core/styles';

import { Preloader } from 'Components';
import { theme } from 'Themes';
import reportWebVitals from './reportWebVitals';
import store from 'Store/reduxStore';
import App from './App';

import './index.css';
import './Utils/i18n';

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <Suspense fallback={<Preloader />}>
        <App />
      </Suspense>
    </ThemeProvider>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
