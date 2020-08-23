import * as Functions from "../public/chess/board.js";

describe('board', () => {
    it("Should create 8 pawns", () => {
        console.log(`functions: ${Functions.pawnRow}`)
        var row = []
        Functions.pawnRow(row, 1, 0);
        if(row.length != 8)
        throw new Error(`Expected row to have length 8, but is length ${row.length}`)
    })
});