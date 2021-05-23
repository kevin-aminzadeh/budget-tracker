// Check if Client Browser Supports IndexedDB
export function checkForIndexedDb() {
  if (!window.indexedDB) {
    console.log("Your browser doesn't support a stable version of IndexedDB.");
    return false;
  }
  return true;
}

export function useIndexedDb(databaseName, storeName, method, object) {
  return new Promise((resolve, reject) => {
    const request = window.indexedDB.open(databaseName, 1);
    let db, tx, store;

    request.onupgradeneeded = function (e) {
      const db = request.result;
      db.createObjectStore(storeName, { keyPath: "_id", autoIncrement: true });
    };

    request.onerror = function (e) {
      console.log("There was an error");
    };

    request.onsuccess = function (e) {
      db = request.result;
      tx = db.transaction(storeName, "readwrite");
      store = tx.objectStore(storeName);

      db.onerror = function (e) {
        console.log("error");
      };

      switch (method) {
        case "post":
          store.add(object);
          break;
        case "put":
          store.put(object);
          break;
        case "delete":
          store.delete(object._id);
          break;
        case "deleteAll":
          store.clear();
          break;
        default:
          const all = store.getAll();
          all.onsuccess = function () {
            resolve(all.result);
          };
          break;
      }

      tx.oncomplete = function () {
        db.close();
      };
    };
  });
}
