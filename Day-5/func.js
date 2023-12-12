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

const getSeedsRanges = (data) => {
    const seedsPattern = /(?<=: ).+/;
    let seedsRanges = [];
    convertStrNumSeq(data.match(seedsPattern)[0]).forEach((seeds, i) => {
        if (i % 2 == 0)
        seedsRanges.push([]);
        seedsRanges[seedsRanges.length - 1].push(seeds);
    });
    return seedsRanges;
}

/**
 * This should return handled seed range based on group fragment, it can exhaust seeds from seed range (length set to 0)
 * @param {[number, number]} seedRange range of seeds - [seedStart, length]
 * @param {[number, number, number]} groupFragment check if seeds are in group then handle them
 * @param {(seedRange: [number, number]) => void}  addUnhandledSeedRange setter for adding additional unhandled seed range
 * @returns {[number, number]} returns handled seedRange, when it is empty there's none
 */
exports.handleRange = (seedRange, [destination, source, length], addUnhandledSeedRange) => {
    const groupEnd = source + length;
    const seedRangeEnd = seedRange[0] + seedRange[1]

    const startIsInRange = seedRange[0] >= source;
    const endIsInRange = seedRangeEnd <= groupEnd;
    const difference = destination - source;

    //it's completly inside group fragment
    if (startIsInRange && endIsInRange) {
        const toReturn = [seedRange[0] + difference, seedRange[1]]
        //invalidate seed
        seedRange[1] = 0;

        return toReturn;
    }
    //start is only in group range
    else if (startIsInRange) 
    {
        const handledSeedsLength = groupEnd - seedRange[0];
        //from start to group end
        const toReturn = [seedRange[0] + difference, handledSeedsLength];

        seedRange[0] += handledSeedsLength;
        seedRange[1] -= handledSeedsLength;

        return toReturn;
    }
    //end is only in group range
    else if (endIsInRange) 
    {
        const handledSeedsLength = seedRangeEnd - source
        //from start to group end
        const toReturn = [source + difference, handledSeedsLength];

        seedRange[1] -= handledSeedsLength;

        return toReturn;
    }
    //group is entirely inside seedRange
    else if (seedRange[0] < source && groupEnd <= seedRangeEnd) {
        const toReturn = [destination, length];

        const unhandledEndElementsCount = seedRangeEnd - groupEnd;
        //take out rests - [group end, seedRange end]
        addUnhandledSeedRange([groupEnd, unhandledEndElementsCount]);

        seedRange[1] -= unhandledEndElementsCount + length;
        return toReturn;
    }

    return [];
}

/**
 * 
 * @param {string} path
 * @returns {number} 
 */
exports.part2 = (path) => {
    const data = loadData(path);

    let unhandledSeedsRanges = getSeedsRanges(data);

    const groupsPattern = /([\d ]+\r?\n)+.+/gm;
    const groups = convertGroupsToNumSeq([...data.matchAll(groupsPattern)]);
    const addToUnhandledSeedsRanges = (unhandledSeedRange) => unhandledSeedsRanges.push(unhandledSeedRange);

    groups.forEach((group) => {
        let handledSeedsRanges = [];
        while (unhandledSeedsRanges.length > 0) 
        {
            for (const groupFragment of group) 
            {
                const handledPiece = exports.handleRange(unhandledSeedsRanges[0], groupFragment, addToUnhandledSeedsRanges);

                //if unhandled length is 0 it is now handled
                if (unhandledSeedsRanges[0][1] === 0) {
                    unhandledSeedsRanges.splice(0 ,1);
                    continue;
                } 

                if (handledPiece != [])
                    handledSeedsRanges.push(handledPiece);
            }
        }
        unhandledSeedsRanges = handledSeedsRanges;
    });
    return 1;
}