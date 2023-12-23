const fs = require('fs');

const readData = (path) => fs.readFileSync(path, 'utf-8').split('\n');

/**
 * 
 * @param {string} node
 * @param {[number, number]} direction 
 * @returns {[number, number]} it's [0, 0] if node wont take you anywhere
 */
const getNextDirectionIfPossible = (node, [x, y]) => {
    if (y === 1) {
        if (node === '|')
            return [0, 1];
        if (node === 'L')
            return [1, 0];
        if (node == 'J')
            return [-1, 0];
    }
    else if (y === -1) {
        if (node === '|')
            return [0, -1];
        if (node === '7')
            return [-1, 0];
        if (node == 'F')
            return [1, 0];
    }
    else if (x === 1) {
        if (node === '-')
            return [1, 0];
        if (node === 'J')
            return [0, -1];
        if (node == '7')
            return [0, 1];
    }
    else if (x === -1) {
        if (node === '-')
            return [-1, 0];
        if (node === 'L')
            return [0, -1];
        if (node == 'F')
            return [0, 1];
    }
    return [0, 0];
}

/**
 * 
 * @param {string[]} lines
 * @returns {[number, number]} 
 */
const findStartPos = (nodes) => {
    for (let y = 0; y < nodes.length; y++) {
        const x = nodes[y].indexOf('S');
        if (x !== -1)
            return [x, y];
    }
    return [-1, -1];
}

/**
 * 
 * @param {string[]} nodes 
 * @param {[number, number]} position 
 * @returns {[number, number]} valid direction
 */
const findValidDirectionAround = (nodes, [x, y]) => {
    const isPossible = (node, direction) => {
        const newDirection = getNextDirectionIfPossible(node, direction);
        return newDirection[0] !== 0 || newDirection[1] !== 0
    }

    const toCheckArgs = [];
    if (x < nodes[y].length - 1)
        toCheckArgs.push([nodes[y][x + 1], [1, 0]]);
    if (x > 0)
        toCheckArgs.push([nodes[y][x - 1], [-1, 0]]);
    if (y < nodes.length - 1)
        toCheckArgs.push([nodes[y + 1][x], [0, 1]]);
    if (y > 0)
        toCheckArgs.push([nodes[y - 1][x], [0, -1]]);

    for (const args of toCheckArgs)
        if (isPossible(...args))
            return args[1];
    return [0, 0];
}

/**
 * 
 * @param {[number, number]} toSet 
 * @param {[number, number]} values 
 */
const setDirection = (toSet, values) => {
    toSet[0] = values[0];
    toSet[1] = values[1];
}

/**
 * 
 * @param {string} path 
 * @returns {number}
 */
const part1 = (path) => {
    const nodes = readData(path);
    const currPos = findStartPos(nodes);

    let steps = 0;
    const direction = findValidDirectionAround(nodes, currPos);
    do {
        steps++;
        currPos[0] += direction[0];
        currPos[1] += direction[1];
        setDirection(direction, getNextDirectionIfPossible(nodes[currPos[1]][currPos[0]], direction));
    }
    while (!(direction[0] === 0 && direction[1] === 0))

    return steps / 2;
}

module.exports = {part1}