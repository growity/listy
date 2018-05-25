import { projectList, projectListAsync } from '../actions/project';

export const setProject = (projectObject) => {
  return (dispatch) => {
    return new Promise(() => {
      const indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB
        || window.msIndexedDB || window.shimIndexedDB;

      // Open (or create) the database
      const open = indexedDB.open('ProjectListDB', 1);

      // Create the schema
      open.onupgradeneeded = () => {
        const db = open.result;
        const store = db.createObjectStore('ProjectStore', { keyPath: 'id', autoIncrement: true });
        store.createIndex('Project', ['project.description', 'project.title']);
      };

      open.onsuccess = () => {
        // Start a new transaction
        const db = open.result;
        const trans = db.transaction(['ProjectStore'], 'readwrite');
        const store = trans.objectStore('ProjectStore');

        // Add some data
        store.put({ project: projectObject });

        // Close the db when the transaction is done
        trans.oncomplete = () => {
          dispatch(projectListAsync());
          db.close();
        };
      };
    });
  };
};

export const getProjectsDb = () => {
  return (dispatch) => {
    return new Promise(() => {
      const indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB
        || window.msIndexedDB || window.shimIndexedDB;

      // Open (or create) the database
      const open = indexedDB.open('ProjectListDB', 1);

      // Create the schema
      open.onupgradeneeded = () => {
        const db = open.result;
        const store = db.createObjectStore('ProjectStore', { keyPath: 'id', autoIncrement: true });
        store.createIndex('Project', ['project.id', 'project.title']);
      };

      open.onsuccess = () => {
        // Start a new transaction
        const db = open.result;
        const trans = db.transaction('ProjectStore', 'readwrite');
        const store = trans.objectStore('ProjectStore');
        const index = store.index('Project');
        const allData = index.getAll();

        // Close the db when the transaction is done
        trans.oncomplete = () => {
          dispatch(projectList(allData.result));
          db.close();
        };
      };
    });
  };
};
