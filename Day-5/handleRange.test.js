const func = require('./func.js');

//1 - 20
// const seedRange = [1, 20];
// const info = [40, 19, 5];
// const result = func.handleRange(seedRange, info);
// console.log(result);
// console.log(seedRange);

test('test when seedRange is completly inside groupFragment', () => {
    let unhandled;
    //[1; 20]
    const seedRange = [1, 20];
    //[1; 40]
    const groupFragment = [100, 1, 40];
    const handled = func.handleRange(seedRange, groupFragment, (e) => unhandled = e);

    expect(handled).toStrictEqual([100, 20]);
    expect(unhandled).toBe(undefined);
    expect(seedRange).toStrictEqual([1, 0]);
});


test('test when seedRange start is in group but range end is out of group', () => {
    let unhandled;
    //[20; 40]
    const seedRange = [20, 20];
    //[15; 25]
    const groupFragment = [100, 15, 10];
    const handled = func.handleRange(seedRange, groupFragment, (e) => unhandled = e);

    expect(handled).toStrictEqual([105, 5]);
    expect(unhandled).toBe(undefined);
    expect(seedRange).toStrictEqual([25, 15]);
});


test('test when seedRange end is in group but range start is out of group', () => {
    let unhandled;
    //[20; 40]
    const seedRange = [20, 20];
    //[35; 45]
    const groupFragment = [100, 35, 10];
    const handled = func.handleRange(seedRange, groupFragment, (e) => unhandled = e);

    expect(handled).toStrictEqual([100, 5]);
    expect(unhandled).toBe(undefined);
    expect(seedRange).toStrictEqual([20, 15]);
});


test('test when group is entirely inside seedRange but seed range is start and end contains more values', () => {
    let unhandled;
    //[20; 40]
    const seedRange = [20, 20];
    //[25; 35]
    const groupFragment = [100, 25, 10];
    const handled = func.handleRange(seedRange, groupFragment, (e) => unhandled = e);

    expect(handled).toStrictEqual([100, 10]);
    expect(unhandled).toStrictEqual([35, 5]);
    expect(seedRange).toStrictEqual([20, 5]);
});

test('test when seedRange and group are not overlapping', () => {
    let unhandled;
    //[20; 40]
    const seedRange = [20, 20];
    //[40; 60]
    const groupFragment = [100, 40, 20];
    const handled = func.handleRange(seedRange, groupFragment, (e) => unhandled = e);
    
    expect(seedRange).toStrictEqual([20, 20]);
    expect(unhandled).toBe(undefined);
    expect(handled).toStrictEqual([]);
});