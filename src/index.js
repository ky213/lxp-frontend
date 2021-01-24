import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ThemeProvider } from '@material-ui/core/styles';

import { Preloader } from 'Components';
import { theme } from 'Themes';
import { clearAuthentication } from 'Store/Reducers/authentication';
import initAxios from 'Config/axios';
import store from 'Store/reduxStore';
import reportWebVitals from './reportWebVitals';
import App from './App';

import './index.css';
import './Utils/i18n';

const actions = bindActionCreators({ clearAuthentication }, store.dispatch);
initAxios(actions.clearAuthentication);

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
