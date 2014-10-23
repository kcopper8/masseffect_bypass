/**
 * Created by user on 2014-10-18.
 */
define(['underscore', 'backbone', 'model/cardModel'], function (_, Backbone, CardModel) {
    var AllCardPropertiesNames = ['card1', 'card2', 'card3'];
    var CardSet = Backbone.Model.extend({
        initialize : function (code1, code2, code3) {
            this.set({
                card1 : CardModel.build(code1),
                card2 : CardModel.build(code2),
                card3 : CardModel.build(code3)
            });
        },
        getIndexOf : function (cardModel) {
            for(var i = 0 ; i < AllCardPropertiesNames.length; i++) {
                if (cardModel === this.get(AllCardPropertiesNames[i])) {
                    return i;
                }
            }

            return -1;
        },
        at : function (index) {
            return this.get(AllCardPropertiesNames[index]);
        }
    });
    return CardSet;
});