const getFreePeriods = require('./appointments');
const getAllFiles = require('./utils/get-all-files');
const loadDataFile = require('./utils/load-data-file');
const { parseDuration } = require('./utils/duration');
const { PROJECT_ROOT_DATA } = require('./constants');
const filePaths = getAllFiles(PROJECT_ROOT_DATA);

const getFileId = (filePath = 'input1.txt') => filePath.match(/([0-9])\.(.*)$/im)[1];

const inputFilePaths = filePaths
  .filter((f) => f.includes('input'))
  .reduce((acc, f) => {
    const fileId = getFileId(f);
    acc[fileId] = f;
    return acc;
  }, {});

(async () => {
  const transformAsDuration = (periodStrs) =>
    periodStrs.reduce((acc, str) => {
      acc.push(parseDuration(str));
      return acc;
    }, []);

  await Object.entries(inputFilePaths).reduce(async (previousPromise, [_, filePath]) => {
    await previousPromise;
    try {
      const periods = transformAsDuration(await loadDataFile(filePath));
      const freePeriod = getFreePeriods(periods);
      console.log(freePeriod);
    } catch (_) {}
  }, Promise.resolve);
})();
