class Ship {
    /**
     * @type {number}
     */
    length;

    /**
     * @type {number}
     */
    #hits = 0;

    /**
     * @type {number}
     */
    get hits() {
        return this.#hits;
    }

    /**
     *
     * @param {number} length
     */
    constructor(length) {
        this.length = length;
    }
}

export { Ship };
