const func = require('./func.js');


console.log(func.getSum1('./test_input.txt') == 142 ? "Test passed" : "Test failed");
console.log(func.getSum1('./input.txt'));


console.log(func.getSum2('./test_input2.txt') == 281 ? "Test2 passed" : "Test2 failed");
console.log(func.getSum2('./input.txt'));