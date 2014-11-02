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
        }
    });
    return SliderRow;
});