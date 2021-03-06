'use strict';

import Board from '../src/board';
import assert from 'assert';

describe('Board', () => {
    let [width, height] = [10, 20];

    it('Should create correct number of cells', () => {
        let board = new Board(width, height);
        assert.equal(board.cells.length, width * height);
    });

    it('Should mark half of the cells as dead', () => {
        let board = new Board(width, height);
        let deadCells = board.cells.filter(cell => !cell.alive);

        assert.equal(deadCells.length, Math.round(width * height / 2));
    });

    it('Should randomly place dead cells', () => {
        let board1 = new Board(width, height);
        let board2 = new Board(width, height);

        assert.notDeepEqual(board1.cells, board2.cells);
    });

    it('Should correctly get neighbours, test 1', () => {
        let board = new Board(3, 3);
        let cell = board.cells[4];

        let neighbours = board.getNeighbours(cell);
        let self = neighbours.filter(neighbour => neighbour.x === 1 && neighbour.y === 1);

        assert.equal(neighbours.length, 8);
        assert.equal(self.length, 0);
    });

    it('Should correctly get neighbours, test 2', () => {
        let board = new Board(3, 3);
        let cell = board.cells[0];

        let neighbours = board.getNeighbours(cell);
        let self = neighbours.filter(neighbour => neighbour.x === 0 && neighbour.y === 0);
        let correctNeighbours = neighbours.filter(neighbour => {
            return neighbour.x === 1 && neighbour.y === 0
                || neighbour.x === 0 && neighbour.y === 1
                || neighbour.x === 1 && neighbour.y === 1;
        });

        assert.equal(neighbours.length, 3);
        assert.equal(self.length, 0);
        assert.equal(correctNeighbours.length, 3);
    });
});