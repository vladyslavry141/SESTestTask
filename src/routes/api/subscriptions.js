module.exports = async function (fastify, opts) {
  fastify.post("/sendEmails", async function (request, reply) {
    const subscriptions = await fastify.domain.subscription.getAll();
    await Promise.allSettled(
      subscriptions.map((subscription) =>
        fastify.domain.notification
          .send(subscription)
          .catch((error) => console.error(error))
      )
    );
  });

  fastify.post(
    "/subscribe",
    {
      shema: {
        body: {
          type: "object",
          require: ["email"],
          properties: {
            email: { type: "string" },
          },
        },
      },
    },
    async function (request, reply) {
      const { httpErrors } = fastify;
      const { email } = request.body;
      const baseCarency = "bitcoin";
      const vsCarency = "uah";
      try {
        await fastify.domain.subscription.add(email, baseCarency, vsCarency);
      } catch (error) {
        throw httpErrors.badRequest();
      }
      return reply.send();
    }
  );
};
