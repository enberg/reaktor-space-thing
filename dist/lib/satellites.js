"use strict";
const space_math_1 = require('./space_math');
const graph_1 = require('./graph');
class Satellite {
    constructor(name, coordinates, heightOverGround) {
        this.name = name;
        this.coordinates = coordinates;
        this.heightOverGround = heightOverGround;
    }
}
exports.Satellite = Satellite;
class SatelliteConstellation {
    constructor(satellites) {
        this.satellites = new graph_1.Graph();
        if (satellites) {
            satellites.map(satellite => this.addSatellite(satellite));
        }
    }
    addSatellite(satellite) {
        this.satellites.addNode(satellite.name, satellite);
        this.satellites.nodes.forEach((otherSatellite) => {
            if (space_math_1.inSight(satellite, otherSatellite)) {
                let distance = space_math_1.distanceBetweenSatellites(satellite, otherSatellite);
                this.satellites.addEdge(satellite.name, otherSatellite.name, distance);
                this.satellites.addEdge(otherSatellite.name, satellite.name, distance);
            }
        });
    }
    routeSignal(start, end) {
        let startSat = this.findClosestSatellite(start);
        let endSat = this.findClosestSatellite(end);
        return this.satellites.traverse(startSat.name, endSat.name);
    }
    findClosestSatellite(pos) {
        let posWithHeight = { coordinates: pos, heightOverGround: 0 };
        let visibleSatellites = [];
        this.satellites.nodes.forEach((sat, name) => {
            if (space_math_1.inSight(sat, posWithHeight)) {
                visibleSatellites.push(sat);
            }
        });
        visibleSatellites.sort((sat1, sat2) => space_math_1.distanceBetweenSatellites(posWithHeight, sat1) - space_math_1.distanceBetweenSatellites(posWithHeight, sat2));
        return visibleSatellites.shift();
    }
}
exports.SatelliteConstellation = SatelliteConstellation;
