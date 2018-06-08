
const initialState = { items: [], symbolItems: [] };
export default (state = initialState, action) => {
  switch (action.type) {
    // case 'ADD_ITEM': {
    //   console.log('ADD_ITEM:', state);
    //   return { ...state, lists: { ...state.lists[0].items, items: [{ id: 'asdf' }] } };
    //   // return {
    //   //   lists: state.lists.map(
    //   //     list => list.id === action.items.list_id ? { ...list, items: [{ id: '22' }] } : list,
    //   //   ),
    //   // };
    // }
    // case 'GET_SYMBOL_ITEMS': {
    //   return { ...state, symbolItems: action.symbolItems };
    // }
    case 'GET_ITEMS':
    default:
      return state;
  }
};
