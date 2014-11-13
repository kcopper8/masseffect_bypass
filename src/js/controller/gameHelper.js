/**
 * Created by user on 2014-11-09.
 */
define(['underscore', 'app/config', 'model/code', 'model/cardModel', 'tool', 'constant/DistrictPatterns', 'model/cardSet'], function (_, Config, Code, CardModel, tool, DistrictPatterns, CardSet) {
    var gameHelper = function () {
        this.addRandomCardRow = function (sliderRow) {
            var districtPatterns = sliderRow.lastPatterns();

            var cardSet = CardSet.buildWithDistrictPattern(DistrictPatterns.pick(districtPatterns));
            sliderRow.add(cardSet);
        };

        this.addNoDistrictPatternRow = function (sliderRow) {
            var cardSet = CardSet.buildWithDistrictPattern(DistrictPatterns.pickClearPattern());
            sliderRow.add(cardSet);
        };
    };

    return new gameHelper();
});