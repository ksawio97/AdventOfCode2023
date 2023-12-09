const fs = require('fs');

/**
 * 
 * @param {string} path 
 * @returns {string}
 */
const loadData = (path) => fs.readFileSync(path, 'utf-8');

/**
 * converts '0 15 37' to [0, 15, 37]
 * @param {string} numSeq 
 * @returns {[number]}
 */
const convertStrNumSeq = (numSeq) => numSeq.split(' ').map((seed) => Number(seed));

/**
 * converts '0 15 37\n39 0 15' to [[0, 15, 37], [39, 0, 15]]
 * @param {[string]} groups 
 * @returns {[[number]]}
 */
const convertGroupsToNumSeq = (groups) => groups.map((group) => group[0].split('\n').map((groupFragment) => convertStrNumSeq(groupFragment)));

/**
 * 
 * @param {number} num 
 * @param {number} start 
 * @param {number} end 
 * @returns {boolean}
 */
const isInRange = (num, start, end) => start <= num && num < end;

/**
 * 
 * @param {string} path 
 * @returns {number}
 */
exports.part1 = (path) => {
    const data = loadData(path);

    const seedsPattern = /(?<=: ).+/;
    let seeds = convertStrNumSeq(data.match(seedsPattern)[0]);

    const groupsPattern = /([\d ]+\r?\n)+.+/gm;
    const groups = convertGroupsToNumSeq([...data.matchAll(groupsPattern)]);

    groups.forEach((group) => {
        for (let i = 0; i < seeds.length; i++) {
            //groupFragment = [destination, source, length]
            for (const groupFragment of group) 
            {
                const difference = groupFragment[0] - groupFragment[1];
                if (isInRange(seeds[i], groupFragment[1], groupFragment[1] + groupFragment[2])) {
                    seeds[i] = seeds[i] + difference;
                    break;
                }
            }
        }
    });

    return Math.min(...seeds);
}