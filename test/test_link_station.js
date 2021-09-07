const assert = require('chai').assert;
const get_distance = require('../link_station.js').get_distance;
const get_power = require('../link_station.js').get_power;
const get_best_link_station = require('../link_station.js').get_best_link_station;

describe('Test link_station.js', function() {
    describe('Test get_distance function', function() {
        it('when it is the same point', function() {
            let device = [0, 0];
            let link_station = [0, 0, 10];
            let result = get_distance(device, link_station);
            assert.equal(result, 0);
        });
        it('when it is two different points', function() {
            let device = [10, 10];
            let link_station = [7, 7, 10];
            let result = get_distance(device, link_station);
            assert.equal(result.toFixed(4), 4.2426);
        });
        it('when it is the same point but it is not equal to (0, 0)', function() {
            let device = [5, 5];
            let link_station = [5, 5, 5];
            let result = get_distance(device, link_station);
            assert.equal(result, 0);
        });
        it('when it is not the same point and non of them is equal to (0, 0)', function() {
            let device = [9, 9];
            let link_station = [15, 15, 15];
            let result = get_distance(device, link_station);
            assert.equal(result.toFixed(4), 8.4853);
        });
    });
    describe('Test get_power function', function() {
        it('when the device is in the same point with the link station', function() {
            let device = [0, 0];
            let link_station = [0, 0, 10];
            let result = get_power(device, link_station);
            assert.equal(result, 100)
        });
        it('when the device is close to the link station', function() {
            let device = [4, 4];
            let link_station = [3, 3, 10];
            let result = get_power(device, link_station);
            assert.equal(result.toFixed(4), 73.7157)
        });
        it('when the device is far away from the link station (out of reach)', function() {
            let device = [15, 15];
            let link_station = [1, 1, 5];
            let result = get_power(device, link_station);
            assert.equal(result.toFixed(4), 0)
        });  
    });
    describe('Test get_best_link_station function', function() {
        it('when the device is in the same point with the link station', function() {
            let devices = [1, 1];
            let link_stations = [[3, 3, 5]];
            let result = get_best_link_station(devices, link_stations);           
            assert.equal(result, "Best link station for point 1,1 is 3,3 with power 4.715728752538098");
        });
        it('when there are several stations around', function() {
            let devices = [5, 5];
            let link_stations = [
                [4, 4, 10],
                [6, 7, 15],
                [7, 4, 5]    
            ];
            let result = get_best_link_station(devices, link_stations);           
            assert.equal(result, "Best link station for point 5,5 is 6,7 with power 162.9179606750063");
        });
        it('when there are several stations that out of reach', function() {
            let devices = [25, 25];
            let link_stations = [
                [5, 4, 7],
                [6, 7, 6],
                [7, 4, 5]    
            ];
            let result = get_best_link_station(devices, link_stations);           
            assert.equal(result, "No link station within reach for point 25,25");
        });
    });
});
