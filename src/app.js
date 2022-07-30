"use strict";

const path = require("path");
const AutoLoad = require("@fastify/autoload");
const { default: fastifyEnv } = require("@fastify/env");

module.exports = async function (fastify, opts) {
  fastify.register(fastifyEnv, {
    schema: {
      type: "object",
      required: ["MAILER_EMAIL", "MAILER_PASSWORD"],
      properties: {
        MAILER_EMAIL: {
          type: "string",
        },
        MAILER_PASSWORD: {
          type: "string",
        },
      },
    },
  });

  // This loads all plugins defined in plugins
  // those should be support plugins that are reused
  // through your application
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, "plugins"),
    options: Object.assign({}, opts),
  });

  // This loads all plugins defined in routes
  // define your routes in one of these
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, "routes"),
    options: Object.assign({}, opts),
  });
};
