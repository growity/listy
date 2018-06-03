import DB from '../db/db';
import { getListsAsync } from './lists';

export const itemList = (data, id) => ({
  type: 'GET_ITEMS',
  items: data,
  list_id: id,
});

export const symbolItemsList = argSymbolItems => ({
  type: 'GET_SYMBOL_ITEMS',
  symbolItems: argSymbolItems,
});

export function getItemsAsync(listId = null) {
  return (dispatch) => {
    if (listId === null) {
      dispatch(itemList([], null));
    } else {
      DB.lists.get(listId).then((items) => {
        dispatch(itemList(items, listId));
      });
    }
  };
}

export function addItemAsync(itemArgument) {
  return (dispatch) => {
    DB.lists.get(itemArgument.list_id).then((list) => {
      if (list.items === undefined || typeof list.items !== 'object') {
        list.items = [];
      }
      list.items.push(itemArgument);
      DB.lists.update(itemArgument.list_id, { items: list.items }).then(() => {
        return dispatch(getListsAsync());
      });
    });
  };
}

export function getItemsBySymbolAsync(symbol, listId) {
  return (dispatch) => {
    DB.lists.get({ symbol: symbol }).then((items) => {
      // console.log('Action:', items);
      if (typeof items === 'object' && typeof items.items === 'object') {
        const allItems = items.items.map(item => ({ text: item.text }));
        dispatch(symbolItemsList(allItems));
      }
    });
  };
}
