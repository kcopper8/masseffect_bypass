/**
 * Created by user on 2014-10-15.
 */
define(['underscore', 'model/point'], function (_, Point) {
    var CardContainer = function () {
        var container = [];

        this.clear = function () {
            container = [];
        };

        this.addRow = function (cards) {
            container.push(cards);
        };

        this.getRow = function (row) {
            return container[row];
        };

        this.get = function (row, col) {
            var point = Point.build(row, col);
            return container[point.row][point.col];
        };

        this.setCurrent = function (row, col) {
            this.current = Point.build(row, col);
        };

        this.getCurrentCard = function () {
            return this.get(this.current);
        };

        this.getCurrentCardPosition = function () {
            return Point.build(this.current);
        };

        this.cursorMoveToPosition = function (point) {
            this.setCurrent(point);
        };

        this.isValidPosition = function (point) {
            if (!point) {
                return false;
            }

            if (point.row < 0 || point.row > container.length - 1) {
                return false;
            }

            if (point.col < 0 || point.col > 2) {
                return false;
            }

            return true;
        };

        this.getFixedPosition = function (rowFix, colFix) {
            var point = this.current.fix(rowFix, colFix);
            if (this.isValidPosition(point)) {
                return point;
            }
        };

        this.findCard = function (card, rowFix, colFix) {
            var findStandard = card,
                rowIndexFix = rowFix || 0,
                colIndexFix = colFix || 0,
                rowIndex,
                colIndex = 0,
                tempColIndex;

            for(rowIndex = 0; rowIndex < container.length; rowIndex++) {
                tempColIndex = _.indexOf(container[rowIndex], findStandard);
                if (tempColIndex >= 0) {
                    colIndex = tempColIndex;
                    break;
                }
            }

            return this.get(rowIndex + rowIndexFix, colIndex + colIndexFix);
        };

    };



    return CardContainer;

});