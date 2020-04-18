let transactionsArray = [];
let chart;

fetch("/api/transaction")
  .then(response => response.json())
  .then(data => {

    transactionsArray = data;
    populateTotal();
    populateTable();
    populateChart();
  });

function populateTotal() {
  const total = transactionsArray.reduce((total, t) => {
    return total + parseInt(t.value);
  }, 0);

  const htmlElement = document.querySelector("#total");
  htmlElement.textContent = total;
}

function populateTable() {
  const tbody = document.querySelector("#tbody");
  tbody.innerHTML = "";

  transactionsArray.forEach(transaction => {
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
  // get transactions, and reverse it
  const reversed = transactionsArray.slice().reverse();
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

  // check if the chart exists, and if it does delete before creating a new one
  if (chart) {
    chart.destroy();
  }

  const chartElement = document.getElementById("my-chart").getContext("2d");

  chart = new Chart(chartElement, {
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
    date: new Date().toISOString()
  };

  // if subtracting funds, convert amount to negative number
  if (!isAddition) {
    transaction.value *= -1;
  }

  // adds an entry in the first position of the array of transactions
  transactionsArray.unshift(transaction);

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
      "Content-Type": "application/json"
    }
  })
    .then(response => response.json())
    .then(data => {
      if (data.errors) {
        htmlError.textContent = "Missing Information";
      } else {
        // clear form
        htmlName.value = "";
        htmlAmount.value = "";
      }
    })
    .catch(err => {
      // fetch failed, so save in indexed db
      saveRecord(transaction);

      // clear form
      htmlName.value = "";
      htmlAmount.value = "";
    });
}

document.querySelector("#add-btn").addEventListener("click", function (event) {
  event.preventDefault();
  sendTransaction(true);
});

document.querySelector("#sub-btn").addEventListener("click", function (event) {
  event.preventDefault();
  sendTransaction(false);
});

document.querySelector("#del-btn").addEventListener("click", function (event) {
  event.preventDefault();
  deletePending();
});
