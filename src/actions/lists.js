// import DB from '../db/db';

export const getLists = () => ({
  type: 'GET_LISTS',
  // lists: data,
});

export const addLists = data => ({
  type: 'ADD_LIST',
  lists: data,
});

export function getListsAsync() {
  return (dispatch) => {
    dispatch(getLists());
    // DB.lists.toArray().then((lists) => {
    //   dispatch(getLists(lists));
    // });
  };
}

export function addListAsync(listArgument) {
  return (dispatch) => {
    dispatch(addLists(listArgument));
    // DB.lists.add(listArgument).then(() => {
    //   dispatch(getListsAsync());
    // });
  };
}
