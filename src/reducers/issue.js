import { ADD_ISSUE, GET_ISSUES } from '../constants';

const initialState = { issues: [] };
export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_ISSUE: {
      return state;
    }
    case GET_ISSUES: {
      return { ...state, issues: action.issues };
    }
    default:
      return state;
  }
};
