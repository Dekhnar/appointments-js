const {
  createDuration,
  parseDuration,
  millisecondsPerFifteenMinutes,
} = require('./utils/duration');

const getFreePeriod = (
  periods = parseDuration(),
  {
    minimumDuration = millisecondsPerFifteenMinutes,
    workTimePeriod = [createDuration({ hours: 8 }), createDuration({ hours: 17, minutes: 59 })],
  } = {},
) => {
  const size = periods.length;
  if (!size) return;
  const freePeriods = [];

  const startDuration = workTimePeriod[0].add({ days: 1 }).min({ minutes: 1 });
  periods.splice(0, 0, [startDuration, startDuration]);

  // Sort the given appointments according to starting duration
  periods.sort((a, b) => a[0].duration - b[0].duration);

  let i = 1;
  while (i < periods.length) {
    const prevEndDuration = periods[i - 1][1].add({ minutes: 1 });
    const currStartDuration = periods[i][0];

    // If ending duration is less than current starting duration,
    // then it is the ealiest free period
    if (prevEndDuration.duration < currStartDuration.duration) {
      const tempFreePeriod = [prevEndDuration, currStartDuration];

      const tempWorkTimePeriod = [
        workTimePeriod[0].add({ days: prevEndDuration.inDays() }),
        workTimePeriod[1].add({ days: prevEndDuration.inDays() }),
      ];

      if (tempFreePeriod[0].duration < tempWorkTimePeriod[0].duration) {
        tempFreePeriod[0] = tempWorkTimePeriod[0];
      }

      if (tempFreePeriod[1].duration > tempWorkTimePeriod[1].duration) {
        tempFreePeriod[1] = tempWorkTimePeriod[1];
      }

      const duration = tempFreePeriod[1].duration - tempFreePeriod[0].duration;
      if (duration >= minimumDuration) {
        tempFreePeriod[1] = tempFreePeriod[0].add({ milliseconds: minimumDuration });
        freePeriods.push(
          `${tempFreePeriod[0].toString()}-${tempFreePeriod[1]
            .toString()
            .split(' ')
            .slice(1)
            .join()}`,
        );
      }
    }

    if (periods[i - 1][1].duration > periods[i][1].duration) {
      periods[i][1] = periods[i - 1][1];
    }

    // If we change day, we add day work start
    if (i + 1 < periods.length) {
      const nextDays = periods[i + 1][0].inDays();
      const isNewDay = currStartDuration.inDays() !== nextDays;
      if (isNewDay) {
        const startDuration = workTimePeriod[0].add({ days: nextDays }).min({ minutes: 1 });
        periods.splice(i + 1, 0, [startDuration, startDuration]);
      }
    }

    i++;
  }

  return freePeriods;
};

module.exports = getFreePeriod;
