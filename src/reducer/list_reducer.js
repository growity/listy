
const initialState = { lists: [] };
export default (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_LIST': {
      return { ...state, lists: [...state.lists, action.lists] };
    }
    case 'ADD_ITEM': {
      return {
        lists: state.lists.map((list) => list.id === action.items.list_id ?
          { ...list, items: [...list.items, action.items] } : list),
      };
    }
    case 'GET_LISTS': {
      return state;
    }
    default:
      return state;
  }
};
