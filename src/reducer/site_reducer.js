import { GET_SITES, ADD_SITE } from '../constants';

const initialState = { sites: [] };
export default (state = initialState, action) => {
  switch (action.type) {
    case GET_SITES:
      return { ...state, sites: action.site };
    case ADD_SITE:
    default:
      return state;
  }
};
