const Redis = require('ioredis');

const { redis: redisConfig } = require('./config');

const redis = new Redis(redisConfig);

module.exports = redis;
