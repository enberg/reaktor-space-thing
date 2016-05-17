import {Satellite, SatelliteConstellation} from './lib/satellites';
import fs = require('fs');

if (process.argv.length !== 3) throw "Please supply a data file.";
let file = process.argv[2];

let data = fs.readFileSync(file, 'UTF-8').split("\n");

let seedRow = data.shift();
let seed = seedRow.match(/#SEED: (\d\.\d+)/)[1];
console.log('Seed: ' + seed);

let coordsRow = data.pop();
let coordData = coordsRow.match(/ROUTE,(-?\d+\.\d+),(-?\d+\.\d+),(-?\d+\.\d+),(-?\d+\.\d+)/);
let start = { latitude: parseFloat(coordData[1]), longitude: parseFloat(coordData[2]) };
let end = { latitude: parseFloat(coordData[3]), longitude: parseFloat(coordData[4]) };
console.log("Starting coordinates: " + start.latitude + ", " + start.longitude);
console.log("Ending coordinates: " + end.latitude + ", " + end.longitude);

let constellation = new SatelliteConstellation();
data.forEach(line => {
    let satelliteData = line.match(/(\w+),(-?\d+\.\d+),(-?\d+\.\d+),(\d+\.\d+)/);
    
    constellation.addSatellite(new Satellite(
        satelliteData[1],
        { latitude: parseFloat(satelliteData[2]), longitude: parseFloat(satelliteData[3]) },
        parseFloat(satelliteData[4])
    ));
});
console.log("Added " + data.length + " satellites to constellation..");

let route = constellation.routeSignal(start, end);
let textRoute = route.map(satellite => satellite.name).join(',');

console.log("Route " + textRoute);