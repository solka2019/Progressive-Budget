let db;
const request = indexedDB.open("budget", 1);

request.onupgradeneeded = function (event) {
  const db = event.target.result;
  db.createObjectStore("pending", { autoIncrement: true });
};

request.onsuccess = function (event) {
  db = event.target.result;

  // check if app is online before reading from db
  if (navigator.onLine) {
    checkDatabase();
  }
};

request.onerror = function (event) {
  console.log("Woops! " + event.target.errorCode);
};

function saveRecord(record) {
  const transaction = db.transaction(["pending"], "readwrite");
  const store = transaction.objectStore("pending");

  store.add(record);
}

function checkDatabase() {
  const transaction = db.transaction(["pending"], "readwrite");
  const store = transaction.objectStore("pending");
  const getAll = store.getAll();

  getAll.onsuccess = function () {
    if (getAll.result.length > 0) {
<<<<<<< HEAD
      fetch("/API/transaction/bulk", {
=======
      fetch("/api/transaction/bulk", {
>>>>>>> 15414d7b81e651cf0d72fa7460783e6c936d51b7
        method: "POST",
        body: JSON.stringify(getAll.result),
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json"
        }
      })
        .then(response => response.json())
        .then(() => {
<<<<<<< HEAD
=======
          // delete records if successful
>>>>>>> 15414d7b81e651cf0d72fa7460783e6c936d51b7
          const transaction = db.transaction(["pending"], "readwrite");
          const store = transaction.objectStore("pending");
          store.clear();
        });
    }
  };
}
<<<<<<< HEAD
// function deletePending() {
//   const transaction = db.transaction(["pending"], "readwrite");
//   const store = transaction.objectStore("pending");
//   store.clear();
// }
=======

>>>>>>> 15414d7b81e651cf0d72fa7460783e6c936d51b7

// listen for app coming back online
window.addEventListener("online", checkDatabase);
