/**
 * Created by user on 2014-10-18.
 */
define(['backbone', 'model/cardSet', 'model/cardModel'], function (Backbone, CardSet, CardModel) {
    var SliderRow = Backbone.Collection.extend({
        model : CardSet,
        addCodes : function (code1, code2, code3) {
            var cardSet = new CardSet(code1, code2, code3);
            this.add(cardSet);
        },
        getByIndex : function (row, col) {
            return this.at(row).at(col);
        },
        findCard : function (cardModel, rowFix, colFix) {
            var findStandard = cardModel,
                rowIndexFix = rowFix || 0,
                colIndexFix = colFix || 0,
                rowIndex,
                colIndex = 0,
                tempColIndex;

            for (rowIndex = 0; rowIndex < this.models.length; rowIndex++) {
                tempColIndex = this.models[rowIndex].getIndexOf(findStandard);

                if (tempColIndex >= 0) {
                    colIndex = tempColIndex;
                    break;
                }
            }

            return this.getByIndex(rowIndex + rowIndexFix, colIndex + colIndexFix);

        }
    });
    return SliderRow;
});