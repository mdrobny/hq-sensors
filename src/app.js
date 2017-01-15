const redis = require('./redis');
const cpuTick = require('./sensors/cpu/cpuTick')(redis);
const { sensors: { cpu } } = require('./config');

if (cpu.enabled) {
    setInterval(cpuTick, cpu.interval);
}
