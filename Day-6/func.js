const fs = require('fs');

const readDataFromFile = (path) => fs.readFileSync(path, 'utf-8')
    //get lines
    .split('\n')
    //read digits in lines
    .map((line) => [...line.matchAll(/\d+/g)].map((match) => Number(match[0])));

const zipTimeAndDistance = (time, distance) => time.map((t, i) => [t, distance[i]]);

exports.part1 = (path) => {
    const timeDistance = zipTimeAndDistance(...readDataFromFile(path));
    
    let multiplied = 1;
    timeDistance.forEach(([time, distance]) => {
        const delta = (Math.pow(time, 2)) - 4 * distance;
        //if delta is than 0 it means that there's no way to beat this record
        if (delta < 0)
            return;
        const sqrtDelta = Math.sqrt(delta);
        const getX = (sd) => (time + sd) / 2;
        let [x1, x2] = [getX(sqrtDelta), Math.floor(getX(-sqrtDelta))];
        const flooredX1 = Math.floor(x1);
        x1 = (flooredX1 < x1) ? flooredX1 : x1 - 1;
        const possibilities = x1 - x2;
        multiplied *= possibilities;
    });
    return multiplied;
}