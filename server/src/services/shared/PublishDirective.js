const { defaultFieldResolver } = require("graphql");
const { SchemaDirectiveVisitor } = require("apollo-server");

const redis = require("../../redis");

class PublishDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    const { resolve = defaultFieldResolver } = field;
    const { payload, event } = this.args;

    field.resolve = async function (source, args, context, info) {
      const result = await resolve.call(this, source, args, context, info);

      let streamData = [];

      if (typeof result === "object" && result !== null) {
        streamData = payload.split(" ").reduce((acc, curr) => {
          acc.push(curr, result[curr]);
          return acc;
        }, streamData);
      } else {
        // Assumes string, number, or boolean
        // @TODO: Handle list response too?
        streamData.push(payload, result);
      }

      // Publish event to Redis stream
      redis.xadd("graphql_stream", "*", "event", event, ...streamData);

      return result;
    };
  }
}

module.exports = PublishDirective;
