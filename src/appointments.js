const {
  createDuration,
  parseDuration,
  millisecondsPerFifteenMinutes,
} = require('./utils/duration');

const sortPeriodsByStartingDuration = (periods = parseDuration()) => {
  const sortedPeriods = [...periods];
  sortedPeriods.sort((a, b) => a[0].duration - b[0].duration);
  return sortedPeriods;
};

const insertPeriodAt = (periods = [parseDuration()], index = 0, period = parseDuration()) => {
  const newPeriods = [...periods];
  newPeriods.splice(index, 0, period);
  return newPeriods;
};

const completeWithStartingWorkingDurationAt = (
  periods = [parseDuration()],
  index,
  startingWorkingDuration = createDuration({ hours: 8 }),
) => {
  return insertPeriodAt(periods, index, [startingWorkingDuration, startingWorkingDuration]);
};

const getFreePeriods = (
  periods = [parseDuration()],
  {
    minimumDuration = millisecondsPerFifteenMinutes,
    workTimePeriod = [createDuration({ hours: 8 }), createDuration({ hours: 17, minutes: 59 })],
  } = {},
) => {
  const size = periods.length;
  if (!size) return;
  const freePeriods = [];

  const startingWorkingDuration = workTimePeriod[0].add({ days: 1 }).min({ minutes: 1 });
  periods = completeWithStartingWorkingDurationAt(periods, 0, startingWorkingDuration);

  periods = sortPeriodsByStartingDuration(periods);

  let i = 1;
  while (i < periods.length) {
    const prevEndDuration = periods[i - 1][1].add({ minutes: 1 });
    const currStartDuration = periods[i][0];

    // If ending duration is less than current starting duration,
    // then we check if the period is
    // during working hours, without exceeding
    // of an exact duration of 60 minutes, beginning and end included
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

    // If current ending duration is less than previous ending duration
    // then we update current ending duration with the previous ending duration
    if (periods[i - 1][1].duration > periods[i][1].duration) {
      periods[i][1] = periods[i - 1][1];
    }

    if (i + 1 < periods.length) {
      const nextDays = periods[i + 1][0].inDays();
      const isNewDay = currStartDuration.inDays() !== nextDays;
      if (isNewDay) {
        const startingWorkingDuration = workTimePeriod[0]
          .add({ days: nextDays })
          .min({ minutes: 1 });
        periods = completeWithStartingWorkingDurationAt(periods, i + 1, startingWorkingDuration);
      }
    }

    i++;
  }

  return freePeriods;
};

module.exports = getFreePeriods;
