class MyRange {
    /**
     * 
     * @param {number} start 
     * @param {number} end 
     */
    constructor(start, end) {
        this.start = start;
        this.end = end;
    }
    
    /**
     * 
     * @param {number} num 
     * @returns {boolean}
     */
    isNumInRange = (num) => this.start <= num && num <= this.end;
}

module.exports = MyRange;