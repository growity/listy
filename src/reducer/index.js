import { combineReducers } from 'redux';
import sites from './site_reducer';
import projects from './project_reducer';
import issues from './issue_reducer';

const rootReducer = combineReducers({
  sites,
  projects,
  issues,
});

export default rootReducer;
