const Group = require('../src/Group');
const MyRange = require('../src/MyRange');

const rangeStart = 40;
const rangeEnd = 90;

const group = new Group(20, new MyRange(rangeStart, rangeEnd)); 

test('nums entirely inside group', () => {
    for (const range of [new MyRange(45, 83), new MyRange(40, 63), new MyRange(45, 90), new MyRange(40, 90)]) {
        const result = group.elementsInGroup(range);

        expect(result.start).toBe(range.start);
        expect(result.end).toBe(range.end);
    }
});

test('nums end is only inside group', () => {
    //range, [expectRangeStart, expectRangeEnd]
    const testArgs = [
        [new MyRange(20, 83), [rangeStart, 83]],
        [new MyRange(20, rangeEnd), [rangeStart, rangeEnd]],
        [new MyRange(20, rangeStart), [rangeStart, rangeStart]]
    ];
    for (const testArg of testArgs) {
        const result = group.elementsInGroup(testArg[0]);

        expect(result.start).toBe(testArg[1][0]);
        expect(result.end).toBe(testArg[1][1]);
    }
});

test('nums start is only inside group', () => {
    //range, [expectRangeStart, expectRangeEnd]
    const testArgs = [
        [new MyRange(rangeStart, rangeEnd + 10), [rangeStart, rangeEnd]],
        [new MyRange(60, rangeEnd + 100), [60, rangeEnd]],
        [new MyRange(rangeEnd, rangeEnd + 2), [rangeEnd, rangeEnd]]
    ];
    for (const testArg of testArgs) {
        const result = group.elementsInGroup(testArg[0]);

        expect(result.start).toBe(testArg[1][0]);
        expect(result.end).toBe(testArg[1][1]);
    }
});

test('nums start is only inside group', () => {
    //range, [expectRangeStart, expectRangeEnd]
    const testArgs = [
        [new MyRange(rangeStart, rangeEnd + 10), [rangeStart, rangeEnd]],
        [new MyRange(60, rangeEnd + 100), [60, rangeEnd]],
        [new MyRange(rangeEnd, rangeEnd + 2), [rangeEnd, rangeEnd]]
    ];
    for (const testArg of testArgs) {
        const result = group.elementsInGroup(testArg[0]);

        expect(result.start).toBe(testArg[1][0]);
        expect(result.end).toBe(testArg[1][1]);
    }
});

test('group range is entirely inside nums', () => {
    //range, [expectRangeStart, expectRangeEnd]
    const testArgs = [
        [new MyRange(rangeStart - 20, rangeEnd + 100), [rangeStart, rangeEnd]],
        [new MyRange(rangeStart - 1, rangeEnd + 100), [rangeStart, rangeEnd]]
    ];
    for (const testArg of testArgs) {
        const result = group.elementsInGroup(testArg[0]);

        expect(result.start).toBe(testArg[1][0]);
        expect(result.end).toBe(testArg[1][1]);
    }
});