const initialState = { sites: [], counter: 0 };
export default (state = initialState, action) => {
  switch (action.type) {
    case 'INCREASE_COUNTER': {
      return { ...state, ...{ counter: (state.counter + 1) } };
    }
    case 'ADD_SITE': {
      return { ...state, sites: [...state.sites, action.site] };
    }
    case 'GET_SITES': {
      return state;
    }
    case 'RESET_COUNTER':
      return { ...state, ...{ counter: 0 } };
    default:
      return state;
  }
};
