// import DB from '../db/db';

export const getLists = () => ({
  type: 'GET_LISTS',
  // lists: data,
});

export const addLists = list => ({
  type: 'ADD_LIST',
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
    dispatch(addLists(list));
    // DB.lists.add(listArgument).then(() => {
    //   dispatch(getListsAsync());
    // });
  };
}
