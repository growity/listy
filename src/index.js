import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import registerServiceWorker from './registerServiceWorker';

const Index = () => (
    <MuiThemeProvider>
        <App />
    </MuiThemeProvider>
);
ReactDOM.render(<Index />, document.getElementById('root'));
registerServiceWorker();
