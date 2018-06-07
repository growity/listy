import { GET_SITES } from '../constants';
import DB from '../db/db';

export const siteList = sites => ({
  type: GET_SITES,
  sites,
});

export function siteListAsync() {
  return (dispatch) => {
    DB.site.toArray().then((sites) => {
      dispatch(siteList(sites));
    });
  };
}

export function addSiteAsync(site) {
  return (dispatch) => {
    DB.site.add(site).then(() => {
      dispatch(siteListAsync());
    });
  };
}
