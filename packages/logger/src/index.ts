// get current time which have hours, minutes, and seconds only
const getCurrentTime = (): string => {
  const date = new Date();
  return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
};

export const logAPI = (...args: unknown[]): void => {
  // eslint-disable-next-line no-console -- logger
  console.log(`${getCurrentTime()} - 🖤 LOGGER API: `, ...args);
};

export const logClient = (...args: unknown[]): void => {
  // eslint-disable-next-line no-console -- logger
  console.log(`${getCurrentTime()} - 🤍 LOGGER CLIENT: `, ...args);
};
