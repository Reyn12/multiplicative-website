function generateTables() {
  const Z0 = parseInt(document.getElementById("Z0").value);
  const a = parseInt(document.getElementById("a").value);
  const m = parseInt(document.getElementById("m").value);

  if (isNaN(Z0) || isNaN(a) || isNaN(m)) {
    alert("Please enter valid numbers for Z0, a, and m.");
    return;
  }

  let Z = Z0;
  let results = [];
  let repeatData = [];
  let xiValues = new Set();

  for (let i = 1; i <= 300; i++) {
    const aZ = a * Z;
    const Zi = aZ % m;
    const Ui = (Zi / m).toFixed(4); // Format Ui to 4 decimal places
    const Xi = Math.pow((3 * Ui) / 4, 1 / 3).toFixed(6); // Format Xi to 6 decimal places

    results.push({ i, Z, a, m, aZ, Zi, Ui, Xi });

    if (xiValues.has(Xi)) {
      repeatData.push({ i, Z, a, m, aZ, Zi, Ui, Xi });
    } else {
      xiValues.add(Xi);
    }

    Z = Zi;
  }

  updateTable("randomTable", results.slice(0, 5));
  if (results.length > 5) {
    addScroll("randomTable", results.slice(5));
  }

  const repeatCount = repeatData.length;
  document.getElementById("repeatCount").innerText = `${repeatCount} data`;

  updateTable("repeatTable", repeatData.slice(0, 5));
  if (repeatData.length > 5) {
    addScroll("repeatTable", repeatData.slice(5));
  }
}

function updateTable(tableId, data) {
  const tableBody = document.querySelector(`#${tableId} tbody`);
  tableBody.innerHTML = "";

  data.forEach((row) => {
    const tr = document.createElement("tr");
    Object.values(row).forEach((value) => {
      const td = document.createElement("td");
      td.textContent = value;
      tr.appendChild(td);
    });
    tableBody.appendChild(tr);
  });
}

function addScroll(tableId, additionalRows) {
  const table = document.getElementById(tableId);
  const tableBody = table.querySelector("tbody");
  const scrollDiv = document.createElement("div");
  scrollDiv.classList.add("table-scroll");
  table.parentNode.insertBefore(scrollDiv, table);
  scrollDiv.appendChild(table);

  additionalRows.forEach((row) => {
    const tr = document.createElement("tr");
    Object.values(row).forEach((value) => {
      const td = document.createElement("td");
      td.textContent = value;
      tr.appendChild(td);
    });
    tableBody.appendChild(tr);
  });
}
