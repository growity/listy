import { combineReducers } from 'redux';
import sites from './site_reducer';
import projects from './project_reducer';

const rootReducer = combineReducers({
  sites,
  projects,
});

export default rootReducer;
