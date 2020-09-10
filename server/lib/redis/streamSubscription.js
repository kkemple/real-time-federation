// Reference: https://github.com/luin/ioredis/issues/747#issuecomment-500735545

async function subscribeStream(redis, stream, listener) {
  let lastID = "$";

  while (true) {
    const reply = await redis.xread(
      "BLOCK",
      "1000",
      "COUNT",
      1000,
      "STREAMS",
      stream,
      lastID
    );

    // @TODO: Log errors, then continue to next loop
    if (!reply) {
      continue;
    }

    // console.log(JSON.stringify(reply, null, 2));

    const results = reply[stream];
    const { length } = results;

    if (!results.length) {
      continue;
    }

    listener(results);
    lastID = results[length - 1].id;
  }
}

module.exports = {
  subscribeStream
};
