/**
 * Created by user on 2014-10-18.
 */
define(['underscore', 'backbone', 'model/cardModel', 'model/code'], function (_, Backbone, CardModel, Code) {
    var AllCardPropertiesNames = ['card1', 'card2', 'card3'];
    var CardSet = Backbone.Model.extend({
        initialize : function (code1, code2, code3) {
            this.set({
                card1 : CardModel.build(code1),
                card2 : CardModel.build(code2),
                card3 : CardModel.build(code3)
            });

            this.on("change:districtPattern", _.bind(this.onDistrictPatternChange, this));
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
        },
        onDistrictPatternChange : function () {
            var pattern = this.getDistrictPattern();
            pattern.applyPattern([
                this.get('card1'),
                this.get('card2'),
                this.get('card3')
            ], function (card) {
                card.setDistricted();
            });
        },
        getDistrictPattern : function () {
            return this.get("districtPattern");
        }
    });
    CardSet.buildWithDistrictPattern = function (pattern) {
        var cardSet = new CardSet(
            CardModel.build(Code.getRandom()),
            CardModel.build(Code.getRandom()),
            CardModel.build(Code.getRandom())
        );
        cardSet.set("districtPattern", pattern);
        return cardSet;
    };
    CardSet.newWithCard = function (card1, card2, card3) {
        return new CardSet(card1, card2, card3);
    };
    CardSet.newWithCode = function (code1, code2, code3) {
        return new CardSet(code1, code2, code3);
    };
    return CardSet;
});