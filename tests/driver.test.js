import * as Functions from "../public/chess/driver"

describe('driver', () => {
    it("doSomethingOnClick: Should create 8 pawns", () => {
        var row = []
        Functions.pawnRow(row, 1, 0);
        if(row.length != 8)
        throw new Error(`Expected row to have length 8, but is length ${row.length}`)
    })
    it("newRow: Should create the back row of pieces", () => {
        var row = []
        Functions.newRow(row, 0, 0);
        if(row.length != 8)
        throw new Error(`Expected row to have length 8, but is length ${row.length}`)
    })
});