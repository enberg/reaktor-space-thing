export const R = 6371.0;

export function distanceToHorizon(heightOverGround: number): number {
    return R * Math.tan(Math.acos(1 / (1 + heightOverGround / R)));
}

export function haversineDistance(coord1: Coords, coord2: Coords): number {
    let dLat = deg2rad(coord2.latitude - coord1.latitude);
    let dLon = deg2rad(coord2.longitude - coord1.longitude);
    let lat1 = deg2rad(coord1.latitude);
    let lat2 = deg2rad(coord2.latitude);

    let a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.sin(dLon/2) * Math.sin(dLon/2) *
            Math.cos(lat1) * Math.cos(lat2);
            
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    
    return R * c;
}

function deg2rad(deg: number): number {
    return deg * Math.PI / 180;
}

export interface Coords {
    latitude: number,
    longitude: number
}