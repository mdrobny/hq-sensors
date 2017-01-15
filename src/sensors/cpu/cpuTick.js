const co = require('co');

const { CPU } = require('../../config/const');

const getCurrentCpuUsage = require('./getCurrentCpuUsage');

function cpuTickWrap(redis) {
    return () => co(function* cpuTick() {
        const date = new Date();

        const cpuUsage = yield getCurrentCpuUsage();

        const data = JSON.stringify({
            datetime: date.toISOString(),
            cpuUsage
        });

        // Use timestamp as a sorted set selector
        const timestamp = date.getTime();

        yield redis.zadd(CPU.SET_NAME, timestamp, data);
    });
}

module.exports = cpuTickWrap;
