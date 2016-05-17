import {distanceToHorizon, haversineDistance, Coords} from './geometry';

export function distanceBetweenSatellites(sat1: SatPos, sat2: SatPos) {
    return distanceToHorizon(sat1.heightOverGround) + distanceToHorizon(sat2.heightOverGround);
}

export function inSight(sat1: SatPos, sat2: SatPos): boolean {
    return distanceBetweenSatellites(sat1, sat2) > haversineDistance(sat1.coordinates, sat2.coordinates);
}

export interface SatPos {
    coordinates: Coords,
    heightOverGround: number
}