/**
 * Created by user on 2014-11-09.
 */
define(['underscore', 'app/config', 'model/code', 'model/cardModel', 'tool', 'constant/DistrictPatterns', 'model/cardSet'], function (_, Config, Code, CardModel, tool, DistrictPatterns, CardSet) {
    var gameHelper = function () {
        this.createRandomCard = function (noDistrict) {
            var card = CardModel.build(Code.getRandom()),
                canDistrict = !noDistrict;
            if (tool.randomBoolean(Config.CardDistrictedRatio) && canDistrict) {
                card.setDistricted();
            }
            return card;
        };

        this.addRandomCardRow = function (sliderRow) {
            var cardSet = CardSet.buildWithDistrictPattern(DistrictPatterns.pick());
            sliderRow.add(cardSet);
        };
    };

    return new gameHelper();
});