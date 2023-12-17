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
 *
 */
const parseData = (lines) => {
    const instructions = [...lines.splice(0, 2)[0]].map((c) => c === 'L' ? 0 : 1);

    const lettersPattern = /[A-Z]+/g;
    const nodes = new Map();
    lines.forEach((line) => {
        const letters = [...line.matchAll(lettersPattern)].map((item) => item[0]);
        nodes.set(letters[0], letters.splice(1, 2));
    });

    return [instructions, nodes];
}
/**
 * 
 * @param {string} path 
 * @returns 
 */
exports.part1 = (path) => {
    const [instructions, nodes] = parseData(readFileData(path));

    let currentNode = 'AAA';
    let stepsCount = 0;
    while (currentNode != 'ZZZ')
    {
        const option = instructions[stepsCount++ % instructions.length];
        currentNode = nodes.get(currentNode)[option];
    }
    return stepsCount;
}