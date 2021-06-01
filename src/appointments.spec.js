const getAllFiles = require('./utils/get-all-files');
const getFreePeriods = require('./appointments');
const loadDataFile = require('./utils/load-data-file');
const { PROJECT_ROOT_DATA } = require('./constants');
const { parseDuration } = require('./utils/duration');
const getFileId = (filePath = 'input1.txt') => filePath.match(/([0-9])\.(.*)$/im)[1];

const filePaths = getAllFiles(PROJECT_ROOT_DATA);

const inputFilePaths = filePaths
  .filter((f) => f.includes('input'))
  .reduce((acc, f) => {
    const fileId = getFileId(f);
    acc[fileId] = f;
    return acc;
  }, {});

const outputFilePaths = filePaths
  .filter((f) => f.includes('output'))
  .reduce((acc, f) => {
    const fileId = getFileId(f);
    acc[fileId] = f;
    return acc;
  }, {});

describe('Given appointments, find all free periods', () => {
  const transformAsDuration = (periodStrs) =>
    periodStrs.reduce((acc, str) => {
      acc.push(parseDuration(str));
      return acc;
    }, []);

  Object.entries(inputFilePaths).forEach(([fileId, filePath]) => {
    it(`verify free period for input${fileId}.txt`, async () => {
      const periods = transformAsDuration(await loadDataFile(filePath));
      const expectedOutput = await loadDataFile(outputFilePaths[fileId]);
      const freePeriods = getFreePeriods(periods);
      await expect(freePeriods).toEqual(expect.arrayContaining(expectedOutput));
    });
  });
});
