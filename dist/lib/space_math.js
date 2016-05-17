"use strict";
const geometry_1 = require('./geometry');
function distanceBetweenSatellites(sat1, sat2) {
    return geometry_1.distanceToHorizon(sat1.heightOverGround) + geometry_1.distanceToHorizon(sat2.heightOverGround);
}
exports.distanceBetweenSatellites = distanceBetweenSatellites;
function inSight(sat1, sat2) {
    return distanceBetweenSatellites(sat1, sat2) > geometry_1.haversineDistance(sat1.coordinates, sat2.coordinates);
}
exports.inSight = inSight;
