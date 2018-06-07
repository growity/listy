// import DB from '../db/db';
// import { getListsAsync } from './lists';

export const itemList = (data, id) => ({
  type: 'GET_ITEMS',
  items: data,
  list_id: id,
});

export const addItem = (data, id) => ({
  type: 'ADD_ITEM',
  items: data,
  list_id: id,
});

export const symbolItemsList = lastParams => ({
  type: 'GET_SYMBOL_ITEMS',
  lastParams,
});

export function getItemsAsync(listId = null) {
  return (dispatch) => {
    dispatch(itemList([], null));
    // if (listId === null) {
    //   dispatch(itemList([], null));
    // } else {
    //   DB.lists.get(listId).then((items) => {
    //     dispatch(itemList(items, listId));
    //   });
    // }
  };
}

export function addItemAsync(item) {
  return (dispatch) => {
    dispatch(addItem(item, item.list_id));
    // const itemSymbols = [];
    // itemArgument.text.split(' ').map((items) => {
    //   DB.lists.get({ symbol: items[0] }).then((item) => {
    //     if (typeof item === 'object' && typeof item.items === 'object') {
    //       item.items.map((it) => {
    //         if (it.text === items.substring(1, items.length)) {
    //           itemSymbols.push({ symbol: items });
    //         }
    //         return true;
    //       });
    //     }
    //     return true;
    //   });
    //   return true;
    // });
    // itemArgument.selectedItem = itemSymbols;
    // DB.lists.get(itemArgument.list_id).then((list) => {
    //   if (list.items === undefined || typeof list.items !== 'object') {
    //     list.items = [];
    //   }
    //   list.items.push(itemArgument);
    //   DB.lists
    //     .update(itemArgument.list_id, { items: list.items })
    //     .then(() => dispatch(getListsAsync()));
    // });
  };
}

export function getItemsBySymbolAsync(lastWord, listId) {
  // const text = lastWord.substr(1).toLowerCase();
  return (dispatch) => {
    dispatch(symbolItemsList({ lastWord, listId }));
  };
  // return (dispatch) => {
  //   const allItems = [];
  //   DB.lists
  //     .where('id')
  //     .notEqual(listId)
  //     .and(lists => lists.symbol === symbol[0])
  //     .toArray()
  //     .then((items) => {
  //       if (typeof items === 'object') {
  //         items.map((item) => {
  //           item.items.map((it) => {
  //             if (it.text.toLowerCase().indexOf(text) > -1) {
  //               allItems.push({ text: it.text, symbol: item.symbol });
  //             }
  //             return true;
  //           });
  //           return true;
  //         });
  //       }
  //       dispatch(symbolItemsList(allItems));
  //     });
  // };
}
