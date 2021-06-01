const { readdirSync, statSync, existsSync } = require('fs');
const { join } = require('path');

const getAllFiles = (dirPath = '', filesArr = []) => {
  const files = readdirSync(dirPath);
  files.forEach((file) => {
    const path = join(dirPath, file);
    if (!existsSync(path)) return;
    if (statSync(path).isDirectory()) {
      filesArr = filesArr.concat(getAllFiles(path, filesArr));
    } else {
      filesArr.push(path);
    }
  });
  return filesArr;
};

module.exports = getAllFiles;
