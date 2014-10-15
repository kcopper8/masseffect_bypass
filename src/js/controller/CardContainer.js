/**
 * Created by user on 2014-10-15.
 */
define(['underscore'], function (_) {
    var CardContainer = function () {
        var container = [];

        this.clear = function () {
            container = [];
        };

        this.addRow = function (cards) {
            container.push(cards);
        };

        this.get = function (row, col) {
            return container[row][col];
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