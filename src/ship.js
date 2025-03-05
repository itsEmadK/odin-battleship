class Ship {
    id;

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
    constructor(id, length) {
        this.length = length;
        this.id = id;
    }

    hit() {
        this.#hits += 1;
    }

    /**
     *
     * @returns {Boolean}
     */
    isSunk() {
        return this.#hits >= this.length;
    }
}

export { Ship };
