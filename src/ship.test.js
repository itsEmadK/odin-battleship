/* eslint-disable no-undef */
import { Ship } from './ship.js';

describe('Ship-constructor', () => {
    test('Initializes the ship object correctly', () => {
        const ship = new Ship(4);
        expect(ship.length).toBe(4);
    });
});
