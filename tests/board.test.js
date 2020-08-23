import * as functions from '../public/chess/board';

describe('board', () => {
    it("Should create 8 pawns", () => {
        row = []
        functions.pawnRow(row, 1, 0);
        if(row.length != 8)
        throw new Error(`Expected row to have length 8, but is length ${row.length}`)
    })
});