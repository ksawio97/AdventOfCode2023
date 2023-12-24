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
    } while (!(direction[0] === 0 && direction[1] === 0))

    return steps / 2;
}

/**
 * 
 * @param {[number, number][]} positions 
 * @returns {[[number, number], [number, number]]} [smallest pos, biggest pos]
 */
const findSmallestAndBiggestPositions = (positions) => {
    let [smallestX, smallestY, biggestX, biggestY] = [Infinity, Infinity, -Infinity, -Infinity];

    positions.forEach(([x, y]) => {
        if (smallestX > x)
            smallestX = x;
        if (biggestX < x)
            biggestX = x;
        if (smallestY > y)
            smallestY = y;
        if (biggestY < y)
            biggestY = y;
    });

    return [[smallestX, smallestY], [biggestX, biggestY]];
}

/**
 * 
 * @param {string} row
 * @returns {number[]} 
 */
const findGapsInRow = (row) => [...row.matchAll(/\.+/g)].map((match) => match.index);

/**
 * 
 * @param {string[]} nodes
 * @param {number} column
 * @returns {number[]} 
 */
const findGapsInColumn = (nodes, column) => findGapsInRow(nodes.map((nodeLine) => nodeLine[column]).join('')).map((y) => [column, y]);

/**
 * 
 * @param {string[]} nodes 
 * @param {[number, number]} pos 
 * @param {Set<string>} checked
 * @returns {number}
 */
const checkAdjentNodes = (nodes, [x, y], checked) => {
    const currItemKey = JSON.stringify([x, y]);
    if (nodes[y][x] !== '.' || checked.has(currItemKey))
        return 0;
    checked.add(currItemKey);

    let count = 1;
    if (x > 0)
        count += checkAdjentNodes(nodes, [x - 1, y], checked);
    if (x < nodes[y].length - 1)
        count += checkAdjentNodes(nodes, [x + 1, y], checked);
    if (y > 0)
        count += checkAdjentNodes(nodes, [x, y - 1], checked);
    if (y < nodes.length - 1)
        count += checkAdjentNodes(nodes, [x, y + 1], checked);
    return count;
}
/**
 * @param {string[]} nodes
 * @returns {number}
 */
const countOpenDots = (nodes) => {
    //get gaps starts from rows and columns (set and array from points filters them in order to be distinct)
    const checkPoints = Array.from(new Set([
        ...findGapsInRow(nodes[0]).map((x) => [x, 0]),
        ...findGapsInRow(nodes[nodes.length - 1]).map((x) => [x, nodes.length - 1]),
        ...findGapsInColumn(nodes, 0),
        ...findGapsInColumn(nodes, nodes[0].length - 1)
    ].map(JSON.stringify))).map(JSON.parse)

    let count = 0;
    const checked = new Set();
    for (const checkPoint of checkPoints)
        count += checkAdjentNodes(nodes, checkPoint, checked);
    return count;
}
/**
 * 
 * @param {string} path 
 * @returns {number}
 */
const part2 = (path) => {
    const nodes = readData(path);
    const currPos = findStartPos(nodes);

    const positions = [];
    const addPosToPositions = () => {
        const toAdd = [0, 0];
        setDirection(toAdd, currPos)
        positions.push(toAdd);
    }

    const direction = findValidDirectionAround(nodes, currPos);
    do {
        addPosToPositions();

        currPos[0] += direction[0];
        currPos[1] += direction[1];

        setDirection(direction, getNextDirectionIfPossible(nodes[currPos[1]][currPos[0]], direction));
    } while (!(direction[0] === 0 && direction[1] === 0));

    const [smallest, biggest] = findSmallestAndBiggestPositions(positions);
    const nodesChunk = nodes.splice(smallest[1], biggest[1] - smallest[1] + 1).map((nodeRow) => nodeRow.substring(smallest[0], biggest[0] + 1));

    const dotsCount = nodesChunk.reduce((acc, curr) => acc + [...curr.matchAll(/\./g)].length, 0);
    const openDotsCount = countOpenDots(nodesChunk);

    return dotsCount - openDotsCount;
}

module.exports = {part1, part2}