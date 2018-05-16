import { createStore, applyMiddleware } from 'redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import storeSite from './state';

const customMiddleWare = store => next => action => {
  next(action);
};

const store = createStore(storeSite, applyMiddleware(customMiddleWare));

const Index = () => (
  <MuiThemeProvider>
    <App store={store} />
  </MuiThemeProvider>
);
ReactDOM.render(<Index />, document.getElementById('root'));
registerServiceWorker();
