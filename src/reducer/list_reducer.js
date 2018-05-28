
const initialState = { lists: [] };
export default (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_LIST': {
      return state;
    }
    case 'GET_LISTS': {
      return { ...state, lists: action.lists };
    }
    default:
      return state;
  }
};
