const fs = require('fs');

/**
 * 
 * @param {string} path 
 * @returns {number[][]}
 */
const readSequences = (path) => fs.readFileSync(path, 'utf-8')
    .split('\n')
    .map((line) => line.split(' ').map((n) => Number(n)));

/**
 * 
 * @param {number[]} sequence 
 * @returns {[number[], boolean]}
 */
const getSequencesDifferences = (sequence) => {
    const newSeq = [];
    let onlyZeros = true;
    for (let i = 0; i < sequence.length - 1; i++) {
        newSeq.push(sequence[i + 1] - sequence[i]);
        if (onlyZeros && newSeq[newSeq.length - 1] !== 0)
            onlyZeros = false;
    }
        
    return [newSeq, !onlyZeros];
};

/**
 * 
 * @param {string} path 
 * @returns {number}
 */
const part1 = (path) => {
    const sequences = readSequences(path);
    let sum = 0;
    sequences.forEach((sequence) => {
        let result = [sequence, true];
        while(result[1]) {
            //add last element
            sum += result[0][result[0].length - 1];
            result = getSequencesDifferences(result[0]);
        }
    });
    return sum;
};

/**
 * 
 * @param {string} path 
 * @returns {number}
 */
const part2 = (path) => {
    const sequences = readSequences(path);
    let sum = 0;
    sequences.forEach((sequence) => {
        const firstNums = [];
        let result = [sequence, true];
        while(result[1]) {
            //add first element
            firstNums.unshift(result[0][0]);
            
            result = getSequencesDifferences(result[0]);
        }
        sum += firstNums.reduce((acc, curr) => curr - acc, 0);
    });
    return sum;
};

module.exports = {part1, part2};