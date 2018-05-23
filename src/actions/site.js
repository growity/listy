import { GET_SITES } from '../constants';

export const siteList = data => ({
  type: GET_SITES,
  site: data,
});

export const siteListAsync = () => {
  return (dispatch) => {
    return new Promise(() => {
      const indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB
        || window.msIndexedDB || window.shimIndexedDB;

      // Open (or create) the database
      const open = indexedDB.open('SiteListDB', 1);

      // Create the schema
      open.onupgradeneeded = () => {
        const db = open.result;
        const store = db.createObjectStore('MyObjectStore', { keyPath: 'id', autoIncrement: true });
        store.createIndex('NameIndex', ['site.title', 'site.description']);
      };

      open.onsuccess = () => {
        // Start a new transaction
        const db = open.result;
        const trans = db.transaction('MyObjectStore', 'readwrite');
        const store = trans.objectStore('MyObjectStore');
        const index = store.index('NameIndex');
        const allData = index.getAll();

        // Close the db when the transaction is done
        trans.oncomplete = () => {
          dispatch(siteList(allData.result));
          db.close();
        };
      };
    });
  };
};

// Asynс = returns function
// Sync = returns object
export function addSiteAsync(siteObject) {
  return (dispatch) => {
    return new Promise(() => {
      const indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB
        || window.msIndexedDB || window.shimIndexedDB;

      // Open (or create) the database
      const open = indexedDB.open('SiteListDB', 1);

      // Create the schema
      open.onupgradeneeded = () => {
        const db = open.result;
        const store = db.createObjectStore('MyObjectStore', { keyPath: 'id', autoIncrement: true });
        store.createIndex('NameIndex', ['site.title', 'site.description']);
      };

      open.onsuccess = () => {
        // Start a new transaction
        const db = open.result;
        const trans = db.transaction('MyObjectStore', 'readwrite');
        const store = trans.objectStore('MyObjectStore');

        // Add some data
        store.put({ site: siteObject });

        // Close the db when the transaction is done
        trans.oncomplete = () => {
          dispatch(siteListAsync());
          db.close();
        };
      };
    });
  };
}
