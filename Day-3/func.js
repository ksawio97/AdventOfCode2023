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

/**
 * 
 * @param {string} line 
 * @param {number} start 
 * @param {number} end 
 */
const checkRowForValidationNodes = (line, start, end) => {
    for(let i = start; i <= end; i++)
        if (!isNum(line[i]) && !isEmpty(line[i])) 
            return true;  

    return false;
}

/**
 * 
 * @param {[string]} lines 
 * @param {number} row 
 * @param {number} startCol 
 * @param {number} endCol 
 * @returns {boolean}
 */
const checkIfNodesValid = (lines, row, startCol, endCol) => {
    const validStart = (num) => num == 0 ? num : num - 1;
    const validEnd = (num, max) => max == num ? num : num + 1;

    let validStartRow = validStart(row);
    const validEndRow = validEnd(row, lines.length - 1);
    const validStartCol = validStart(startCol);
    const validEndCol = validEnd(endCol, lines[validStartRow].length - 1);
    for (; validStartRow <= validEndRow; validStartRow++) {
        if (checkRowForValidationNodes(lines[validStartRow], validStartCol, validEndCol))
            return true;
    }

    return false;
}


/**
 * 
 * @param {string} path 
 * @returns {number}
 */
exports.part1 = (path) => {
    const lines = loadLines(path).map((line) => line.replaceAll('\r', ''));
    let sum = 0;
    for (let row = 0; row < lines.length; row++) {
        let scanStart = -1;
        for (let col = 0; col < lines[row].length; col++) {
            const isNumber = isNum(lines[row][col]);
            //if it's number and scanning haven't started
            if (isNumber && scanStart == -1)
            {
                scanStart = col;
            }
            //add collected number and empty it if it's valid
            if ((!isNumber || col === lines[row].length - 1) && scanStart != -1) {
                if (checkIfNodesValid(lines, row, scanStart, col - 1)) {
                    if (col === lines[row].length - 1 && isNum(lines[col]))
                        sum += Number(lines[row].slice(scanStart, col + 1));
                    else
                        sum += Number(lines[row].slice(scanStart, col));     
                }
                    
                scanStart = -1;
            }
        }
    }
    return sum;
}