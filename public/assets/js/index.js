<<<<<<< HEAD
let transactions = [];
let myChart;

fetch("/API/transaction")
  .then(response => response.json())
  .then(data => {
    // save db data on global variable
    transactions = data;
=======
let transactionsArray = [];
let chart;

fetch("/api/transaction")
  .then(response => response.json())
  .then(data => {

    transactionsArray = data;
>>>>>>> 15414d7b81e651cf0d72fa7460783e6c936d51b7
    populateTotal();
    populateTable();
    populateChart();
  });

function populateTotal() {
<<<<<<< HEAD
  // reduce transaction amounts to a single total value
  const total = transactions.reduce((total, t) => {
    return total + parseInt(t.value);
  }, 0);

  const totalEl = document.querySelector("#total");
  totalEl.textContent = total;
=======
  const total = transactionsArray.reduce((total, t) => {
    return total + parseInt(t.value);
  }, 0);

  const htmlElement = document.querySelector("#total");
  htmlElement.textContent = total;
>>>>>>> 15414d7b81e651cf0d72fa7460783e6c936d51b7
}

function populateTable() {
  const tbody = document.querySelector("#tbody");
  tbody.innerHTML = "";

<<<<<<< HEAD
  transactions.forEach(transaction => {
=======
  transactionsArray.forEach(transaction => {
>>>>>>> 15414d7b81e651cf0d72fa7460783e6c936d51b7
    // create and populate a table row
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${transaction.name}</td>
      <td>${transaction.value}</td>
    `;

    tbody.appendChild(tr);
  });
}

function populateChart() {
<<<<<<< HEAD
  // copy array and reverse it
  const reversed = transactions.slice().reverse();
=======
  // get transactions, and reverse it
  const reversed = transactionsArray.slice().reverse();
>>>>>>> 15414d7b81e651cf0d72fa7460783e6c936d51b7
  let sum = 0;

  // create date labels for chart
  const labels = reversed.map(t => {
    const date = new Date(t.date);
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
  });

  // create incremental values for chart
  const data = reversed.map(t => {
    sum += parseInt(t.value);
    return sum;
  });

<<<<<<< HEAD
  // remove old chart if it exists
  if (myChart) {
    myChart.destroy();
  }

  const ctx = document.getElementById("my-chart").getContext("2d");

  myChart = new Chart(ctx, {
=======
  // check if the chart exists, and if it does delete before creating a new one
  if (chart) {
    chart.destroy();
  }

  const chartElement = document.getElementById("my-chart").getContext("2d");

  chart = new Chart(chartElement, {
>>>>>>> 15414d7b81e651cf0d72fa7460783e6c936d51b7
    type: "line",
    data: {
      labels,
      datasets: [
        {
          label: "Total Over Time",
          fill: true,
          backgroundColor: "#6666ff",
          data
        }
      ]
    }
  });
}

<<<<<<< HEAD
function sendTransaction(isAdding) {
  const nameEl = document.querySelector("#t-name");
  const amountEl = document.querySelector("#t-amount");
  const errorEl = document.querySelector("form .error");

  // validate form
  if (nameEl.value === "" || amountEl.value === "") {
    errorEl.textContent = "Missing Information";
    return;
  } else {
    errorEl.textContent = "";
  }

  // create record
  const transaction = {
    name: nameEl.value,
    value: amountEl.value,
=======
function sendTransaction(isAddition) {
  const htmlName = document.querySelector("#t-name");
  const htmlAmount = document.querySelector("#t-amount");
  const htmlError = document.querySelector("form .error");

  // validate form
  if (htmlName.value === "" ) {
    htmlError.textContent = "Missing Name";
    return;  }
  else if (htmlAmount.value === "") {
    htmlError.textContent = "Missing Amount";
    return;
  } else {
    htmlError.textContent = "";
  }

  // create transaction
  const transaction = {
    name: htmlName.value,
    value: htmlAmount.value,
>>>>>>> 15414d7b81e651cf0d72fa7460783e6c936d51b7
    date: new Date().toISOString()
  };

  // if subtracting funds, convert amount to negative number
<<<<<<< HEAD
  if (!isAdding) {
    transaction.value *= -1;
  }

  // add to beginning of current array of data
  transactions.unshift(transaction);
=======
  if (!isAddition) {
    transaction.value *= -1;
  }

  // adds an entry in the first position of the array of transactions
  transactionsArray.unshift(transaction);
>>>>>>> 15414d7b81e651cf0d72fa7460783e6c936d51b7

  // re-run logic to populate ui with new record
  populateChart();
  populateTable();
  populateTotal();

  // also send to server
<<<<<<< HEAD
  fetch("/API/transaction", {
=======
  fetch("/api/transaction", {
>>>>>>> 15414d7b81e651cf0d72fa7460783e6c936d51b7
    method: "POST",
    body: JSON.stringify(transaction),
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json"
    }
  })
    .then(response => response.json())
    .then(data => {
      if (data.errors) {
<<<<<<< HEAD
        errorEl.textContent = "Missing Information";
      } else {
        // clear form
        nameEl.value = "";
        amountEl.value = "";
=======
        htmlError.textContent = "Missing Information";
      } else {
        // clear form
        htmlName.value = "";
        htmlAmount.value = "";
>>>>>>> 15414d7b81e651cf0d72fa7460783e6c936d51b7
      }
    })
    .catch(err => {
      // fetch failed, so save in indexed db
      saveRecord(transaction);

      // clear form
<<<<<<< HEAD
      nameEl.value = "";
      amountEl.value = "";
    });
}

document.querySelector("#add-btn").addEventListener("click", function(event) {
=======
      htmlName.value = "";
      htmlAmount.value = "";
    });
}

document.querySelector("#add-btn").addEventListener("click", function (event) {
>>>>>>> 15414d7b81e651cf0d72fa7460783e6c936d51b7
  event.preventDefault();
  sendTransaction(true);
});

<<<<<<< HEAD
document.querySelector("#sub-btn").addEventListener("click", function(event) {
  event.preventDefault();
  sendTransaction(false);
});
// // add del btn
// document.querySelector("#del-btn").addEventListener("click", function(event) {
//   event.preventDefault();
//   deletePending();
// });
=======
document.querySelector("#sub-btn").addEventListener("click", function (event) {
  event.preventDefault();
  sendTransaction(false);
});

document.querySelector("#del-btn").addEventListener("click", function (event) {
  event.preventDefault();
  deletePending();
});
>>>>>>> 15414d7b81e651cf0d72fa7460783e6c936d51b7
