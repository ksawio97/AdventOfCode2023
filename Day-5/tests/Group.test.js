const Group = require('../src/Group');
const MyRange = require('../src/MyRange');

const group = new Group(20, new MyRange(40, 90)); 

test('nums entirely inside group', () => {
    //range, handled
    const testArgs = [
        [new MyRange(45, 83), [25, 63]], 
        [new MyRange(40, 63), [20, 43]], 
        [new MyRange(45, 90), [25, 70]],
        [new MyRange(40, 90), [20, 70]]
    ];
    for (const testArg of testArgs) {
        const [handled, unhandled] = group.handleElements(testArg[0]);

        expect(handled.length).toBe(1);

        expect(handled[0].start).toBe(testArg[1][0]);
        expect(handled[0].end).toBe(testArg[1][1]);

        expect(unhandled.length).toBe(0);
    }
});

test('nums end is only inside group', () => {
    //range, handled, unhandled
    const testArgs = [
        [new MyRange(20, 83), [20, 63], [20, 39]],
        [new MyRange(20, 90), [20, 70], [20, 39]],
        [new MyRange(20, 40), [20, 20], [20, 39]]
    ];
    for (const testArg of testArgs) {
        const [handled, unhandled] = group.handleElements(testArg[0])

        expect(handled.length).toBe(1);

        expect(handled[0].start).toBe(testArg[1][0]);
        expect(handled[0].end).toBe(testArg[1][1]);

        expect(unhandled.length).toBe(1);

        expect(unhandled[0].start).toBe(testArg[2][0]);
        expect(unhandled[0].end).toBe(testArg[2][1]);

    }
});

test('nums start is only inside group', () => {
    //range, handled, unhandled
    const testArgs = [
        [new MyRange(40, 100), [20, 70], [91, 100]],
        [new MyRange(60, 190), [40, 70], [91, 190]],
        [new MyRange(90, 92), [70, 70], [91, 92]]
    ];
    for (const testArg of testArgs) {
        const [handled, unhandled] = group.handleElements(testArg[0]);

        expect(handled.length).toBe(1);

        expect(handled[0].start).toBe(testArg[1][0]);
        expect(handled[0].end).toBe(testArg[1][1]);

        expect(unhandled.length).toBe(1);

        expect(unhandled[0].start).toBe(testArg[2][0]);
        expect(unhandled[0].end).toBe(testArg[2][1]);
    }
});

test('group range is entirely inside nums', () => {
    //range, handled, unhandled
    const testArgs = [
        [new MyRange(20, 190), [20, 70], [[20, 39], [91, 190]]],
        [new MyRange(39, 190), [20, 70], [[39, 39], [91, 190]]]
    ];
    for (const testArg of testArgs) {
        const [handled, unhandled] = group.handleElements(testArg[0]);

        expect(handled.length).toBe(1);

        expect(handled[0].start).toBe(testArg[1][0]);
        expect(handled[0].end).toBe(testArg[1][1]);
        

        for (const unhandledExpected of testArg[2]) 
        {
            let found = false;
            //if one of unhandled is from our expected
            for (let i = 0; i < unhandled.length; i++) {
                if (unhandled[i].start == unhandledExpected[0] && unhandled[i].end == unhandledExpected[1]) {
                    found = true;
                    unhandled.splice(i, 1);
                    break;
                }
            }
                    
            expect(found).toBe(true);
        }
        //expect unhandled to be empty bcs all need to be in testArg[2]
        expect(unhandled.length).toBe(0);
    }
});

test('nums are outside of group', () => {
    //range
    const testArgs = [
        new MyRange(20, 39),
        new MyRange(91, 190)
    ];

    for (const testArg of testArgs) 
    {
        const [handled, unhandled] = group.handleElements(testArg);

        expect(handled.length).toBe(0);
        expect(unhandled.length).toBe(1);

        expect(unhandled[0].start).toBe(testArg.start);
        expect(unhandled[0].end).toBe(testArg.end);
    }
});