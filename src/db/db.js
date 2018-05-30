import Dexie from 'dexie';

const db = new Dexie('ListyDB');
db.version(1).stores({
  project: '++id,title,description',
  site: '++id,title,description,image,url',
  issue: '++id,title,done',
  lists: '++id,title,symbol,*items',
});

export default db;
