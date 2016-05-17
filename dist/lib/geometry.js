"use strict";
exports.R = 6371.0;
function distanceToHorizon(heightOverGround) {
    return exports.R * Math.tan(Math.acos(1 / (1 + heightOverGround / exports.R)));
}
exports.distanceToHorizon = distanceToHorizon;
function haversineDistance(coord1, coord2) {
    let dLat = deg2rad(coord2.latitude - coord1.latitude);
    let dLon = deg2rad(coord2.longitude - coord1.longitude);
    let lat1 = deg2rad(coord1.latitude);
    let lat2 = deg2rad(coord2.latitude);
    let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.sin(dLon / 2) * Math.sin(dLon / 2) *
            Math.cos(lat1) * Math.cos(lat2);
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return exports.R * c;
}
exports.haversineDistance = haversineDistance;
function deg2rad(deg) {
    return deg * Math.PI / 180;
}
