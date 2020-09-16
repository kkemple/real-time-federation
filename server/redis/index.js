const Redis = require("ioredis");

require("./utils/streamTransformers");

const redis = new Redis(process.env.REDIS_PORT, process.env.REDIS_HOST);

module.exports = redis;
