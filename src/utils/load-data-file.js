const { readFile } = require('fs');
const { promisify } = require('util');

const readFileAsync = promisify(readFile);

module.exports = async (filePath) => {
  let data;
  try {
    data = await readFileAsync(filePath, 'utf8');
    data = data.split('\n');
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('File not found: ' + filePath);
  }
  return data;
};
