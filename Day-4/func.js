const fs = require('fs');

/**
 * 
 * @param {string} path 
 * @returns {[string]}
 */
const loadData = (path) => fs.readFileSync(path, 'utf-8').split('\n');

/**
 * 
 * @param {[string]} loadData 
 * @returns {[[string, string]]}
 */
const formatData = (loadData) => 
    loadData.map((line) => {                               
        const colonIndex = line.indexOf(':');                              
        line = line.replace('\r', '');                              
        return line.slice(colonIndex + 2, line.length).split(' | ');                         
    });

/**
 * 
 * @param {string} str 
 * @returns {[string]}
 */
const getNumsArray = (str) => {
    const numsPattern = /\d+/g;
    return [...str.matchAll(numsPattern)].map((result) => result[0])
}

/**
 * 
 * @param {[string]} got 
 * @param {[string]} pool 
 * @returns {number}
 */
const countMatches = (got, pool) => {
    let count = 0;
    const poolSet = new Set(getNumsArray(pool));

    getNumsArray(got).forEach((num) => {
        if (poolSet.has(num))
            count += 1;
    })
    return count;
}

/**
 * 
 * @param {string} path 
 * @returns {number}
 */
exports.part1 = (path) => {
    const lines = formatData(loadData(path))

    let sum = 0
    lines.forEach(([got, pool]) => {
        const count = countMatches(got, pool) - 1;
        if (count !== -1)
            sum += 2 ** count;
    });

    return sum;
}

/**
 * 
 * @param {string} path 
 * @returns {number}
 */
exports.part2 = (path) => {
    const lines = formatData(loadData(path))

    const additionalCopies = new Map();
    let copiesSum = 0;
    lines.forEach(([got, pool], currIndex) => {
        let count = countMatches(got, pool);
        //get amount of cards that acts as multiplier
        const multiplier = additionalCopies.get(currIndex) === undefined ? 1 : additionalCopies.get(currIndex) + 1;

        //current element copies are no longer needed
        additionalCopies.delete(currIndex);

        //add copies to next cards iteration
        while (count > 0) {
            const key = currIndex + count;
            const currentCount = additionalCopies.get(key);
            additionalCopies.set(key, (currentCount === undefined ? 0 : currentCount) + 1 * multiplier);
            count--;
        }
        //add copies to sum
        copiesSum += multiplier;
    });

    return copiesSum;
}