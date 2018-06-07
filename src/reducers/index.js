import { combineReducers } from 'redux';
import sites from './site';
import projects from './project';
import issues from './issue';
import lists from './list';
import items from './item';

const rootReducer = combineReducers({
  sites,
  projects,
  issues,
  lists,
  items,
});

export default rootReducer;
