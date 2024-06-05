import { logAPI, logClient } from "..";

jest.spyOn(global.console, "log");

describe("@repo/logger", () => {
  it("prints a message for API app", () => {
    logAPI("hello");
    // eslint-disable-next-line no-console -- testing console
    expect(console.log).toBeCalledWith("🖤 LOGGER API: ", "hello");
  });

  it("prints a message for client app", () => {
    logClient("world");
    // eslint-disable-next-line no-console -- testing console
    expect(console.log).toBeCalledWith("🤍 LOGGER CLIENT: ", "world");
  });
});
