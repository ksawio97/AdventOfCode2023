const fs = require('fs');

/**
 * 
 * @param {string} path 
 * @returns {Array<[number]>}
 */
const readDataFromFile = (path) => fs.readFileSync(path, 'utf-8')
    //get lines
    .split('\n')
    //read digits in lines
    .map((line) => [...line.matchAll(/\d+/g)].map((match) => Number(match[0])));

/**
 * 
 * @param {Array<number>} time 
 * @param {Array<number>} distance 
 * @returns {Array<[number, number]>}
 */
const zipTimeAndDistance = (time, distance) => time.map((t, i) => [t, distance[i]]);

/**
 * 
 * @param {Array<[number, number]>} timeDistance 
 * @returns {number}
 */
const partCore = (timeDistance) => {
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
/**
 * 
 * @param {string} path 
 * @returns {number}
 */
exports.part1 = (path) => {
    const timeDistance = zipTimeAndDistance(...readDataFromFile(path));
    return partCore(timeDistance);;
}
/**
 * 
 * @param {string} path 
 * @returns {[number, number]}
 */
const readDataFromFilePart2 = (path) => fs.readFileSync(path, 'utf-8')
    //get lines
    .split('\n')
    //read digits in lines
    .map((line) => Number([...line.matchAll(/\d+/g)].reduce((previous, curr) => previous + curr, '')));

/**
 * 
 * @param {string} path 
 * @returns {number}
 */
exports.part2 = (path) => {
    const timeDistance = readDataFromFilePart2(path);
    return partCore([timeDistance]);
}