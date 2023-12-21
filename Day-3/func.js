const fs = require('fs');

/**
 * 
 * @param {string} path 
 * @returns {[string]}
 */
const loadLines = (path) => fs.readFileSync(path, 'utf-8').split('\n');

/**
 * 
 * @param {string} node 
 * @returns {boolean}
 */
const isNum = (node) => node >= '0' && node <= '9';

/**
 * 
 * @param {string} node 
 * @returns {boolean}
 */
const isEmpty = (node) => node == '.';

const isSymbol = (node) => !isNum(node) && !isEmpty(node);

/**
 * 
 * @param {Array<string>} lines 
 * @param {number} numStart 
 * @param {number} numEnd 
 * @param {number} row 
 * @returns {boolean}
 */
const checkIfNumIsValid = (lines, numStart, numEnd, row) => {
    //check node before number
    if (numStart !== 0)
    {
        numStart -= 1;
        if (isSymbol(lines[row][numStart]))
            return true;
    }
    
    //check node after number
    if (numEnd !== lines[row].length - 1)
    {
        numEnd += 1;
        if (isSymbol(lines[row][numEnd]))
            return true;
    }

    //check line above
    if (row !== 0)
        if (![...lines[row - 1].substring(numStart, numEnd + 1)].every((char) => !isSymbol(char)))
            return true;

    //check line below
    if (row !== lines.length - 1)
        if (![...lines[row + 1].substring(numStart, numEnd + 1)].every((char) => !isSymbol(char)))
            return true;
        
    return false;
}


/**
 * 
 * @param {string} path 
 * @returns {number}
 */
const part1 = (path) => {
    const lines = loadLines(path);

    let sum = 0;
    for (let row = 0; row < lines.length; row++)
    {
        let numberStartCol = -1;
        for (let col = 0; col < lines[row].length; col++)
        {
            if (isNum(lines[row][col]))
            { 
                if (numberStartCol === -1)
                    numberStartCol = col;
            }
            else {
                if (numberStartCol !== -1 && checkIfNumIsValid(lines, numberStartCol, col - 1, row)) {
                    sum += Number(lines[row].substring(numberStartCol, col));
                }
                    
                numberStartCol = -1
            }
        }
        if (numberStartCol !== -1 && checkIfNumIsValid(lines, numberStartCol, lines[row].length - 1, row))
            sum += Number(lines[row].substring(numberStartCol, lines[row].length));
    }
    return sum;
}

module.exports = {part1, checkIfNumIsValid}