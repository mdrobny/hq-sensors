module.exports = {
	redis: {
		host: process.env.REDIS_HOST || '127.0.0.1',
		port: process.env.REDIS_PORT || '6379',
		keyPrefix: 'hq:'
	},
	sensors: {
		cpu: {
			enabled: true,
			// Ms
			interval: 2000
		}
	}
};
