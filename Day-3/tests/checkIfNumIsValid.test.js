const func = require('../func.js');

test('Number has a symbol next to it', () => {
    const testArgs = [
        [
            [
                ['....'],
                ['321.'],
                ['...%']
            ],
            0,
            2,
            1
        ],
        [
            [
                ['....'],
                ['.321'],
                ['...%']
            ],
            1,
            3,
            1
        ],
        [
            [
                ['..&.'],
                ['.32.'],
                ['....']
            ],
            1,
            2,
            1
        ],
        [
            [
                ['..3&'],
                ['....'],
                ['....']
            ],
            2,
            2,
            0
        ],
        [
            [
                ['....'],
                ['..$.'],
                ['..4.']
            ],
            2,
            2,
            2
        ],
        [
            [
                ['....'],
                ['..$.'],
                ['...4']
            ],
            2,
            3,
            2
        ]
    ];

    testArgs.forEach((testArg) => {
        expect(func.checkIfNumIsValid(...testArg)).toBe(true);
    });
});