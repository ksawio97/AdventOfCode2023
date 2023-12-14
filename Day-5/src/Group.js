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
     * @returns {[[MyRange], [MyRange]]} returns handled and unhandled MyRange
     */
    handleElements = (externalRange) => {
        const isStartInRange = this.#groupRange.isNumInRange(externalRange.start);
        const isEndInRange = this.#groupRange.isNumInRange(externalRange.end);

        const difference = this.#destinationStart - this.#groupRange.start;
        const handled = [];
        const unhandled = [];

        //externalRange start and end is inside group
        if (isStartInRange && isEndInRange)
        {
            handled.push(new MyRange(externalRange.start + difference, externalRange.end + difference));
        }
        //externalRange start is inside group
        else if (isStartInRange) {
            unhandled.push(new MyRange(this.#groupRange.end + 1, externalRange.end));

            handled.push(new MyRange(externalRange.start + difference, this.#groupRange.end + difference));
        }
        //externalRange end is inside group
        else if (isEndInRange) {
            unhandled.push(new MyRange(externalRange.start, this.#groupRange.start - 1));

            handled.push(new MyRange(this.#groupRange.start + difference, externalRange.end + difference));
        }
        //group is inside externalRange
        else if (externalRange.start < this.#groupRange.start && this.#groupRange.end < externalRange.end) {
            unhandled.push(new MyRange(this.#groupRange.end + 1, externalRange.end));
            unhandled.push(new MyRange(externalRange.start, this.#groupRange.start - 1));

            handled.push(new MyRange(this.#groupRange.start + difference, this.#groupRange.end + difference));
        }

        if (handled.length == 0)
            unhandled.push(externalRange);
        return [handled, unhandled];
    }
}

module.exports = Group;