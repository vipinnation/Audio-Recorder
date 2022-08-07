const indexed_db = async (audioClip) => {
  await createStore();
  createDatabase(); 
  await saveData(audioClip);
};

const createDatabase = () => {
  let request = indexedDB.open("audio-manager", 1);
  let db;
  request.onupgradeneeded = function () {};

  request.onerror = (error) => console.error("Error", error);

  request.onsuccess = (event) => (db = event.target.result);
};

const createStore = async () => {
  let request = await indexedDB.open("audio-manager", 1);
  let db;
  request.onupgradeneeded = async function (event) {
    db = event.target.result;
    let store = await db.createObjectStore("audio", { keyPath: "name" }); // create it
    await store.createIndex("name", "name", { unique: true });
    await store.createIndex("mimeType", "mimeType");
    await store.createIndex("msDuration", "msDuration"); // create
    await store.createIndex("recordDataBase64", "recordDataBase64");
  };

  request.onerror = (error) => console.error("Error", error);

  request.onsuccess = (event) => (db = event.target.result);
};

const saveData = async (audioClip) => {
  let request = indexedDB.open("audio-manager", 1);
  let db;
  request.onsuccess = async (event) => {
    db = event.target.result;
    let transaction = await db.transaction("audio", "readwrite");
    let audio = transaction.objectStore("audio");
    await audio.add(audioClip);
    console.log("Data added");
  };

  request.onerror = async (error) => {
    console.log(error);
  };
};

export const loadFilesFromDatabase = async (setSavedAudio) => {
  let request = indexedDB.open("audio-manager", 1);
  let db;
  let data;
  request.onsuccess = async (event) => {
    db = event.target.result; 
    let transaction = await db.transaction("audio", "readwrite");
    let audio = await transaction.objectStore("audio");
    let audioFiles = await audio.getAll(); 
    console.log("Data", await audioFiles);
  };

  request.onerror = async (error) => {
    console.log("Load Files",error);
  };

  return data;
}; 
export default indexed_db;
