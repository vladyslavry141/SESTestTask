"use strict";

const fs = require("fs/promises");

class Subscription {
  constructor(filePath, encoding = "utf8") {
    this.filePath = filePath;
    this.encoding = encoding;
  }

  async getAll() {
    if (!this.subscriptions) {
      const subscriptionsFileData = await fs.readFile(this.filePath, {
        encoding: this.encoding,
      });

      this.subscriptions = subscriptionsFileData
        .split("\n")
        .filter(Boolean)
        .map((subscriptionData) => {
          const [email, baseCarency, vsCarency] = subscriptionData.split(" ");
          return {
            email,
            baseCarency,
            vsCarency,
          };
        });
    }

    return this.subscriptions;
  }

  async add(email, baseCarency, vsCarency) {
    const subscriptions = await this.getAll();

    if (
      subscriptions.find(
        (subscription) =>
          subscription.email === email &&
          subscription.baseCarency === baseCarency &&
          subscription.vsCarency === vsCarency
      )
    ) {
      throw new Error("DUPLICATE_EMAIL");
    }

    await fs.appendFile(
      this.filePath,
      `\n${email} ${baseCarency} ${vsCarency}`,
      {
        encoding: this.encoding,
      }
    );
    this.subscriptions.push({ email, baseCarency, vsCarency });

    return;
  }
}

module.exports = Subscription;
