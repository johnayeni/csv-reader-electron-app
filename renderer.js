// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
const CSVReader = require('./csvReader');

// QUERY SELECTORS
const form = document.querySelector('#upload-form');
const outputTable = document.querySelector('#output-table');

// FUNCTION DECLARATIONS
function displayResult(result) {
  if (result.length > 0) {
    const tableHeader = `
      <thead>
        <tr>
          <td>${Object.keys(result[1]).join('</td><td>')}</td>
        </tr>
      </thead>
    `;

    let tableBody = '';

    result.forEach((row) => {
      tableBody += `
        <tr>
          <td>
            ${Object.values(row)
              .join('</td><td>')
              .replace(/[^\x20-\x7E]/g, '')} 
          </td>
        </tr>`;
    });
    outputTable.innerHTML = `${tableHeader} \n <tbody>${tableBody}</tbody>`;
  }
}

// EVENT LISTENERS
form.onsubmit = async (event) => {
  event.preventDefault();
  const csvReader = new CSVReader();
  const pathToFile = form.csvfile.files[0].path;
  const JSONArray = await csvReader.convertToJsonArray(pathToFile);
  displayResult(JSONArray);
};
