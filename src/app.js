const co = require('co');

const config = require('./config');

const cpuTick = require('./sensors/cpu/cpuTick');

const { sensors: { cpu } } = config;

if (cpu.enabled) {
    setInterval(cpuTick, cpu.interval);
}
