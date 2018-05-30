import { combineReducers } from 'redux';
import sites from './site_reducer';
import projects from './project_reducer';
import issues from './issue_reducer';
import lists from './list_reducer';
import items from './item_reducer';

const rootReducer = combineReducers({
  sites,
  projects,
  issues,
  lists,
  items,
});

export default rootReducer;
