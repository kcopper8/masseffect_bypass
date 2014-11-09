/**
 * Created by user on 2014-10-18.
 */
define(['backbone', 'model/cardSet', 'model/cardModel'], function (Backbone, CardSet) {
    var SliderRow = Backbone.Collection.extend({
        model : CardSet,
        addCodes : function (code1, code2, code3) {
            var cardSet = CardSet.newWithCode(code1, code2, code3);
            this.add(cardSet);
        },
        addCards : function (card1, card2, card3) {
            var cardSet = CardSet.newWithCard(card1, card2, card3);
            this.add(cardSet);
        },
        getByIndex : function (row, col) {
            return this.at(row).at(col);
        }
    });
    SliderRow.build = function () {
        return new SliderRow();
    };
    return SliderRow;
});