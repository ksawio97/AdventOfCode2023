const MyRange = require('../src/MyRange');

const range = new MyRange(40, 90);
test('numbers inside range', () => {

    expect(range.isNumInRange(45)).toBe(true);
    expect(range.isNumInRange(40)).toBe(true);
    expect(range.isNumInRange(90)).toBe(true);
});

test('numbers before range', () => {
    expect(range.isNumInRange(-20)).toBe(false);
    expect(range.isNumInRange(39)).toBe(false);
    expect(range.isNumInRange(21)).toBe(false);
});

test('numbers after range', () => {
    expect(range.isNumInRange(91)).toBe(false);
    expect(range.isNumInRange(100)).toBe(false);
    expect(range.isNumInRange(1000)).toBe(false);
});