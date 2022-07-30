"use strict";

module.exports = async function (fastify, opts) {
  fastify.get("/rate", async function (request, reply) {
    const baseCarency = "bitcoin";
    const vsCarency = "uah";
    const rate = await fastify.domain.cryptocarency.getRate(
      baseCarency,
      vsCarency
    );
    return rate;
  });
};
