/**
 * Created by user on 2014-10-31.
 */
define([], function () {
    var Point = function (row, col) {
        this.row = row;
        this.col = col;

        this.fix = function (rowFix, colFix) {
            return new Point(this.row + rowFix, this.col + colFix);
        };
    };

    Point.build = function (row, col) {
        if (row instanceof Point) {
            var newPoint = row;
            row = newPoint.row;
            col = newPoint.col;
        }
        return new Point(row, col);
    };

    return Point;
});