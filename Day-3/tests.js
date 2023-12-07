const func = require('./func.js');

class TestUnit { 
    constructor() {
        this.count = 0;
    }

    isEqual = (expected, result) => {
        if (expected === result)
            console.log(`Test ${this.count} passed`);
        else
            console.log(`Test ${this.count} failed expected ${expected} got ${result}`);
        this.count++;
    }
}
const testUnit = new TestUnit();
console.log("Testing part 1");
testUnit.isEqual(4361, func.part1('./test_input.txt'));

testUnit.isEqual(0, func.part1('./specialTests/test1.txt'));
testUnit.isEqual(2, func.part1('./specialTests/test2.txt'));
testUnit.isEqual(2, func.part1('./specialTests/test3.txt'));
testUnit.isEqual(2, func.part1('./specialTests/test4.txt'));
testUnit.isEqual(32, func.part1('./specialTests/test5.txt'));
testUnit.isEqual(326, func.part1('./specialTests/test6.txt'));
testUnit.isEqual(3, func.part1('./specialTests/test7.txt'));

testUnit.isEqual(22, func.part1('./specialTests/test8.txt'));
testUnit.isEqual(10, func.part1('./specialTests/test9.txt'));
testUnit.isEqual(2, func.part1('./specialTests/test10.txt'));
testUnit.isEqual(810, func.part1('./specialTests/test11.txt'));
testUnit.isEqual(0, func.part1('./specialTests/test12.txt'));
testUnit.isEqual(0, func.part1('./specialTests/test13.txt'));