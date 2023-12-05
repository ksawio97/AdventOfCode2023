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
    const validEnd = (num) => lines.length - 1 == num ? num : num + 1;

    let validStartRow = validStart(row);
    const validEndRow = validEnd(row);
    const validStartCol = validStart(startCol);
    const validEndCol = validEnd(endCol);
    
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
    const lines = loadLines(path);
    let sum = 0;
    for (let row = 0; row < lines.length; row++) {
        let scanStart = -1;
        for (let col = 0; col < lines[row].length; col++) {
            //if it's number
            if (isNum(lines[row][col]))
            {
                //if scanning haven't started
                if(scanStart == -1)
                    scanStart = col;
            }
            //add collected number and empty it if it's valid
            else if (scanStart != -1) {
                if (checkIfNodesValid(lines, row, scanStart, col - 1)) 
                    sum += Number(lines[row].slice(scanStart, col));
                scanStart = -1;
            }
        }
    }
    return sum;
}