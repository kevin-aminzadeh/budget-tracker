import { useIndexedDb, checkForIndexedDb } from "./indexedDb";

let transactions = [];
let myChart;

fetch("/api/transaction")
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    transactions = data;
    populateTotal();
    populateTable();
    populateChart();
  });

function saveRecord(transaction) {
  useIndexedDb("transactions", "TransactionStore", "post", transaction).then(
    (results) => {
      transactions = results;
      populateTotal();
      populateTable();
      populateChart();
    }
  );
}

function populateTotal() {
  // reduce transaction amounts to a single total value
  let total = transactions.reduce((total, t) => {
    return total + parseInt(t.value);
  }, 0);

  let totalEl = document.querySelector("#total");
  totalEl.textContent = total;
}

function populateTable() {
  let tbody = document.querySelector("#tbody");
  tbody.innerHTML = "";

  transactions.forEach((transaction) => {
    // create and populate a table row
    let tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${transaction.name}</td>
      <td>${transaction.value}</td>
    `;

    tbody.appendChild(tr);
  });
}

function populateChart() {
  // copy array and reverse it
  let reversed = transactions.slice().reverse();
  let sum = 0;

  // create date labels for chart
  let labels = reversed.map((t) => {
    let date = new Date(t.date);
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
  });

  // create incremental values for chart
  let data = reversed.map((t) => {
    sum += parseInt(t.value);
    return sum;
  });

  // remove old chart if it exists
  if (myChart) {
    myChart.destroy();
  }

  let ctx = document.getElementById("myChart").getContext("2d");

  myChart = new Chart(ctx, {
    type: "line",
    data: {
      labels,
      datasets: [
        {
          label: "Total Over Time",
          fill: true,
          backgroundColor: "#6666ff",
          data,
        },
      ],
    },
  });
}

function sendTransaction(isAdding) {
  let nameEl = document.querySelector("#t-name");
  let amountEl = document.querySelector("#t-amount");
  let errorEl = document.querySelector(".form .error");

  // validate form
  if (nameEl.value === "" || amountEl.value === "") {
    errorEl.textContent = "Missing Information";
    return;
  } else {
    errorEl.textContent = "";
  }

  // create record
  let transaction = {
    name: nameEl.value,
    value: amountEl.value,
    date: new Date().toISOString(),
  };

  // if subtracting funds, convert amount to negative number
  if (!isAdding) {
    transaction.value *= -1;
  }

  // add to beginning of current array of data
  transactions.unshift(transaction);

  // re-run logic to populate ui with new record
  populateChart();
  populateTable();
  populateTotal();

  // also send to server
  fetch("/api/transaction", {
    method: "POST",
    body: JSON.stringify(transaction),
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      if (data.errors) {
        errorEl.textContent = "Missing Information";
      } else {
        // clear form
        nameEl.value = "";
        amountEl.value = "";
      }
    })
    .catch((err) => {
      // fetch failed, so save in indexed db
      saveRecord(transaction);

      // clear form
      nameEl.value = "";
      amountEl.value = "";
    });
}

// Sync Data Between IndexedDB and API
function syncData() {
  // Get All Data from indexedDB
  useIndexedDb("transactions", "TransactionStore", "get").then((results) => {
    // If Local Data exists,
    if (results.length) {
      // Fetch DB Data
      fetch("/api/transaction")
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          // Find Transactions that need to be synced
          const offlineTransactions = results.filter((localTransaction) => {
            return !data.some((item) => item._id === localTransaction._id);
          });

          const offlineTransactionData = offlineTransactions.map((item) => {
            return { name: item.name, value: item.value, date: item.date };
          });

          // POST Offline Transactions To API
          fetch("/api/transaction/bulk", {
            method: "POST",
            body: JSON.stringify(offlineTransactionData),
            headers: {
              Accept: "application/json, text/plain, */*",
              "Content-Type": "application/json",
            },
          })
            .then((response) => {
              return response.json();
            })
            .then(() => {
              // Fetch updated transactions list from API
              fetch("/api/transaction")
                .then((response) => {
                  return response.json();
                })
                .then((newData) => {
                  // Clear Stale Data From IndexedDB
                  useIndexedDb("transactions", "TransactionStore", "deleteAll");

                  // Push New Data To IndexedDB
                  newData.forEach((item) =>
                    useIndexedDb(
                      "transactions",
                      "TransactionStore",
                      "post",
                      item
                    )
                  );

                  return newData;
                })
                .then((newData) => {
                  transactions = newData;
                  populateTotal();
                  populateTable();
                  populateChart();
                });
            })
            .catch((err) => {
              console.log("ERROR!");
              throw err;
            });
        });
    }
  });
}

// Sync Local Stored Data With DB Once User is Online Again
window.addEventListener("online", syncData);

document.querySelector("#add-btn").onclick = function () {
  sendTransaction(true);
};

document.querySelector("#sub-btn").onclick = function () {
  sendTransaction(false);
};
