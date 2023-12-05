const fs = require('fs');
/**
 * 
 * @param {string} path 
 * @returns {[string]}
 */
const readLines = (path) => {
    const input = fs.readFileSync(path, 'utf-8')
    return input.split('\n')
}
/**
 * 
 * @param {string} str 
 * @returns {boolean}
 */
const isNumber = (str) => {
    return str >= '0' && str <= '9'
}

/**
 * 
 * @param {string} path 
 * @returns {number}
 */
exports.getSum1 = (path) => {
    const lines = readLines(path);
    //sum every line
    const linesSums = lines.map((line) => {
        let sum = 0;
        let found = [false, false];
        for (let i = 0; i < line.length; i++) {
            //get first num
            if (!found[0] && isNumber(line[i])) {
                sum += 10 * Number(line[i])
                found[0] = true;
            }  
            //get last num
            if (!found[1] && isNumber(line[line.length - i - 1])) {
                sum += Number(line[line.length - i - 1])
                found[1] = true;
            }   
            
            //break if found first and last
            if (found[0] && found[1])
                break;
        }
        return sum;
    });
    //sum them together
    return linesSums.reduce((acc, curr) => acc + curr, 0);
}

/**
 * 
 * @returns {function}
 */
const getAdvancedNumberChecker = () => {
    const advancedNums = ['one', 'two','three','four','five','six','seven','eight','nine']
     /**
     * @param {string} str - The input string.
     * @param {number} startIndex - The start index in the string.
     * @param {boolean} reversed - Whether the string should be checked in reverse.
     * @returns {number} The corresponding number if the input is an advanced number, 0 otherwise.
     */
    return (str, startIndex, reversed) => {
        //look for normal num
        if (isNumber(str[startIndex]))
            return Number(str[startIndex]);
        //look for advanced num
        for (let i = 0; i < advancedNums.length; i++) 
            if (reversed ? advancedNums[i] == str.slice(startIndex - advancedNums[i].length, startIndex) : advancedNums[i] == str.slice(startIndex, startIndex + advancedNums[i].length))
                return i + 1;

        return 0;
    }
}

/**
 * 
 * @param {string} path 
 * @returns {number}
 */
exports.getSum2 = (path) => {
    const lines = readLines(path);
    const getAdvancedNumber = getAdvancedNumberChecker();
    //sum every line
    const linesSums = lines.map((line) => {
        let sum = 0;
        let found = [false, false];
        for (let i = 0; i < line.length; i++) {
            //get first num
            if (!found[0]) {
                const num = getAdvancedNumber(line, i, false);
                sum += 10 * num;
                if (num != 0)
                    found[0] = true;
            }  
            //get last num
            if (!found[1]) {
                const num = getAdvancedNumber(line, line.length - i, true);
                sum += num;
                if (num != 0)
                    found[1] = true;
            }
            
            //break if found first and last
            if (found[0] && found[1])
                break;
        }
        return sum;
    });
    //sum them together
    return linesSums.reduce((acc, curr) => acc + curr, 0);
}