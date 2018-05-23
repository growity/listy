import { GET_SITES, ADD_SITE } from '../constants';

const initialState = { sites: [] };
export default (state = initialState, action) => {
  switch (action.type) {
    case 'INCREASE_COUNTER': {
      return { ...state, counter: state.counter + 1 };
    }
    case ADD_SITE: {
      return state; // не надо добавлять данные в state
    }
    case GET_SITES: {
      return { ...state, sites: action.site };
    }
    case 'RESET_COUNTER':
      return { ...state, ...{ counter: 0 } };
    default:
      return state;
  }
};
