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
        getByIndex : function (row, col) {
            return this.at(row).at(col);
        },
        lastPatterns : function() {
            var retArr = [];
            for(var i = (this.models.length - 1); i >= 0; i--) {
                var cardSet = this.models[i];
                if (cardSet.getDistrictPattern().isClearPattern()) {
                    break;
                }

                retArr.push(cardSet.getDistrictPattern());
            }

            return retArr.reverse();
        }
    });
    SliderRow.build = function () {
        return new SliderRow();
    };
    return SliderRow;
});