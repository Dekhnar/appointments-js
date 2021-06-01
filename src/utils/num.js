/**
 * Returns the remainder of the truncating division of `num` by [other].
 */
const remainder = (num = 1, other = 1) => {
  return num - Math.trunc(num / other) * other;
};

module.exports = remainder;
