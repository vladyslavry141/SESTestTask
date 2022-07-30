"use strict";

const { default: fp } = require("fastify-plugin");
const Cryptocarency = require("../domain/Cryptocarency");
const Notification = require("../domain/Notification");
const Subscription = require("../domain/Subscription");
const path = require("path");

function fastifyDomain(fastify, options, done) {
  const relativeFilePath = "../static/subscriptions.txt";
  const filePath = path.normalize(path.join(__dirname, relativeFilePath));
  const encoding = "utf8";
  const { MAILER_EMAIL, MAILER_PASSWORD } = fastify.config;
  const subscription = new Subscription(filePath, encoding);
  const cryptocarency = new Cryptocarency();
  const notification = new Notification(cryptocarency, MAILER_EMAIL, {
    service: "gmail",
    auth: { user: MAILER_EMAIL, pass: MAILER_PASSWORD },
  });

  fastify.decorate("domain", { subscription, cryptocarency, notification });

  done();
}

module.exports = fp(fastifyDomain);
