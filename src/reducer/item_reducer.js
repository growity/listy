
const initialState = { items: [], symbolItems: [] };
export default (state = initialState, action) => {
  switch (action.type) {
    case 'GET_ITEMS': {
      return { ...state, items: action.items };
    }
    case 'GET_SYMBOL_ITEMS': {
      return { ...state, symbolItems: action.symbolItems };
    }
    default:
      return state;
  }
};
