import { combineReducers } from 'redux';
import sites from './site_reducer';

const rootReducer = combineReducers({
  sites,
});

export default rootReducer;
