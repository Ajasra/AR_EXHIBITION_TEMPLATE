//function to get distance between two vectors
export function getDistance(v1, v2) {
  return Math.sqrt(
    Math.pow(v1.x - v2.x, 2) +
      Math.pow(v1.y - v2.y, 2) +
      Math.pow(v1.z - v2.z, 2)
  );
}

//map one range to another with limit to the desired range
export function mapRange(value, low1, high1, low2, high2) {
  return Math.max(
    Math.min(low2 + ((high2 - low2) * (value - low1)) / (high1 - low1), high2),
    low2
  );
}

//map one range to another without limit to the desired range
export function mapRangeUnlimited(value, low1, high1, low2, high2) {
  return low2 + ((high2 - low2) * (value - low1)) / (high1 - low1);
}

// generate random int in range
export function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

//generate random float in range
export function randomFloatFromInterval(min, max) {
  return Math.random() * (max - min) + min;
}

export function timeout(delay) {
  return new Promise((res) => setTimeout(res, delay));
}
