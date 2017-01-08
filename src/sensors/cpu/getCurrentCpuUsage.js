const os = require('os');

function getCurrentCpuUsage(tickDuration = 1000) {
	const { idle: startIdle, total: startTotal } = getCpuInfo();

	return new Promise((resolve, reject) => {
		setTimeout(() => {			
			const { idle: endIdle, total: endTotal } = getCpuInfo();

			const idle = endIdle - startIdle;
			const total = endTotal - startTotal;

			if (total === 0) {
				return reject(new Error('Total is 0'));
			}

			let usage = 100 * (1 - idle / total);
			usage = parseFloat(usage.toFixed(2));

			return resolve(usage);
		}, tickDuration);
	});
}

function getCpuInfo() {
	const cpus = os.cpus();

	let user = 0;
	let nice = 0;
	let sys = 0;
	let idle = 0;
	let irq = 0;
	let total = 0;

	for(let i = 0; i < cpus.length; i++) {
		const { times } = cpus[0];
		user += times.user;
		nice += times.nice;
		sys += times.sys;
		idle += times.idle;
		irq += times.irq;
	}

	total = user + nice + sys + idle + irq;

  return { idle, total };
}

module.exports = getCurrentCpuUsage;
