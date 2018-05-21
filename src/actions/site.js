
export const siteList = () => ({
  type: 'GET_SITES',
});

function addSiteObject(siteObject) {
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
      db.close();
    };
  };
}

export function addSite(siteObject) {
  addSiteObject(siteObject); // Can not get data from here to return data
  return {
    type: 'ADD_SITE',
    site: siteObject,
  };
}
