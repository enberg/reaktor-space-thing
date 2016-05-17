import {inSight, distanceBetweenSatellites, SatPos} from './space_math';
import {Coords} from './geometry';
import {Graph} from './graph';

export class Satellite implements SatPos {
    constructor(public name: string, public coordinates: Coords, public heightOverGround: number) {}
}

export class SatelliteConstellation {
    satellites: Graph<Satellite>;
    
    constructor(satellites?: Satellite[]) {
        this.satellites = new Graph<Satellite>();
        
        if (satellites) {
            satellites.map(satellite => this.addSatellite(satellite));
        }
    }
    
    public addSatellite(satellite: Satellite) {
        this.satellites.addNode(satellite.name, satellite);
        
        this.satellites.nodes.forEach((otherSatellite) => {
            if (inSight(satellite, otherSatellite)) {
                let distance = distanceBetweenSatellites(satellite, otherSatellite);
                
                this.satellites.addEdge(satellite.name, otherSatellite.name, distance);
                this.satellites.addEdge(otherSatellite.name, satellite.name, distance);
            }
        })
    }
    
    routeSignal(start: Coords, end: Coords): Satellite[] {
        let startSat = this.findClosestSatellite(start);
        let endSat = this.findClosestSatellite(end);
        
        return this.satellites.traverse(startSat.name, endSat.name);
    }
    
    findClosestSatellite(pos: Coords): Satellite {
        let posWithHeight = {coordinates: pos, heightOverGround: 0};
        let visibleSatellites = [];
        
        this.satellites.nodes.forEach((sat, name) => {
            if (inSight(sat, posWithHeight)) {
                visibleSatellites.push(sat);
            }
        });
        
        visibleSatellites.sort((sat1, sat2) => distanceBetweenSatellites(posWithHeight, sat1) - distanceBetweenSatellites(posWithHeight, sat2));
        
        return visibleSatellites.shift();
    }
}