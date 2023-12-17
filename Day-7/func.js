const fs = require('fs');

/**
 * 
 * @param {string} path 
 * @returns {Array<[string, number]>} returns hands with their bids
 */
const readFileForData = (path) => fs.readFileSync(path, 'utf-8').split('\n').map((line) => line.split(' ')).map(([hand, bid]) => [convertHandCardsToNumbers(hand), Number(bid)]);

/**
 * 
 * @param {string} hand 
 * @returns {number}
 */
const getHandsTypeRank = (hand) => {
    const countedCards = new Map();
    for (const card of hand)
        countedCards.set(card, (countedCards.has(card) ? countedCards.get(card) : 0) + 1);
    const countedCardsValues = [...countedCards.values()].sort((a, b) => b - a);
    switch (countedCardsValues.length) {
        //Five of a kind
        case 1:
            return 6;
        case 2: 
            //Four of a kind
            if (countedCardsValues[0] === 4)
                return 5;
            //Full house
            if (countedCardsValues[0] === 3)
                return 4;
            break;
        case 3:
            //Three of a kind
            if (countedCardsValues[0] === 3)
                return 3;
            //Two pair
            if (countedCardsValues[0] === 2 && countedCardsValues[1] === 2)
                return 2;
            break;
        case 4:
            //One pair
            if (countedCardsValues[0] === 2)
                return 1;
            break;
        case 5:
            //High card
            return 0;
    }
    return -1;
};

/**
 * 
 * @param {Array<[number, number]>} cardTypeRankWithIndex 
 * @returns {Map<number, Array<number>>}
 */
const groupIndexesByCardTypes = (cardTypeRankWithIndex) => {
    const grouped = new Map();
    cardTypeRankWithIndex.forEach(([rank, index]) => {
        const had = grouped.has(rank);
        const indexes = (had ? grouped.get(rank) : []);
        indexes.push(index);
        if (!had)
            grouped.set(rank, indexes);
    });
    return grouped;
}

/**
 * 
 * @param {string} cards 
 * @returns {Array<number>}
 */
const convertHandCardsToNumbers = (hand) => {
    const pool = "23456789TJQKA";
    return [...hand].map((card) => pool.indexOf(card));
}

/**
 * 
 * @param {Array<[number, Array<number>]>} numsHandsWithIndexes 
 * @returns {Array<number>|number}
 */
exports.getSortedIndexesByHand = (numsHandsWithIndexes) => {
    if (numsHandsWithIndexes.length === 1)
        return numsHandsWithIndexes[0][0];

    //stores grouped elements by num
    const grouped = new Map();
    numsHandsWithIndexes.forEach(([index, hand]) => {
        const firstItem = hand.shift();
        const had = grouped.has(firstItem);
        const groupedElements = (had ? grouped.get(firstItem) : []);
        groupedElements.push([index, hand]);

        if (!had)
            grouped.set(firstItem, groupedElements);
    });

    const sortedIndexes = [...grouped].sort((a, b) => b[0] - a[0])
        //sort indexes within group
        .flatMap(([e, indexesHands]) => this.getSortedIndexesByHand(indexesHands));

    return sortedIndexes;
} 
/**
 * 
 * @param {string} path 
 * @returns {number}
 */
exports.part1 = (path) => {
    const handsWithBids = readFileForData(path);
    const cardsGroupedByType = groupIndexesByCardTypes(handsWithBids.map(([hand, bid], index) =>  [getHandsTypeRank(hand), index]));

    const sortedCardsByRankDesc = [...cardsGroupedByType.entries()].sort((a, b) => b[0] - a[0]).map(([rank, indexes]) => indexes);

    let ranksLeft = handsWithBids.length;
    let result = 0;
    sortedCardsByRankDesc.forEach((indexes) => {
        const indexesWithHands = indexes.map((handIndex) => [handIndex, handsWithBids[handIndex][0]]);
        const sortedIndexes = exports.getSortedIndexesByHand(indexesWithHands);
 
        if (typeof(sortedIndexes) === 'number')
            result += handsWithBids[sortedIndexes][1] * ranksLeft--;
        else
            sortedIndexes.forEach((sortedIndex) => {
                //bid * rank
                result += handsWithBids[sortedIndex][1] * ranksLeft--;
            });
    });

    return result;
};