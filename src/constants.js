const { join } = require('path');

const PROJECT_ROOT = join(__dirname, '..');
const PROJECT_ROOT_DATA = join(PROJECT_ROOT, 'data');

module.exports = {
  PROJECT_ROOT,
  PROJECT_ROOT_DATA,
};
