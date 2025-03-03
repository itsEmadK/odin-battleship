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

describe('hit() method', () => {
    const ship = new Ship(5);
    test('exists', () => {
        expect(ship.hit).toBeDefined();
    });
    test('Increases the number of hits on invocation', () => {
        const oldHits = ship.hits;
        ship.hit();
        const newHits = ship.hits;
        expect(newHits).toBe(oldHits + 1);
    });
});

describe('isSunk() method', () => {
    test('exists', () => {
        const ship = new Ship(5);
        expect(ship.isSunk).toBeDefined();
    });
    test('returns true when length = hits', () => {
        const ship = new Ship(2);
        ship.hit();
        ship.hit();
        expect(ship.isSunk()).toBe(true);
    });
    test('returns true when length > hits', () => {
        const ship = new Ship(1);
        ship.hit();
        ship.hit();
        expect(ship.isSunk()).toBe(true);
    });
    test('returns false when length < hits', () => {
        const ship = new Ship(3);
        ship.hit();
        ship.hit();
        expect(ship.isSunk()).toBe(false);
    });
});
