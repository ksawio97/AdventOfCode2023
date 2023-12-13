const MyRange = require('../src/MyRange');

class Group {
    #destinationStart;
    #groupRange;
    /**
     * 
     * @param {number} destinationStart 
     * @param {MyRange} groupRange 
     */
    constructor(destinationStart, groupRange) {
        this.#destinationStart = destinationStart;
        this.#groupRange = groupRange;
    }

    /**
     * 
     * @param {MyRange} externalRange 
     * @returns {MyRange|undefined}
     */
    elementsInGroup = (externalRange) => {
        const isStartInRange = this.#groupRange.isNumInRange(externalRange.start);
        const isEndInRange = this.#groupRange.isNumInRange(externalRange.end);
        //externalRange start and end is inside group
        if (isStartInRange && isEndInRange)
            return new MyRange(externalRange.start, externalRange.end);
        //externalRange start is inside group
        else if (isStartInRange) 
            return new MyRange(externalRange.start, this.#groupRange.end);
        //externalRange end is inside group
        else if (isEndInRange)
            return new MyRange(this.#groupRange.start, externalRange.end);
        //group is inside externalRange
        else if (externalRange.start < this.#groupRange.start && this.#groupRange.end < externalRange.end)
            return new MyRange(this.#groupRange.start, this.#groupRange.end);
        return undefined;
    }
}

module.exports = Group;