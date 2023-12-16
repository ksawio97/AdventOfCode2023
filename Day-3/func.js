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
 * @returns {function(string): [[string, number]]} returns function that returns array of match num and found index
 */
const getPotentialNumsInLineFabric = () => {
    const findNumsRegex = /(?<=\.|^)\d+(?=\.|$)/g;
    return (line) => [...line.matchAll(findNumsRegex)].map((match) => [match[0], match.index]);
};

/**
 * 
 * @param {[string]} lines 
 */
const checkLinesForSpecialChars = (lines) => {
    for (const line of lines)
        for (const node of line)
            //if node is a special char
            if (!isNum(node) && !isEmpty(node))
                return true;
    return false;
}

/**
 * 
 * @param {[string]} lines 
 * @returns {number}
 */
const sumEasyValidNums = (lines) => {
    //matches non . or non digit nodes before num and after
    const regex = /(?<!^|\.|\d)\d+|\d+(?!\d|\.|$)/g;
    let sum = 0;
    lines.forEach((line) => {
        const easyMatches = [...line.matchAll(regex)]
            .map((match) => Number(match[0]));
        //sum current easyMatches and add to sum
        sum += easyMatches.reduce((previous, current) => previous + current, 0);
    });
    return sum;
}
/**
 * 
 * @param {string} path 
 * @returns {number}
 */
exports.part1 = (path) => {
    const lines = loadLines(path);

    let sum = sumEasyValidNums(lines);
    const getPotentialNumsInLine = getPotentialNumsInLineFabric();
    lines.forEach((line, lineIndex) => {
        const potentialNums = getPotentialNumsInLine(line);
        potentialNums.forEach(([matchedNum, startIndex]) => {
            const linesToCheck = [];
            //add line below
            if (lineIndex > 0)
                linesToCheck.push(lines[lineIndex - 1]);
            //add line above
            if (lineIndex < lines.length - 1)
                linesToCheck.push(lines[lineIndex + 1]);
            //cut line to get strings to check
            const toCheck = linesToCheck.map((lineToCheck) => {
                let subsStart = startIndex - 1;
                let subsLength = matchedNum.length + ((startIndex + matchedNum.length === lineToCheck.length) ? 1 : 2);
                if (startIndex === 0) {
                    subsStart++;
                    subsLength--;
                }
                return lineToCheck.substring(subsStart, subsStart + subsLength)
            });

            if (checkLinesForSpecialChars(toCheck))
                sum += Number(matchedNum); 
        });
    });
    return sum;
}