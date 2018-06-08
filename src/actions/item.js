// import DB from '../db/db';
// import { getListsAsync } from './lists';

// export const itemList = (items, list_id) => ({
//   type: 'GET_ITEMS',
//   items,
//   list_id,
// });

export const addItem = (data, id) => ({
  type: 'ADD_ITEM',
  items: data,
  list_id: id,
});

export const getSuggestions = lastParams => ({
  type: 'GET_SUGGESTIONS',
  lastParams,
});

// export function getItemsAsync(listId = null) {
//   return (dispatch) => {
//     dispatch(itemList([], null));
//     if (listId === null) {
//       dispatch(itemList([], null));
//     } else {
//       DB.lists.get(listId).then((list) => {
//         dispatch(itemList(list, listId));
//       });
//     }
  // };
// }

export function addItemAsync(item) {
  return (dispatch) => {
    dispatch(addItem(item, item.list_id));
    // const itemSymbols = [];
    // item.text.split(' ').forEach((items) => {
    //   DB.lists.get({ symbol: items[0] }).then((item) => {
    //     if (Array.isArray(item.items)) {
    //       item.items.forEach((it) => {
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
    // item.selectedItem = itemSymbols;
    // DB.lists.get(item.list_id).then((list) => {
    //   if (Array.isArray(list.items)) {
    //     list.items = [];
    //   }
    //   list.items.push(item);
    //   DB.lists
    //     .update(item.list_id, { items: list.items })
    //     .then(() => dispatch(getListsAsync()));
    // });
  };
}

export function getSuggestionsByLastWordAsync(lastWord, listId) {
  // const text = lastWord.substr(1).toLowerCase();
  return (dispatch) => {
    dispatch(getSuggestions({ lastWord, listId }));
  };
  // return (dispatch) => {
  //   const allItems = [];
  //   DB.lists
  //     .where('id')
  //     .notEqual(listId)
  //     .and(lists => lists.symbol === symbol[0])
  //     .toArray()
  //     .then((list) => {
  //       if (typeof list === 'object') {
  //         list.forEach((listItem) => {
  //           listItem.items.forEach((item) => {
  //             if (item.text.toLowerCase().indexOf(text) > -1) {
  //               allItems.push({ text: item.text, symbol: listItem.symbol });
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
