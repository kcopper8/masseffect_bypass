/**
 * Created by user on 2014-11-09.
 */
define(['underscore', 'backbone', 'app/config', 'model/code', 'controller/gameHelper'], function (_, Backbone, Config, Code, gameHelper) {
    var gameStageController = {
        prepareStage : function (viewContainer, gameStageModel, sliderRow) {
            var failureOnce = function (cardModel) {
                cardModel.setUnauthorizedAccess();
                gameStageModel.removeHackedCode();
            };
            viewContainer.sliderView.on("cursor:moved", function (card) {
                var cardModel = card.model;
                if (cardModel.isDistricted()) {
                    //this.trigger("failureOnce", cardModel);
                    failureOnce(cardModel);
                }
            });

            viewContainer.sliderView.on("cursor:selected", function (card) {
                var cardModel = card.model;
                if (cardModel.isSelected()) {
                    // 이미 선택한 코드는 반응하지 않는다.
                    return;
                }

                var code = cardModel.getCode();
                if (code != gameStageModel.getCurrentTargetCode()) {
                    // 실패 처리
                    //this.trigger("failureOnce", cardModel);
                    failureOnce(cardModel);
                    return;
                }

                cardModel.setSelected();
                gameStageModel.addHackedCode(code);
                gameStageModel.setCurrentTargetCode(Code.getRandom());
            });

            viewContainer.sliderView.on("sliding", function () {
                gameHelper.addRandomCardRow(sliderRow);
            });

            _.times(Config.RowsCountInSlide + 1, function (n) {
                if (n == 1) {
                    sliderRow.addCards(
                        gameHelper.createRandomCard(),
                        gameHelper.createRandomCard(true),
                        gameHelper.createRandomCard()
                    );
                    gameHelper.addRandomCardRow(sliderRow);
                } else {
                    gameHelper.addRandomCardRow(sliderRow);
                }
            });
        }
    };
    _.extend(gameStageController, Backbone.Events);

    return gameStageController;
});