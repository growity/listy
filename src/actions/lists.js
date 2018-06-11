// import DB from '../db/db';
import { GET_LISTS, ADD_LIST } from '../constants';

export const getLists = () => ({
  type: GET_LISTS,
  // lists: data,
});

export const addList = list => ({
  type: ADD_LIST,
  list,
});

export function getListsAsync() {
  return (dispatch) => {
    dispatch(getLists());
    // DB.lists.toArray().then((lists) => {
    //   dispatch(getLists(lists));
    // });
  };
}

export function addListAsync(list) {
  return (dispatch) => {
    dispatch(addList(list));
    // DB.lists.add(listArgument).then(() => {
    //   dispatch(getListsAsync());
    // });
  };
}
