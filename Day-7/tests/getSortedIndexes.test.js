const func = require('../func');


test('every sequence start is different', () => {
    const testArgs = [
        [0, [3, 6]],
        [1, [9, 6]],
        [2, [5, 6]]
    ];
    const result = func.getSortedIndexesByHand(testArgs);

    expect(result).toStrictEqual([1, 2, 0]);
});

test('every sequence starts are the same', () => {
    const testArgs = [
        [0, [3, 10]],
        [1, [3, 4]],
        [2, [3, 6]]
    ];
    const result = func.getSortedIndexesByHand(testArgs);

    expect(result).toStrictEqual([0, 2, 1]);
});

test('some sequence starts are the same', () => {
    const testArgs = [
        [0, [3, 4]],
        [1, [3, 10]],
        [2, [4, 6]]
    ];
    const result = func.getSortedIndexesByHand(testArgs);

    expect(result).toStrictEqual([2, 1, 0]);
});


test('most sequences overlap', () => {
    const testArgs = [
        [0, [3, 4, 30, 2]],
        [1, [3, 10, 11, 4]],
        [2, [4, 6, 9, 72]],
        [3, [4, 6, 9, 2]],
        [5, [4, 6, 7, 3]],
        [4, [4, 6, 7, 1]]
    ];
    const result = func.getSortedIndexesByHand(testArgs);

    expect(result).toStrictEqual([2, 3, 5, 4, 1, 0]);
});