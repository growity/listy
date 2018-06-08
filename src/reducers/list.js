
const initialState = { lists: [], symbolItems: [] };
export default (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_LIST': {
      return { ...state, lists: [...state.lists, action.list] };
    }
    case 'ADD_ITEM': {
      return {
        lists: state.lists.map((list) => list.id === action.items.list_id ?
          { ...list, items: [...list.items, action.items] } : list),
      };
    }
    case 'GET_SUGGESTIONS': {
      const { lastWord, listId } = action.lastParams;
      const lastSymbol = lastWord[0];
      const word = lastWord.substr(1).toLowerCase();
      const { lists } = state;

      const targetList = lists.find(list => list.id !== listId && list.symbol === lastSymbol);
      if (!targetList || !targetList.items.length) {
        return {
          ...state,
          suggestions: [],
        };
      }
      const foundItems = targetList.items.filter(item => item.text.toLowerCase().startsWith(word));
      foundItems.forEach((item) => { item.symbol = targetList.symbol; });

      return {
        ...state,
        suggestions: foundItems,
      };
    }
    case 'GET_LISTS': {
      return state;
    }
    default:
      return state;
  }
};
