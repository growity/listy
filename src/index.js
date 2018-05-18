import { createStore, applyMiddleware } from 'redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import App from './App';
import reducers from './reducer/index';
import registerServiceWorker from './registerServiceWorker';

const createStoreMiddleware = applyMiddleware()(createStore);

const Index = () => (
  <Provider store={createStoreMiddleware(reducers)}>
    <MuiThemeProvider>
      <App />
    </MuiThemeProvider>
  </Provider>
);
ReactDOM.render(<Index />, document.getElementById('root'));
registerServiceWorker();
