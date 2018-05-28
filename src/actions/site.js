import { GET_SITES } from '../constants';
import DB from '../db/db';

export const siteList = data => ({
  type: GET_SITES,
  site: data,
});

export function siteListAsync() {
  return (dispatch) => {
    DB.site.toArray().then((projects) => {
      dispatch(siteList(projects));
    });
  };
}

export function addSiteAsync(siteObject) {
  return (dispatch) => {
    DB.site.add(siteObject).then(() => {
      dispatch(siteListAsync());
    });
  };
}
