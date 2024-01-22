import { Notification } from "./notification";

describe("Notification unit test", () => {
  it("Should create errors", () => {
    const notification = new Notification();
    const error = {
      message: "Error message",
      context: "testContext",
    };
    notification.addError(error);

    expect(notification.messages("testContext")).toBe(
      "testContext: Error message"
    );

    const error2 = {
      message: "Error message 2",
      context: "testContext",
    };
    notification.addError(error2);

    expect(notification.messages("testContext")).toBe(
      "testContext: Error message, testContext: Error message 2"
    );

    const error3 = {
      message: "Error message 3",
      context: "otherContext",
    };
    notification.addError(error3);

    expect(notification.messages("testContext")).toBe(
      "testContext: Error message, testContext: Error message 2"
    );
    expect(notification.messages("otherContext")).toBe(
      "otherContext: Error message 3"
    );

    expect(notification.messages()).toBe(
      "testContext: Error message, testContext: Error message 2, otherContext: Error message 3"
    );
  });
});
