
const initialState = { lists: [], symbolItems: [] };
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
    case 'GET_SYMBOL_ITEMS': {
      const { lastWord, listId } = action.lastParams;
      const symbol = lastWord[0];
      const word = lastWord.substr(1).toLowerCase();
      const { lists } = state;

      const targetList = lists.find(list => list.id !== listId && list.symbol === symbol);
      if (!targetList || !targetList.items.length) {
        return {
          ...state,
          symbolItems: [],
        };
      }
      const foundItems = targetList.items.filter(item => item.text.indexOf(word) > -1);

      return {
        ...state,
        symbolItems: foundItems,
      };
    }
    case 'GET_LISTS': {
      return state;
    }
    default:
      return state;
  }
};
