/**
 * Created by user on 2014-11-09.
 */
define(['app/config', 'model/code', 'model/cardModel', 'tool'], function (Config, Code, CardModel, tool) {
    var gameHelper = function () {
        this.createRandomCard = function () {
            var card = CardModel.build(Code.getRandom());
            if (tool.randomBoolean(Config.CardDistrictedRatio)) {
                card.setDistricted();
            }
            return card;
        };

        this.addRandomCardRow = function (sliderRow) {
            sliderRow.addCards(
                this.createRandomCard(),
                this.createRandomCard(),
                this.createRandomCard()
            );
        }
    };

    return new gameHelper();
});