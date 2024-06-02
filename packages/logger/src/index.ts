export const logAPI = (...args: unknown[]): void => {
  // eslint-disable-next-line no-console -- logger
  console.log("🖤 LOGGER API: ", ...args);
};

export const logClient = (...args: unknown[]): void => {
  // eslint-disable-next-line no-console -- logger
  console.log("🤍 LOGGER CLIENT: ", ...args);
};
