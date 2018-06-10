import { GET_LISTS, ADD_LIST, ADD_ITEM, GET_SUGGESTIONS } from '../constants';

const initialState = { lists: [], symbolItems: [] };
export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_LIST: {
      return { ...state, lists: [...state.lists, action.list] };
    }
    case ADD_ITEM: {
      return {
        lists: state.lists.map(list => (list.id === action.item.listId ?
          { ...list, items: [...list.items, action.item] } : list)),
      };
    }
    case GET_SUGGESTIONS: {
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
      /* eslint-disable no-param-reassign */
      foundItems.forEach((item) => { item.symbol = targetList.symbol; });
      /* eslint-enable no-param-reassign */

      return {
        ...state,
        suggestions: foundItems,
      };
    }
    case GET_LISTS: {
      return state;
    }
    default:
      return state;
  }
};
