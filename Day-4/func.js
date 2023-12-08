const fs = require('fs');

const loadData = (path) => fs.readFileSync(path, 'utf-8').split('\n');

const formatData = (loadData) => 
    loadData.map((line) => {                               
        const colonIndex = line.indexOf(':');                              
        line = line.replace('\r', '');                              
        return line.slice(colonIndex + 2, line.length).split(' | ');                         
    });

const getNumsArray = (str) => {
    const numsPattern = /\d+/g;
    return [...str.matchAll(numsPattern)].map((result) => result[0])
}

exports.part1 = (path) => {
    const lines = formatData(loadData(path))

    let sum = 0
    lines.forEach(([got, pool]) => {
        let count = -1;
        const setPool = new Set(getNumsArray(pool));

        getNumsArray(got).forEach((num) => {
            if (setPool.has(num))
                count += 1;
        })
        if (count !== -1)
            sum += 2 ** count;
    });

    return sum;
}