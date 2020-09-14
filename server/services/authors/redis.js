const Redis = require("ioredis");

require("../../lib/redis/streamTransformers");

const redis = new Redis(process.env.REDIS_PORT, process.env.REDIS_HOST);

module.exports = redis;
