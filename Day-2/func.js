const fs = require('fs');

/**
 * 
 * @param {string} path 
 * @returns {[string]}
 */
const loadGames = (path) => fs.readFileSync(path, 'utf-8').split('\n');

/**
 * 
 * @param {string} round 
 * @returns {[[[string]]]}
 */
const parseCubesInfo = (round) => [...round.matchAll(/[0-9]+ [a-z]+/g)].map((match) => match[0]).map((info) => info.split(' '));

/**
 * 
 * @param {string} round 
 * @param {Object.<string, number>} bag 
 * @returns {boolean}
 */
const isRoundPossible = (round, bag) => {
    const cubesInfo = parseCubesInfo(round);
    for (const cubeInfo of cubesInfo) {
        //if there's not enough cubes in bag
        if (bag[cubeInfo[1]] < Number(cubeInfo[0]))
            return false;
    }

    return true;
}

/**
 * 
 * @param {string} game 
 * @param {Object.<string, number>} bag 
 * @returns {boolean}
 */
const isGamePossible = (game, bag) => {
    const rounds = game.split(';');
    for (const round of rounds) 
        if(!isRoundPossible(round, bag)) 
            return false;
    return true;
}

/**
 * 
 * @param {string} path 
 * @returns {number}
 */
exports.part1 = (path) => {
    const games = loadGames(path);
    const bag = { 'red': 12, 'green': 13, 'blue': 14 };
    let sum = 0;
    games.forEach((game, i) => {
        if (isGamePossible(game, bag))
            sum += i + 1;
    });
    return sum;
}

/**
 * 
 * @param {string} game 
 * @returns {number}
 */
const getFewestNumberOfCubesPow = (game) => {
    const rounds = game.split(';');
    const bag = { 'red': 0, 'green': 0, 'blue': 0 };
    rounds.forEach((round) => {
        const cubesInfo = parseCubesInfo(round);
        for (const cubeInfo of cubesInfo) {
            const cubeCount = Number(cubeInfo[0])
            //if it requires more
            if (bag[cubeInfo[1]] < cubeCount)
                bag[cubeInfo[1]] = cubeCount;
        }
    });

    //multiplicates them
    return Object.keys(bag).reduce((acc, curr) => acc * bag[curr], 1);
}

/**
 * 
 * @param {string} path 
 * @returns {number}
 */
exports.part2 = (path) => {
    const games = loadGames(path);
    let sum = 0;
    games.forEach((game) => {
        sum += getFewestNumberOfCubesPow(game);
    });
    return sum;
}