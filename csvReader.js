const csv = require('csvtojson');

class CSVReader {
  async convertToJsonArray(pathToFile) {
    const json = await csv().fromFile(pathToFile);
    return json;
  }
}

module.exports = CSVReader;
