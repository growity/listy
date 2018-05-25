import { GET_SITES } from '../constants';
import { getDb, setDb } from '../indexedDB/index';

export const siteList = data => ({
  type: GET_SITES,
  site: data,
});

export const siteListAsync = () => getDb();

export const addSiteAsync = siteObject => setDb(siteObject);
