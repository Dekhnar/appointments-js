const remainder = require('./num');

const millisecondsPerSecond = 1000;
const secondsPerMinute = 60;
const minutesPerHour = 60;
const hoursPerDay = 24;

const getSecondsAsMilliseconds = (s = 0) => s * millisecondsPerSecond;
const getMinutesAsMilliseconds = (mins = 0) => getSecondsAsMilliseconds(mins * secondsPerMinute);
const getHoursAsMilliseconds = (hours = 0) => getMinutesAsMilliseconds(hours * minutesPerHour);
const getDaysAsMilliseconds = (days = 0) => getHoursAsMilliseconds(days * hoursPerDay);

const millisecondsPerHour = getHoursAsMilliseconds(1);
const millisecondsPerDay = getDaysAsMilliseconds(1);
const millisecondsPerMinute = getMinutesAsMilliseconds(1);
const millisecondsPerFifteenMinutes = getMinutesAsMilliseconds(59);

/**
 * A span of time, such as 27 days, 4 hours, and 12 minutes.
 */
const createDuration = ({ days = 0, hours = 0, minutes = 0, milliseconds = 0 } = {}) => {
  return {
    duration:
      getDaysAsMilliseconds(days) +
      getHoursAsMilliseconds(hours) +
      getMinutesAsMilliseconds(minutes) +
      milliseconds,
    inHours() {
      return parseInt(Math.trunc(this.duration / millisecondsPerHour));
    },
    inDays() {
      return parseInt(Math.trunc(this.duration / millisecondsPerDay));
    },
    inMinutes() {
      return parseInt(Math.trunc(this.duration / millisecondsPerMinute));
    },
    add({ days = 0, hours = 0, minutes = 0, milliseconds = 0 } = {}) {
      const { duration } = createDuration({ days, hours, minutes, milliseconds });
      return createDuration({ milliseconds: this.duration + duration });
    },
    min({ days = 0, hours = 0, minutes = 0, milliseconds = 0 } = {}) {
      const { duration } = createDuration({ days, hours, minutes, milliseconds });
      return createDuration({ milliseconds: this.duration - duration });
    },
    toString() {
      const twoDigits = (n = 1) => {
        return String(n).padStart(2, '0');
      };
      const hours = remainder(this.inHours(), hoursPerDay);
      const minutes = remainder(this.inMinutes(), minutesPerHour);
      return `${this.inDays()} ${twoDigits(hours)}:${twoDigits(minutes)}`;
    },
  };
};

const parseDuration = (str = '1 08:45-12:59') => {
  let arr = str.split(' ');
  const days = parseInt(str[0]);

  arr = arr[1].split('-');
  const startTime = arr[0].split(':');
  const endTime = arr[1].split(':');

  return [
    createDuration({ days, hours: startTime[0], minutes: startTime[1] }),
    createDuration({ days, hours: endTime[0], minutes: endTime[1] }),
  ];
};

module.exports = {
  createDuration,
  parseDuration,
  millisecondsPerFifteenMinutes,
};
