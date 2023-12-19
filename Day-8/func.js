const fs = require('fs');

/**
 * 
 * @param {string} path 
 * @returns {string[]}
 */
const readFileData = (path) => fs.readFileSync(path, 'utf-8').split('\n');

/**
 * 
 * @param {string[]} lines 
 * @returns {[number[], Map<string, [string, string]>]}
 */
const parseData1 = (lines) => {
    const instructions = [...lines.splice(0, 2)[0]].map((c) => c === 'L' ? 0 : 1);

    const lettersPattern = /[A-Z]+/g;
    const nodes = new Map();
    lines.forEach((line) => {
        const letters = [...line.matchAll(lettersPattern)].map((item) => item[0]);
        nodes.set(letters[0], letters.splice(1, 2));
    });

    return [instructions, nodes];
}

const partCore = (currentNode, instructions, nodes, isNodeValid) => {
    let stepsCount = 0;
    while (!isNodeValid(currentNode))
    {
        const option = instructions[stepsCount++ % instructions.length];
        currentNode = nodes.get(currentNode)[option];
    }
    return stepsCount;
}

/**
 * 
 * @param {string} path 
 * @returns {number}
 */
exports.part1 = (path) => {
    const [instructions, nodes] = parseData1(readFileData(path));
    return partCore('AAA', instructions, nodes, (currentNode) => currentNode === 'ZZZ');
}

/**
 * 
 * @param {string[]} lines 
 * @returns {[number[], string[], string[], Map<string, [string, string]>]}
 */
const parseData2 = (lines) => {
    const instructions = [...lines.splice(0, 2)[0]].map((c) => c === 'L' ? 0 : 1);

    const nodesPattern = /[A-Z\d]+/g;

    const startNodesKeys = [];
    const endNodesKeys = [];
    const nodes = new Map();
    lines.forEach((line) => {
        const letters = [...line.matchAll(nodesPattern)].map((item) => item[0]);

        if (letters[0][2] === 'A')
            startNodesKeys.push(letters[0]);
        else if (letters[0][2] === 'Z')
            endNodesKeys.push(letters[0]);

        nodes.set(letters[0], letters.splice(1, 2));
    });

    return [instructions, startNodesKeys, endNodesKeys, nodes];
}

function gcd(a, b) {
    if (b === 0) {
        return a;
    }
    return gcd(b, a % b);
}
  
function lcm(a, b) {
    return (a * b) / gcd(a, b);
}
  
function findLCM(arr) {
    return arr.reduce((a, b) => lcm(a, b), 1);
}

/**
 * 
 * @param {string} path 
 * @returns {number}
 */
exports.part2 = (path) => {
    const [instructions, startNodesKeys, endNodesKeys, nodes] = parseData2(readFileData(path));

    const reachTimes = startNodesKeys.map((startNodeKey) => partCore(startNodeKey, instructions, nodes, (currentNode) => endNodesKeys.includes(currentNode)));
    
    return findLCM(reachTimes);
}