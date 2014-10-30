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

        this.cursorMove = function (rowFix, colFix) {
            var fixedPoint = this.current.fix(rowFix, colFix);
            var item = this.get(fixedPoint);

            if (!!item ) {
                this.setCurrent(fixedPoint);
                return item;
            }
        };

        this.getPositionFixedCard = function (rowFix, colFix) {
            return this.get(this.current.row + rowFix, this.current.col + colFix);
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