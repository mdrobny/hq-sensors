const { describe, it } = require('mocha');
const { expect } = require('chai');
const proxyquire = require('proxyquire');

const filePath = '../../src/sensors/cpu/cpuTick';
const getCurrentCpuUsage = './getCurrentCpuUsage';

describe('Sensor - cpuTick', () => {
    it('should throw error if getCurrentCpuUsage fails', function* () {
        let cpuTick = proxyquire(filePath, {
            [getCurrentCpuUsage]: () => { throw new Error('getCurrentCpuUsage failed'); }
        });

        cpuTick = cpuTick({});

        try {
            yield cpuTick();
        } catch (err) {
            expect(err).to.be.instanceof(Error);
            expect(err.message).to.eq('getCurrentCpuUsage failed');
        }
    });

    it('should throw error if redis.zadd fails', function* () {
        const redisMock = {
            zadd: () => { throw new Error('zadd failed'); }
        };

        let cpuTick = proxyquire(filePath, {
            [getCurrentCpuUsage]: () => Promise.resolve(10)
        });

        cpuTick = cpuTick(redisMock);

        try {
            yield cpuTick();
        } catch (err) {
            expect(err).to.be.instanceof(Error);
            expect(err.message).to.eq('zadd failed');
        }
    });

    it('should save using redis.zadd', function* () {
        const redisMock = {
            zadd: () => Promise.resolve()
        };

        let cpuTick = proxyquire(filePath, {
            [getCurrentCpuUsage]: () => Promise.resolve(10)
        });

        cpuTick = cpuTick(redisMock);

        yield cpuTick();
    });
});
