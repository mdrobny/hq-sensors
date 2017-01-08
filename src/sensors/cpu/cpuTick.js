const co = require('co');

const redis = require('../../redis');

const getCurrentCpuUsage = require('./getCurrentCpuUsage');

const { CPU } = require('../../config/const');

function cpuTick() {
	return co(function* () {
		const date = new Date();

		const cpuUsage = yield getCurrentCpuUsage();

		const data = JSON.stringify({
			datetime: date.toISOString(),
			cpuUsage
		});

		// Use timestamp as a sorted set selector
		const timestamp = date.getTime();

		console.log('cpu', date.toISOString());

		yield redis.zadd(CPU.SET_NAME, timestamp, data);
	});
}

module.exports = cpuTick;
