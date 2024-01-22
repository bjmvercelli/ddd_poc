export type NotificationError = {
  message: string;
  context: string;
};

export class Notification {
  private errors: NotificationError[] = [];

  public addError(error: NotificationError): void {
    this.errors.push(error);
  }

  public messages(context?: string): string {
    if (!context) {
      return this.errors
        .map((error) => `${error.context}: ${error.message}`)
        .join(", ");
    }

    const messages = this.errors
      .filter((error) => error.context === context)
      .map((error) => `${error.context}: ${error.message}`);

    return messages.join(", ");
  }
}
