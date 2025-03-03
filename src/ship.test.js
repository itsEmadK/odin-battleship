/* eslint-disable no-undef */
import { Ship } from './ship.js';

describe('Ship-constructor', () => {
    test('Initializes the ship object correctly', () => {
        const ship = new Ship(4);
        expect(ship.length).toBe(4);
    });
});

describe('"hits" getter', () => {
    const ship = new Ship(5);
    test('Initializes "hits" getter correctly', () => {
        expect(ship.hits).toBe(0);
    });
    test('Throws error on set', () => {
        expect(() => {
            ship.hits = 23;
        }).toThrow(Error);
    });
});
