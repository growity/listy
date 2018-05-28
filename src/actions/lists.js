import DB from '../db/db';

export const getLists = data => ({
  type: 'GET_LISTS',
  lists: data,
});

export function getListsAsync() {
  return (dispatch) => {
    DB.lists.toArray().then((lists) => {
      dispatch(getLists(lists));
    });
  };
}

export function addListAsync(listArgument) {
  return (dispatch) => {
    DB.lists.add(listArgument).then(() => {
      dispatch(getListsAsync());
    });
  };
}
