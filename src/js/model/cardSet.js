/**
 * Created by user on 2014-10-18.
 */
define(['backbone', 'model/cardModel'], function (Backbone, CardModel) {
    var CardSet = Backbone.Model.extend({
        initialize : function (code1, code2, code3) {
            this.set({
                card1 : new CardModel(code1),
                card2 : new CardModel(code2),
                card3 : new CardModel(code3)
            });
        }
    });
    return CardSet;
});