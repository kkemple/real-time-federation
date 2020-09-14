// Reference: https://github.com/luin/ioredis/issues/747#issuecomment-500735545

async function subscribeStream(redis, stream, listener) {
  let lastID = "$";

  while (true) {
    const reply = await redis.xread(
      "BLOCK",
      "1000",
      "COUNT",
      100,
      "STREAMS",
      stream,
      lastID
    );

    // @TODO: Log errors, then continue to next loop
    if (!reply) {
      continue;
    }

    const results = reply[stream];

    if (!results || (results && !results.length)) {
      continue;
    }

    listener(results);
    lastID = results[results.length - 1].id;
  }
}

module.exports = {
  subscribeStream
};
