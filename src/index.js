import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import Links from './components/link';
import reducers from './reducer/index';
import registerServiceWorker from './registerServiceWorker';
import Project from './components/project';
import Issue from './components/issue';
import Lists from './components/lists';

const createStoreMiddleware = applyMiddleware(thunkMiddleware)(createStore);
const root = { flexGrow: 1 };
const Index = () => (
  <Provider store={createStoreMiddleware(reducers)}>
    <div className="App" style={root}>
      <Grid container spacing={16}>
        <Grid item xs={12} sm={12}>
          <AppBar position="static">
            <Toolbar>
              <Typography>Listy</Typography>
            </Toolbar>
          </AppBar>
        </Grid>
        <Grid item xs={12} sm={12}>
          <Links />
        </Grid>
        <Grid item xs={12} sm={12}>
          <Project />
        </Grid>
        <Grid item xs={12} sm={12}>
          <Issue />
        </Grid>
        <Grid item xs={12} sm={12}>
          <Lists />
        </Grid>
      </Grid>
    </div>
  </Provider>
);
ReactDOM.render(<Index />, document.getElementById('root'));
registerServiceWorker();
