/**
 *
 * @param min default is 0
 * @param max could be an `array` or a `number`
 * @returns number
 */
export function getRandomNumber(min = 0, max: number | unknown[]) {
  const maxNumber = Array.isArray(max) ? max.length - 1 : max;

  if (min > maxNumber) {
    throw new Error('Min must be less than or equal to Max');
  }
  return Math.floor(Math.random() * (maxNumber - min + 1)) + min;
}
